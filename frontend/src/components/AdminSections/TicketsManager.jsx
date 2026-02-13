import { useState } from "react";
import { useAuth } from "../../context/UseAuth";
import {
  deleteTicket,
  getTickets,
  updateTicketState,
} from "../../services/ticketsService";

function TicketsManager() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [filter, setFilter] = useState("");

  const stateIcons = {
    Opened: <i className="bi bi-circle-fill text-primary"></i>,
    Waiting: <i className="bi bi-exclamation-circle-fill text-warning"></i>,
    Closed: <i className="bi bi-check-circle-fill text-success"></i>,
  };

  const ticketStates = ["Opened", "Waiting", "Closed"];

  //C

  // R
  const handleFilter = async (state) => {
    try {
      setLoading(true);
      setFilter(state);
      const res = await getTickets(state, token);
      setTickets(res.data);
      console.log(res.data);
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
      <div className="container80 manageContaner">
        <h2>Tickets</h2>
        {loading && (
          <div className="spinner-border flexContainerCenter" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

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
              <th>Azioni</th>
            </tr>
          </thead>

          <tbody>
            {tickets &&
              tickets.map((t) => (
                <tr key={t.id}>
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
                    <button
                      className="beatyButtonSm"
                      onClick={() => handleDelete(t.id)}
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

export default TicketsManager;
