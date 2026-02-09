import { useEffect, useState } from "react";
import { useAuth } from "../../context/UseAuth";
import {
  createTicket,
  getUserTickets,
  updateTicketState,
} from "../../services/ticketsService";

function SupportPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState("");
  const { token } = useAuth();

  const stateIcons = {
    Opened: <i className="bi bi-circle-fill text-primary"></i>,
    Waiting: <i className="bi bi-exclamation-circle-fill text-warning"></i>,
    Closed: <i className="bi bi-check-circle-fill text-success"></i>,
  };

  useEffect(() => {
    const usertickets = async () => {
      try {
        setLoading(true);
        const res = await getUserTickets(token);
        setTickets(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Fetch page error", err);
      } finally {
        setLoading(false);
      }
    };
    usertickets();
  }, []);

  const handleCreateTicket = async () => {
    try {
      const res = await createTicket(problem, token);
      setTickets((prev) => [res.data, ...prev]);
      setProblem("");
    } catch (err) {
      console.error("Create ticket error:", err);
    }
  };

  const handleChangeState = async (id, newState) => {
    try {
      await updateTicketState(id, newState, token);
      setTickets((prev) =>
        prev.map((t) => (t.id === id ? { ...t, state: newState } : t)),
      );
    } catch (err) {
      console.error("Update errore:", err);
    }
  };

  return (
    <>
      <div className="containerAfterNavbar slowOpacity">
        <div className="mb-5">
          <div className="row flexContainerCenter">
            <div className="col-6">
              <h2>Hai un problema?</h2>
              <div className="input-group mb-1">
                <span className="input-group-text">Esponilo</span>
                <textarea
                  className="form-control"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                ></textarea>
              </div>
              <button
                className="w-100 loginBtn"
                onClick={handleCreateTicket}
                disabled={!problem.trim()}
              >
                Manda
              </button>
            </div>
          </div>
        </div>

        <h2>Le mie richieste</h2>
        {loading && (
          <div className="spinner-border flexContainerCenter" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Stato</th>
              <th>Problema</th>
              <th>Azioni</th>
            </tr>
          </thead>

          <tbody>
            {tickets &&
              tickets.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{new Date(t.createdAt).toLocaleString()}</td>
                  <td>
                    {stateIcons[t.state]}{" "}
                    <span className="ms-1">{t.state}</span>
                  </td>

                  <td>{t.problem}</td>
                  <td>
                    <button
                      className="beatyButtonSm"
                      onClick={() => handleChangeState(t.id, "Closed")}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SupportPage;
