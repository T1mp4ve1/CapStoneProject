import { useEffect, useState } from "react";
import { useAuth } from "../../context/UseAuth";
import { getUserOrders } from "../../services/ordersService";

function UserOrders() {
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

  useEffect(() => {
    const userOrders = async () => {
      try {
        const res = await getUserOrders(token);
        setOrders(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Fetch page error", err);
      } finally {
        setLoading(false);
      }
    };
    userOrders();
  }, []);

  return (
    <>
      <div className="containerAfterNavbar slowOpacity">
        <h2 className="ms-3 pt-4">I miei ordini</h2>
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
              <th>Indirizzo</th>
              <th>Totale</th>
              <th>Stato</th>
              <th>Prodotti</th>
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
                  <td>
                    <span>
                      {stateIcons[o.state]}
                      <span className="ms-2">{o.state}</span>
                    </span>
                  </td>
                  <td>{o.products.length}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserOrders;
