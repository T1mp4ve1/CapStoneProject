import { useEffect, useState } from "react";
import { getAllOpinions, createOpinion } from "../services/OpinionService";
import { useAuth } from "../context/UseAuth";

function OpinionPage() {
  const { token } = useAuth();

  const [opinions, setOpinions] = useState([]);

  // Form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userOpinion, setUserOpinion] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch all opinions
  useEffect(() => {
    const fetchOpinions = async () => {
      const res = await getAllOpinions();
      if (res.success) {
        setOpinions(res.data);
      }
    };
    fetchOpinions();
  }, []);

  // Submit new opinion
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || userOpinion.trim() === "") return;

    const body = {
      rating,
      userOpinion,
    };

    const res = await createOpinion(body, token);

    if (res.success) {
      setSuccess(true);
      setRating(0);
      setUserOpinion("");

      // Refresh list
      const updated = await getAllOpinions();
      if (updated.success) setOpinions(updated.data);

      setTimeout(() => setSuccess(false), 2000);
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
              {opinions.map((op) => (
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpinionPage;
