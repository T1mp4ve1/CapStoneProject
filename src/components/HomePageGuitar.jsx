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

        <Container fluid className="hpTop d-flex justify-content-between text-light">
          <div>
            <h2 style={{ fontSize: "5rem" }}>
              <span className="fade-in" style={{ animationDelay: "0.3s" }}>
                Scelto da te
              </span>
              <br />
              <span className="fade-in" style={{ animationDelay: "0.4s" }}>
                Fatto da noi
              </span>
            </h2>
            <p
              className="fs-3 hero-subtitle fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              La tua idea diventa nostra passione
            </p>
            <button
              className="btn fs-5 homeButtonLeft text-light fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              Prova configurare
            </button>
          </div>

          <div className=" text-end">
            <h2 style={{ fontSize: "5rem" }}>
              <span className="fade-in" style={{ animationDelay: "0.5s" }}>
                Nostra
              </span>
              <br />
              <span className="fade-in" style={{ animationDelay: "0.6s" }}>
                Collezione
              </span>
            </h2>
            <p
              className="fs-3 hero-subtitle fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              Artigianato, passione e suoni che ispirano
            </p>
            <button
              className="btn fs-5 homeButtonRight text-dark fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              Scopri la gamma
            </button>
          </div>
        </Container>

        <div>
          <h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam qui fugit tempora laudantium, odio placeat iure repudiandae mollitia officia harum? Voluptas fuga nam animi corporis quas modi velit? Eos, incidunt.
          </h4>
        </div>
      </div>
    </>
  );
}

export default HomePageGuitar;
