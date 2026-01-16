import { Button, Container } from "react-bootstrap";
import bgImg from "../img/img1.jpg";
import "./css/HomePageGuitar.css";

function HomePageGuitar() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          // minHeight: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container fluid className="hpTop text-light">
          <h2 style={{ fontSize: "5rem" }}>
            <span className="fade-in" style={{ animationDelay: "0.3s" }}>Scelto da te.</span>
            <br />
            <span className="fade-in" style={{ animationDelay: "0.4s" }}>Fatto da noi.</span>
          </h2>
          <p
            className="fs-3 hero-subtitle fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            Artigianato, passione e suoni che ispirano
          </p>
          <button className="btn fs-5 homeButton text-light fade-in" style={{ animationDelay: "0.6s" }}>
            Scopri la nostra gamma
          </button>
        </Container>
      </div>
      <Container fluid>
        <h4>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores,
          ab porro ducimus, culpa omnis illo soluta beatae aliquid enim, a
          magnam. Sint id laudantium porro ipsum eveniet quis atque adipisci.
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque minima
          nisi illum ad debitis cum voluptates ea, corrupti, maxime nam eos
          similique numquam, error ipsa. Voluptatum repellat ut dolor tempora.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum omnis
          iure corporis explicabo quaerat magni aliquid aperiam asperiores
          impedit assumenda! Earum vero cupiditate soluta magni quis nihil
          itaque dolorum numquam.
        </h4>
      </Container>
    </>
  );
}

export default HomePageGuitar;
