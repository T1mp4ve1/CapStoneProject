import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./css/CustomshopPage.css";
import {
  colors,
  guitarBodies,
  materials,
  pickups,
  imgs,
} from "../services/customShopService";

function CustomshopPage() {
  const { addToCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const updateGuitar = (key, value) => {
    setGuitar((prev) => ({ ...prev, [key]: value }));
  };

  const [guitar, setGuitar] = useState({
    body: "Acoustic",
    material: "Palissandro",
    color: "Colore1",
    pickup: "Pickup1",
  });

  useEffect(() => {
    const bodyPrice =
      guitarBodies.find((b) => b.body === guitar.body).price || 0;
    const materialPrice =
      materials.find((m) => m.name === guitar.material).price || 0;
    const colorPrice = colors.find((c) => c.name === guitar.color).price || 0;
    const pickupPrice =
      pickups.find((p) => p.name === guitar.pickup).price || 0;
    setTotal(bodyPrice + materialPrice + colorPrice + pickupPrice);
    console.log(guitar);
  }, [guitar]);

  return (
    <div className="containerAfterNavbar slowOpacity">
      <div className="row g-1 gridDetails">
        <div className="col-12 customShopImageContainer">
          <img src={imgs[guitar.body]} className="customShopMainImg" />
        </div>

        {/* CAROUSEL */}
        <div className="col-12 cardCustomShop shadow-sm">
          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="4"
                aria-label="Slide 5"
              ></button>
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active carouselCustom">
                <div className="carousel-caption">
                  <h5>Scegli il tipo</h5>
                  <div className="d-flex gap-3 justify-content-center mt-3">
                    {guitarBodies.map((t) => (
                      <button
                        key={t.body}
                        className={`btn ${guitar.body === t.body ? "btn-dark" : "btn-outline-dark"}`}
                        onClick={() => updateGuitar("body", t.body)}
                      >
                        <p>{t.body}</p>
                        <hr className="mt-0 mb-1" />
                        <p>{t.price} €</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="carousel-item carouselCustom">
                <div className="carousel-caption">
                  <h5>Scegli materiale</h5>
                  <div className="d-flex gap-3 justify-content-center mt-3">
                    {materials.map((m) => (
                      <button
                        key={m.name}
                        className={`btn ${guitar.material === m.name ? "btn-dark" : "btn-outline-dark"}`}
                        onClick={() => updateGuitar("material", m.name)}
                      >
                        <p>{m.name}</p>
                        <hr className="mt-0 mb-1" />
                        <p>{m.price} €</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="carousel-item carouselCustom">
                <div className="carousel-caption">
                  <h5>Scegli il colore</h5>
                  <div className="d-flex gap-3 justify-content-center mt-3">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        className={`btn ${guitar.color === c.name ? "btn-dark" : "btn-outline-dark"}`}
                        onClick={() => updateGuitar("color", c.name)}
                      >
                        <p>{c.name}</p>
                        <hr className="mt-0 mb-1" />
                        <p>{c.price} €</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="carousel-item carouselCustom">
                <div className="carousel-caption">
                  <h5>Scegli il pickup</h5>
                  <div className="d-flex gap-3 justify-content-center mt-3">
                    {pickups.map((p) => (
                      <button
                        key={p.name}
                        className={`btn ${guitar.pickup === p.name ? "btn-dark" : "btn-outline-dark"}`}
                        onClick={() => updateGuitar("pickup", p.name)}
                      >
                        <p>{p.name}</p>
                        <hr className="mt-0 mb-1" />
                        <p>{p.price} €</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="carousel-item carouselCustom">
                <div className="carousel-caption">
                  <h5>Conferma</h5>
                  <div className="">
                    <h2 className="my-2">{total} €</h2>
                    <button
                      className="beatyButton2"
                      onClick={() => addToCart(guitar)}
                    >
                      Aggiungi al carello
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomshopPage;
