import React, { useState } from "react";
import { useAuth } from "../../context/UseAuth";
import {
  deleteTicket,
  getTickets,
  updateTicketState,
} from "../../services/ticketsService";
import {
  createOpinion,
  getMessagesByTicket,
} from "../../services/OpinionService";

function TicketsManager() {
  const [tickets, setTickets] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [filter, setFilter] = useState("");
  const [openRow, setOpenRow] = useState(null);

  const stateIcons = {
    Opened: <i className="bi bi-circle-fill text-primary"></i>,
    Waiting: <i className="bi bi-exclamation-circle-fill text-warning"></i>,
    Closed: <i className="bi bi-check-circle-fill text-success"></i>,
  };

  const ticketStates = ["Opened", "Waiting", "Closed"];

  // C
  const handleCreateMessage = async (entityId) => {
    try {
      const body = { userOpinion: message, entityId: entityId };
      const res = await createOpinion(body, token);
      if (!res.success) {
        console.error(res.error);
      }
      setMessage("");
      const updated = await getMessagesByTicket(entityId, token);
      setMessages((prev) => ({ ...prev, [entityId]: updated.data }));
    } catch (err) {
      console.error("Uknow error:", err);
    }
  };

  // R
  const handleFilter = async (state) => {
    try {
      setLoading(true);
      setFilter(state);
      const res = await getTickets(state, token);
      if (!res.success) {
        console.error(res.error);
        return;
      }
      const loadedTickets = res.data;
      setTickets(loadedTickets);

      const msgs = {};

      for (const t of loadedTickets) {
        const resMsg = await getMessagesByTicket(t.id, token);
        msgs[t.id] = resMsg.data;
      }

      setMessages(msgs);
    } catch (err) {
      console.error("Fetch page error", err);
    } finally {
      setLoading(false);
    }
  };

  //U
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

  //D
  const handleDelete = async (id) => {
    try {
      const res = await deleteTicket(id, token);
      console.log(res.data);
      setTickets((prev) => prev.filter((t) => t.id != id));
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  return (
    <>
      <div className="flexContainerLeft">
        <h2 className="me-2">Tickets</h2>
        {loading && (
          <small>
            <div className="spinner-border"></div>
          </small>
        )}
      </div>

      <div className="d-flex gap-1 mb-2">
        {["All", ...ticketStates].map((s) => (
          <button
            key={s}
            className={`${
              filter === s ? "beatyButton3Active" : "beatyButton3"
            }`}
            onClick={() => handleFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>
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
              <React.Fragment key={t.id}>
                <tr style={{ cursor: "pointer" }}>
                  <td>{t.id}</td>
                  <td>{new Date(t.createdAt).toLocaleString()}</td>
                  <td className="position-relative">
                    <div className="dropdown">
                      <button
                        className="btn btn-light dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        {stateIcons[t.state]}
                      </button>

                      <ul className="dropdown-menu">
                        {ticketStates.map((s) => (
                          <li key={s}>
                            <button
                              className="dropdown-item d-flex align-items-center gap-2"
                              onClick={() => handleChangeState(t.id, s)}
                            >
                              {stateIcons[s]} {s}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>

                  <td>{t.problem}</td>
                  <td>
                    {loading ? (
                      <div
                        class="spinner-grow text-info"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <>
                        <button
                          className="flexContainerCenter beatyBadge"
                          onClick={() =>
                            setOpenRow(openRow === t.id ? null : t.id)
                          }
                        >
                          <p>{messages[t.id]?.length}</p>
                          <i className="bi bi-arrow-down-short fs-5"></i>
                        </button>
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      className="beatyButtonSm"
                      onClick={() => handleDelete(t.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>

                {openRow === t.id && (
                  <tr className="expandedTr">
                    <td className="expandedRow" colSpan="3">
                      <textarea
                        className="form-control rounded-4 mb-1"
                        placeholder="Scrivi messaggio..."
                        style={{ height: "150px" }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button
                        className="beatyButton2 w-100 p-1"
                        onClick={() => handleCreateMessage(t.id)}
                      >
                        Manda
                      </button>
                    </td>
                    <td className="expandedRow" colSpan="3">
                      {messages[t.id]?.length > 0 ? (
                        <>
                          {messages[t.id].map((m) => (
                            <div
                              key={m.id}
                              className="commentsContainer mb-1 p-2 rounded-3"
                            >
                              <p>
                                <strong>{m.userFirstName}</strong>:{" "}
                                {m.userOpinion}
                              </p>
                              <small className="text-muted">
                                {new Date(m.createdAt).toLocaleString("it-IT", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </small>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <p className="text-danger">Nessuna risposta ancora</p>
                        </>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default TicketsManager;
