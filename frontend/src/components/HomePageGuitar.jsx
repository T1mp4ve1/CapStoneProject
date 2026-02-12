import bgImg from "../img/img11.jpg";
import shopImg from "../img/img15.png";
import "./css/HomePageGuitar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getArtists } from "../services/artistService";
import { getGuitars } from "../services/guitarService";

function HomePageGuitar() {
  const api = import.meta.env.VITE_API_URL;
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guitars, setGuitars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGuitars = async () => {
      try {
        const guitars = await getGuitars();

        const guitarsWithImages = await Promise.all(
          guitars.map(async (g) => {
            const imgRes = await fetch(`${api}/Image/${g.id}`);
            const images = await imgRes.json();

            return {
              ...g,
              images: images,
              mainImage: images.find((i) => i.isMain)?.url || null,
            };
          }),
        );

        setGuitars(guitarsWithImages);
      } catch (err) {
        console.error("Error guitars page:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGuitars();
  }, []);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists();
        setArtists(data);
      } catch (err) {
        console.error("Artists fetch error:", err);
      }
    };
    fetchArtists();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver( //
      (entries) => {
        //
        entries.forEach((entry) => {
          //
          if (entry.isIntersecting) {
            //
            entry.target.classList.add("visible"); //
            observer.unobserve(entry.target); //
          }
        });
      },
      { threshold: 0.1 }, //
    );
    elements.forEach((e) => observer.observe(e)); //
  }, [guitars, artists]);

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
      <div className="generalHomeDiv">
        {/* TOP */}
        <section>
          <div
            className="position-relative bgZoom"
            style={{
              backgroundImage: `url(${bgImg})`,
              minHeight: "100vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="hpTop d-flex justify-content-between text-light container90">
            <div
              className="glassContainer slowOpacity shadow text-center"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 style={{ fontSize: "5rem" }}>
                <span className="slowOpacity">Scelto da te</span>
                <br />
                <span className="slowOpacity">Fatto da noi</span>
              </h2>
              <p className="fs-3 mb-3 hero-subtitle slowOpacity">
                La tua idea diventa nostra passione
              </p>
              <button className="beatyButton slowOpacity">
                <Link to="/Customshop" className="fs-5">
                  Configura
                </Link>
              </button>
            </div>

            <div
              className="glassContainer slowOpacity shadow text-center"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 style={{ fontSize: "5rem" }}>
                <span className="slowOpacity">Nostra</span>
                <br />
                <span className="slowOpacity">Collezione</span>
              </h2>
              <p className="fs-3 mb-3 hero-subtitle slowOpacity">
                Artigianato, passione e suoni che ispirano
              </p>
              <button className="beatyButton slowOpacity">
                <Link to="/Guitars" className="fs-5">
                  Scopri la gamma
                </Link>
              </button>
            </div>
          </div>
        </section>

        {/* MOST POPULAR */}
        <section>
          <div className="container80 my-5 fade-in">
            <h2 className="fontTitle">Piu popolari</h2>
            <div className="row row-cols-4 g-2">
              {guitars.slice(7, 11).map((g) => (
                <div className="col" key={g.id}>
                  <div
                    className="card border-0 position-relative shadow guitarCard"
                    onClick={() => navigate(`/Product/${g.id}`)}
                  >
                    <img src={g.mainImage} alt="img" />
                    <p>{g.price}€</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CUSTOM SHOP */}
        <section>
          <div
            className="customShopContainer fade-in"
            style={{
              backgroundImage: `url(${shopImg})`,
              minHeight: "100vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="text-center knockoutText">
              Sul mercato <br /> da <br /> 1987
            </h2>
          </div>
        </section>

        {/* ARTISTS */}
        <section>
          <div className="container90 my-5 fade-in">
            <h2 className="fontTitle">Hanno scelto noi</h2>

            {loading ? (
              <>
                <div
                  className="spinner-border flexContainerCenter"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              <>
                <div className="row row-cols-5 g-1">
                  {artists.map((a, index) => (
                    <div className="col" key={a.id}>
                      <div className="card rounded-0 position-relative cardArtist">
                        <img src={a.img} alt={`artist-${index}`} />
                        <div className="position-absolute bottom-0 artistName text-center">
                          <p className="fs-2">{a.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePageGuitar;
