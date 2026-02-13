import { useEffect, useState } from "react";
import {
  getAllOpinions,
  createOpinion,
  updateOpinion,
  deleteOpinion,
} from "../services/OpinionService";
import { useAuth } from "../context/UseAuth";
import "./css/OpinionPage.css";

function OpinionPage() {
  const { token, userId, userRoles, isLogged } = useAuth();
  const [opinions, setOpinions] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userOpinion, setUserOpinion] = useState("");
  const [success, setSuccess] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editText, setEditText] = useState("");

  const isAdmin = userRoles?.includes("Admin");

  const loadOpinions = async () => {
    const res = await getAllOpinions();
    if (res.success) setOpinions(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    loadOpinions();
  }, []);

  // C
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

  const startEdit = (op) => {
    setEditingId(op.id);
    setEditRating(op.rating);
    setEditText(op.userOpinion);
  };

  // U
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

  // D
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
          <div className="col-8 opinionContainer mb-5">
            {/* FORM */}

            {isLogged && (
              <>
                <div>
                  <h4 className="mb-3">Comè stata la tua esperienza?</h4>
                  {success && (
                    <div className="alert alert-success py-2">
                      Opinione inviata con successo!
                    </div>
                  )}

                  <form
                    className="formContainer shadow-sm"
                    onSubmit={handleSubmit}
                  >
                    {/* Rating */}
                    <div className="mb-3">
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

                    {/* Commento */}
                    <div className="mb-3">
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
                      className={
                        rating === 0 || userOpinion.trim() === ""
                          ? "beatyButton4Disabled"
                          : "beatyButton4"
                      }
                      disabled={rating === 0 || userOpinion.trim() === ""}
                    >
                      Invia opinione
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>

          {/* LISTA OPINIONI */}
          <div className="col-8">
            <h4 className="mb-3">Cosa parlano di noi</h4>
            {opinions.length === 0 && (
              <p className="text-muted">Nessuna opinione presente.</p>
            )}

            <div>
              {opinions.map((op) => {
                const canEdit = isAdmin || op.userId === userId;

                return (
                  <div
                    key={op.id}
                    className="d-flex flex-column mb-3 formContainer"
                  >
                    <div className="d-flex justify-content-between">
                      <div className="flexContainerCenter">
                        <i className="bi bi-person-circle fs-3 me-2"></i>
                        <strong>{op.userFirstName}</strong>
                      </div>
                      {canEdit && (
                        <div className="mt-2">
                          {editingId === op.id ? (
                            <>
                              <button
                                className="editButtonSm me-2"
                                onClick={() => handleEditSave(op.id)}
                              >
                                <i className="bi bi-check-lg"></i>
                              </button>
                              <button
                                className="beatyButtonSm"
                                onClick={() => setEditingId(null)}
                              >
                                <i className="bi bi-x-lg"></i>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="editButtonSm me-2"
                                onClick={() => startEdit(op)}
                              >
                                <i className="bi bi-pen"></i>
                              </button>
                              <button
                                className="beatyButtonSm"
                                onClick={() => handleDelete(op.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <hr className="m-2" />
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
                      </>
                    ) : (
                      <>
                        <p className="mt-2">{op.userOpinion}</p>
                        <div className="flexContainerBetween">
                          <div className="text-warning fs-4">
                            {"★".repeat(op.rating)}
                            {"☆".repeat(5 - op.rating)}
                          </div>
                          <small className="text-muted p-2 rounded-4 shadow-sm">
                            {new Date(op.createdAt).toLocaleString("it-IT", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </small>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpinionPage;
