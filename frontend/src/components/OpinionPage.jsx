import { useEffect, useState } from "react";
import {
  getAllOpinions,
  createOpinion,
  updateOpinion,
  deleteOpinion,
} from "../services/OpinionService";
import { useAuth } from "../context/UseAuth";

function OpinionPage() {
  const { token, userId, userRoles } = useAuth();

  const [opinions, setOpinions] = useState([]);

  // Form create
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userOpinion, setUserOpinion] = useState("");
  const [success, setSuccess] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editText, setEditText] = useState("");

  const isAdmin = userRoles?.includes("Admin");

  // Fetch all opinions
  const loadOpinions = async () => {
    const res = await getAllOpinions();
    if (res.success) setOpinions(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    loadOpinions();
  }, []);

  // Create new opinion
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || userOpinion.trim() === "") return;

    const body = { rating, userOpinion };
    const res = await createOpinion(body, token);

    if (res.success) {
      setSuccess(true);
      setRating(0);
      setUserOpinion("");
      await loadOpinions();
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  // Start editing
  const startEdit = (op) => {
    setEditingId(op.id);
    setEditRating(op.rating);
    setEditText(op.userOpinion);
  };

  // Save edit
  const handleEditSave = async (id) => {
    const body = {
      rating: editRating,
      userOpinion: editText,
    };

    const res = await updateOpinion(id, body, token);

    if (res.success) {
      setEditingId(null);
      await loadOpinions();
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa opinione?"))
      return;

    const res = await deleteOpinion(id, token);

    if (res.success) {
      await loadOpinions();
    }
  };

  return (
    <>
      <div className="containerAfterNavbar slowOpacity">
        <div className="row flexContainerCenter">
          <div className="col-8 beigeContainer shadow-sm p-4">
            <h2 className="mb-3">Cosa parlano di noi</h2>
            <hr />

            {/* FORM */}
            <div className="mb-4">
              <h4 className="mb-3">Lascia la tua opinione</h4>

              {success && (
                <div className="alert alert-success py-2">
                  Opinione inviata con successo!
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Rating */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Valutazione</label>
                  <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={
                          (hoverRating || rating) >= star
                            ? "bi bi-star-fill text-warning fs-3 me-1"
                            : "bi bi-star text-warning fs-3 me-1"
                        }
                        style={{ cursor: "pointer" }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      ></i>
                    ))}
                  </div>
                </div>

                {/* Commento */}
                <div className="mb-3">
                  <label className="form-label fw-bold">La tua opinione</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    maxLength="1000"
                    value={userOpinion}
                    onChange={(e) => setUserOpinion(e.target.value)}
                    placeholder="Scrivi qui la tua opinione..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={rating === 0 || userOpinion.trim() === ""}
                >
                  Invia opinione
                </button>
              </form>
            </div>

            <hr />

            {/* LISTA OPINIONI */}
            {opinions.length === 0 && (
              <p className="text-muted">Nessuna opinione presente.</p>
            )}

            <ul className="list-group">
              {opinions.map((op) => {
                const canEdit = isAdmin || op.userId === userId;

                return (
                  <li
                    key={op.id}
                    className="list-group-item d-flex flex-column mb-3 shadow-sm"
                  >
                    <div className="d-flex justify-content-between">
                      <strong>{op.userEmail}</strong>
                      <span className="text-warning">
                        {"★".repeat(op.rating)}
                        {"☆".repeat(5 - op.rating)}
                      </span>
                    </div>

                    {/* EDIT MODE */}
                    {editingId === op.id ? (
                      <>
                        <div className="mt-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i
                              key={star}
                              className={
                                editRating >= star
                                  ? "bi bi-star-fill text-warning fs-4 me-1"
                                  : "bi bi-star text-warning fs-4 me-1"
                              }
                              style={{ cursor: "pointer" }}
                              onClick={() => setEditRating(star)}
                            ></i>
                          ))}
                        </div>

                        <textarea
                          className="form-control mt-2"
                          rows="3"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        ></textarea>

                        <div className="mt-2">
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleEditSave(op.id)}
                          >
                            Salva
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditingId(null)}
                          >
                            Annulla
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="mt-2">{op.userOpinion}</p>
                        <small className="text-muted">
                          {new Date(op.createdAt).toLocaleString("it-IT", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </small>

                        {canEdit && (
                          <div className="mt-2">
                            <button
                              className="btn btn-outline-primary btn-sm me-2"
                              onClick={() => startEdit(op)}
                            >
                              Modifica
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(op.id)}
                            >
                              Elimina
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpinionPage;
