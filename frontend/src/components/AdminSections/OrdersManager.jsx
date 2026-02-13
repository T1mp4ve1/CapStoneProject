import { useState } from "react";
import {
  deleteOrder,
  getOrders,
  updateOrderState,
} from "../../services/ordersService";
import { useAuth } from "../../context/UseAuth";

function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [filter, setFilter] = useState("");

  const stateIcons = {
    Pending: <i className="bi bi-exclamation-circle-fill text-warning"></i>,
    Accepted: <i className="bi bi-circle-fill text-primary"></i>,
    Shipped: <i className="bi bi-truck text-info"></i>,
    Completed: <i className="bi bi-check-circle-fill text-success"></i>,
    Canceled: <i className="bi bi-x-circle-fill text-danger"></i>,
  };

  const orderStates = [
    "Pending",
    "Accepted",
    "Shipped",
    "Completed",
    "Canceled",
  ];

  //C

  // R
  const handleFilter = async (state) => {
    try {
      setLoading(true);
      setFilter(state);
      const res = await getOrders(state, token);
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch page error", err);
    } finally {
      setLoading(false);
    }
  };

  //U
  const handleChangeState = async (id, newState) => {
    try {
      await updateOrderState(id, newState, token);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, state: newState } : o)),
      );
    } catch (err) {
      console.error("Update errore:", err);
    }
  };

  //D
  const handleDelete = async (id) => {
    try {
      const res = await deleteOrder(id, token);
      console.log(res.data);
      setOrders((prev) => prev.filter((o) => o.id != id));
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  return (
    <>
      <div className="container80 manageContaner">
        <h2>Ordini</h2>

        {loading && (
          <div className="spinner-border flexContainerCenter" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        <div className="d-flex gap-1 mb-2">
          {["All", ...orderStates].map((s) => (
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
              <th>Indirizzo</th>
              <th>Totale</th>
              <th>Stato</th>
              <th>Prodotti</th>
              <th>Azioni</th>
            </tr>
          </thead>
          
          <tbody>
            {orders &&
              orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                  <td>{o.address}</td>
                  <td>{o.total} €</td>
                  <td className="position-relative">
                    <div className="dropdown">
                      <button
                        className="btn btn-light dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        {stateIcons[o.state]}
                      </button>

                      <ul className="dropdown-menu">
                        {orderStates.map((s) => (
                          <li key={s}>
                            <button
                              className="dropdown-item d-flex align-items-center gap-2"
                              onClick={() => handleChangeState(o.id, s)}
                            >
                              {stateIcons[s]} {s}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>

                  <td>{o.products.length}</td>
                  <td>
                    <button
                      className="beatyButtonSm"
                      onClick={() => handleDelete(o.id)}
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

export default OrdersManager;
