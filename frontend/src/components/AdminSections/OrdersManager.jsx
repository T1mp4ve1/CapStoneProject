import { useEffect, useState } from "react";
import {
  deleteOrder,
  getOrders,
  updateOrderState,
} from "../../services/ordersService";
import { useAuth } from "../../context/UseAuth";

function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

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
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(token);
        setOrders(data.data);
        console.log(data.data);
      } catch (err) {
        console.error("Guitar page fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  //U
  const handleChangeState = async (id, newState) => {
    try {
      const res = await updateOrderState(id, newState, token);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, state: newState } : o)),
      );
      console.log(res);
    } catch (err) {
      console.error("Update errore:", err);
    }
  };

  //D
  const handleCancel = async (id) => {
    try {
      const res = await deleteOrder(id, token);
      console.log(res.data);
      setOrders((prev) => prev.filter((o) => o.id != id));
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  if (loading) {
    return (
      <div className="spinner-border flexContainerCenter" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="container80 manageContaner">
        <h2>Ordini</h2>

        <table className="table table-striped">
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
                      className="btn btn-danger"
                      onClick={() => handleCancel(o.id)}
                    >
                      X
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
