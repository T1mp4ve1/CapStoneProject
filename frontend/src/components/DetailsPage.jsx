import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGuitar } from "../services/guitarService";
import "./css/DetailsPage.css";
import { CartContext } from "../context/CartContext";

function DetailsPage() {
  const { id } = useParams();
  const [guitar, setGuitar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getGuitar(id);
        setGuitar(data);
        console.log(data);
      } catch (err) {
        console.error("Page details error", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="containerAfterNavbar flexContainerCenter slowOpacity">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="containerAfterNavbar slowOpacity">
        {guitar && (
          <>
            <div className="row g-1 gridDetails">
              <div className="col-8">
                <div className="row flexContainerCenter">
                  <div className="col-12 detailsImageContainer">
                    <img src={guitar.mainImg} className="guitarMainImg" />
                  </div>
                  {guitar.imgs.map((i) => (
                    <div
                      className="col-3 border rounded-3 p-0 m-2 alternativeImgContainer"
                      key={i.id}
                    >
                      <img src={i.url} alt="img" className="alternativeImg" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-4">
                <div className="row row-cols-1 g-3">
                  <div className="col cardDetails shadow-sm">
                    <h2>{guitar.name}</h2>
                    <p>{guitar.category}</p>
                    <hr className="mb-1" />
                    <p className="text-secondary">modello: {guitar.id}</p>
                  </div>

                  <div className="col cardDetails shadow-sm">
                    <div className="d-flex justify-content-around align-items-center">
                      <h2 className="my-2">{guitar.price} €</h2>
                      <button
                        className="beatyButton2"
                        onClick={() => addToCart(guitar.id)}
                      >
                        Aggiungi al carello
                      </button>
                    </div>
                  </div>

                  <div className="col cardDetails shadow-sm">
                    <div className="row row-cols-2">
                      <div className="col flexContainerLeft">
                        <i className="bi bi-shield-check fs-3 me-1"></i>
                        <p>Garanzia a vita</p>
                      </div>
                      <div className="col flexContainerLeft">
                        <i className="bi bi-award fs-3 me-1"></i>
                        <p>Materiali di alta qualita'</p>
                      </div>
                      <div className="col flexContainerLeft">
                        <i className="bi bi-globe fs-3 me-1"></i>
                        <p>Spedizione ovunque</p>
                      </div>
                      <div className="col flexContainerLeft">
                        <i className="bi bi-tree fs-3 me-1"></i>
                        <p>Legni stagionati di prima scelta</p>
                      </div>
                    </div>
                  </div>

                  <div className="col cardDetails shadow-sm">
                    <h4>Descrizione</h4>
                    <p>{guitar.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default DetailsPage;
