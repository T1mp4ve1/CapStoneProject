import { useEffect, useState } from "react";
import { getOrders } from "../../services/ordersService";

function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //C

  // R
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
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

  //D

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

        <table className="table table-striped table-hover mt-4">
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
                <>
                  <tr className="table-primary" key={o.id}>
                    <td>{o.id}</td>
                    <td>{new Date(o.createdAt).toLocaleString()}</td>
                    <td>{o.address}</td>
                    <td>{o.total} €</td>
                    <td>{o.state}</td>
                    <td>{o.products.length}</td>
                  </tr>

                  <tr>
                    <td colSpan="6">
                      <table className="table table-sm table-bordered mt-2">
                        <thead>
                          <tr>
                            <th>Prodotto</th>
                            <th>Quantità</th>
                            <th>Prezzo unitario</th>
                          </tr>
                        </thead>
                        <tbody>
                          {o.products.map((p) => (
                            <tr key={p.id}>
                              <td>{p.productName}</td>
                              <td>{p.quantity}</td>
                              <td>{p.unitPrice} €</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrdersManager;
