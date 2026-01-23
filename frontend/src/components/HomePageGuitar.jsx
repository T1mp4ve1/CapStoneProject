import bgImg from "../img/img11.jpg";
import shopImg from "../img/img15.png";
import g1 from "../img/g1.png";
import g2 from "../img/g2.png";
import g3 from "../img/g3.png";
import g4 from "../img/g4.png";
import g5 from "../img/g5.png";
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
  }, []);

  const guitArray = [
    { img: g1, price: 240 },
    { img: g2, price: 350 },
    { img: g3, price: 670 },
    { img: g4, price: 210 },
    { img: g5, price: 1670 },
  ];

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

        {/* MOST POPULAR */}
        <section>
          <div className="container80 my-5 fade-in">
            <h2 className="fontTitle">Piu popolari</h2>
            <div className="row row-cols-5">
              {guitArray.map((g, index) => (
                <div className="col" key={index}>
                  <div
                    className="card border-0 position-relative shadow guitarCard"
                    style={{ width: "18rem;" }}
                  >
                    <img src={g.img} alt="img" />
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
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePageGuitar;
