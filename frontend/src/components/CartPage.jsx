import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { getGuitar } from "../services/guitarService";
import "./css/CartPage.css";
import imgEmptyCart from "../img/imgEmptyCart.png";

const CartPage = () => {
  const { removeFromCart, cart, increaseQty, decreaseQty } =
    useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // localStorage.removeItem("cart");

  useEffect(() => {
    const loadData = async () => {
      try {
        const results = await Promise.all(
          cart.map(async (item) => {
            const data = await getGuitar(item.productId);
            return { ...data, quantity: item.quantity };
          }),
        );
        setProducts(results);
        console.log(results);
      } catch (err) {
        console.error("Page cart error", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [cart]);

  if (loading) {
    return (
      <div className="containerAfterNavbar flexContainerCenter slowOpacity">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <div className="containerAfterNavbar">
        <div className="row flexContainerCenter">
          <div className="col-6">
            <div></div>
            {products.length === 0 && (
              <div className="text-center">
                <img src={imgEmptyCart} />
                <h4>
                  Ci puoi sempre aggiungere qualcosa...
                </h4>
              </div>
            )}

            {products.map((p) => (
              <div
                key={p.id}
                className="my-2 rounded-3 shadow-sm position-relative"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={p.mainImg}
                    alt={p.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    className="me-3 rounded"
                  />

                  <div>
                    <h5 className="mb-1">{p.name}</h5>
                    <p className="text-secondary mb-1">{p.price} €</p>

                    <div className="d-flex align-items-center">
                      {p.quantity === 1 ? (
                        <>
                          <button
                            className="qntButton"
                            onClick={() => removeFromCart(p.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="qntButton"
                            onClick={() => decreaseQty(p.id)}
                          >
                            <i className="bi bi-dash-lg"></i>
                          </button>
                        </>
                      )}
                      <span className="mx-2">{p.quantity}</span>
                      <button
                        className="qntButton"
                        onClick={() => increaseQty(p.id)}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    </div>
                    <button
                      className="beatyButtonSm closeButton"
                      onClick={() => removeFromCart(p.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {products.length > 0 && (
              <div className="mt-4 p-3 border rounded shadow-sm">
                <h4>Totale: {total} €</h4>
                <button className="beatyButton2 w-100 mt-3">
                  Procedi al checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CartPage;
