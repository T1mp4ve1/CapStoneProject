import bgImg from "../img/img11.jpg";
import "./css/HomePageGuitar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getArtists } from "../services/artistService";

function HomePageGuitar() {
  const [artists, setArtist] = useState([]);

  useEffect(() => {
    getArtists()
      .then((data) => setArtist(data))
      .catch((err) => console.error("Fetch artist error:", err));
  }, []);

  return (
    <>
      {/* GUITAR */}

      <div className="generalHomeDiv">
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
              <Link as={Link} to="/#" className="fs-5 homeButton slowOpacity">
                Configura
              </Link>
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
              <Link as={Link} to="/#" className="fs-5 homeButton slowOpacity">
                Scopri la gamma
              </Link>
            </div>
          </div>
        </section>

        {/* ARTISTS */}
        <section>
          <div className="container90 text-center my-5">
            <h2 className="fontArtists">Hanno scelto noi</h2>
            <div className="row row-cols-5 g-1">
              {artists.map((a, index) => (
                <div className="col" key={index}>
                  <div className="card rounded-0 position-relative cardArtist">
                    <img src={a.img} alt={`artist-${index}`} />
                    <div className="position-absolute bottom-0 artistName">
                      <p className="fs-2">{a.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePageGuitar;
