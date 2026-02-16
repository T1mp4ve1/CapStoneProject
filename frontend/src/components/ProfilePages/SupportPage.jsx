import { useEffect, useState } from "react";
import { useAuth } from "../../context/UseAuth";
import {
  createTicket,
  getUserTickets,
  updateTicketState,
} from "../../services/ticketsService";
import { getMessagesByTicket } from "../../services/OpinionService";

function SupportPage() {
  const [tickets, setTickets] = useState([]);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState("");
  const [openRow, setOpenRow] = useState(null);
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
        if (!res.success) {
          console.error(res.error);
          return;
        }
        const loadedTickets = res.data;
        setTickets(loadedTickets);
        console.log("Tickets:", loadedTickets);

        const msgs = {};

        for (const t of loadedTickets) {
          const resMsgs = await getMessagesByTicket(t.id, token);
          console.log("Msg", resMsgs.data);
          msgs[t.id] = resMsgs.data;
        }
        setMessages(msgs);
        console.log("Messages", messages);
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

        <h2>Cronologia richieste</h2>
        {loading && (
          <div className="spinner-border flexContainerCenter" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Stato</th>
              <th>Problema</th>
              <th>Risposte</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {tickets &&
              tickets.map((t) => (
                <>
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>
                      <p>
                        {new Date(t.createdAt).toLocaleString("it-IT", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                    <td>
                      {stateIcons[t.state]}{" "}
                      <span className="ms-1">{t.state}</span>
                    </td>
                    <td>{t.problem}</td>
                    <td>
                      <button
                        className="flexContainerCenter beatyBadge"
                        onClick={() =>
                          setOpenRow(openRow === t.id ? null : t.id)
                        }
                      >
                        <p>{messages[t.id]?.length}</p>
                        <i className="bi bi-arrow-down-short fs-5"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className={
                          t.state === "Closed"
                            ? "beatyButtonSmDisabled"
                            : "beatyButtonSm"
                        }
                        disabled={t.state === "Closed"}
                        onClick={() => handleChangeState(t.id, "Closed")}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                  {openRow === t.id && (
                    <tr className="expandedTr">
                      <td className="expandedRow" colSpan="1">
                        <i className="bi bi-arrow-90deg-up fs-5"></i>
                      </td>
                      <td className="expandedRow" colSpan="2">
                        {messages[t.id]?.length > 0 && (
                          <>
                            {messages[t.id].map((m) => (
                              <p className="text-muted">
                                {new Date(m.createdAt).toLocaleString("it-IT", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            ))}
                          </>
                        )}
                      </td>
                      <td className="expandedRow" colSpan="3">
                        {messages[t.id]?.length > 0 ? (
                          <>
                            {messages[t.id].map((m) => (
                              <p key={m.id}>
                                <strong>{m.userFirstName}</strong>:{" "}
                                {m.userOpinion}
                              </p>
                            ))}
                          </>
                        ) : (
                          <p className="text-danger">Nessuna risposta ancora</p>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SupportPage;
