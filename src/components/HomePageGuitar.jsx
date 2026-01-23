import { Button, Container } from "react-bootstrap";
import bgImg from "../img/img11.jpg";
import a1 from "../img/a1.jpg";
import a2 from "../img/a2.jpg";
import a3 from "../img/a3.jpg";
import a4 from "../img/a4.jpg";
import a5 from "../img/a5.jpg";
import "./css/HomePageGuitar.css";
import { Link } from "react-router-dom";

function HomePageGuitar() {
  let artist = [
    {
      img: a1,
      name: "BER",
    },
    {
      img: a2,
      name: "LB",
    },
    {
      img: a3,
      name: "TOD",
    },
    {
      img: a4,
      name: "JBM",
    },
    {
      img: a5,
      name: "PGM",
    },
  ];
  
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
        <section2>
          <div className="container90 text-center my-5">
            <h2 className="fontArtists">Hanno scelto noi</h2>
            <div className="row row-cols-5 g-1">
              {artist.map((a, index) => (
                <div className="col" key={index}>
                  <div className="card rounded-0 position-relative cardArtist">
                    <img src={a.img} alt={`artist-${index}`} />
                    <div className="position-absolute bottom-0 artistName">
                      <p className="fs-1">{a.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section2>
      </div>
    </>
  );
}

export default HomePageGuitar;
