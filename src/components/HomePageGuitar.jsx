import { Button, Container } from "react-bootstrap";
import bgImg from "../img/img11.jpg";
import "./css/HomePageGuitar.css";

function HomePageGuitar() {
  return (
    <>
      <div className="generalHomeDiv">
        <div
          className="position-relative bgZoom"
          style={{
            backgroundImage: `url(${bgImg})`,
            minHeight: "100vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="hpTop d-flex justify-content-between text-light">
          <div
            className="homeTopLeft slowOpacity shadow text-center"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="homeTopLeftIn">
              <h2 style={{ fontSize: "5rem" }}>
                <span className="slowOpacity">Scelto da te</span>
                <br />
                <span className="slowOpacity">Fatto da noi</span>
              </h2>
              <p className="fs-3 hero-subtitle slowOpacity">
                La tua idea diventa nostra passione
              </p>
              <button className="btn fs-5 homeButtonLeft text-light slowOpacity">
                Configura
              </button>
            </div>
          </div>

          <div
            className="homeTopRight slowOpacity shadow text-center"
            style={{ animationDelay: "0.4s" }}
          >
            <h2 style={{ fontSize: "5rem" }}>
              <span className="slowOpacity">Nostra</span>
              <br />
              <span className="slowOpacity">Collezione</span>
            </h2>
            <p className="fs-3 hero-subtitle slowOpacity">
              Artigianato, passione e suoni che ispirano
            </p>
            <button className="btn fs-5 homeButtonRight text-light slowOpacity">
              Scopri la gamma
            </button>
          </div>
        </div>

        <div>
          <h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            qui fugit tempora laudantium, odio placeat iure repudiandae mollitia
            officia harum? Voluptas fuga nam animi corporis quas modi velit?
            Eos, incidunt.
          </h4>
        </div>
      </div>
    </>
  );
}

export default HomePageGuitar;
