import { useEffect, useState } from "react";
import { getGuitars } from "../services/guitarService";
import { useNavigate } from "react-router-dom";

function GuitarsPage() {
  const api = import.meta.env.VITE_API_URL;

  const [guitars, setGuitars] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortGuit, setSortGuit] = useState("none");
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleFilter = (value) => {
    setActiveCategory(value);
    const catFilter =
      value === "Tutti" ? guitars : guitars.filter((g) => g.category === value);

    if (sortGuit === "asc") {
      setFiltered([...catFilter].sort((a, b) => a.price - b.price));
      return;
    }
    if (sortGuit === "desc") {
      setFiltered([...catFilter].sort((a, b) => b.price - a.price));
      return;
    }
    setFiltered(catFilter);
  };

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
        setFiltered(guitarsWithImages);
      } catch (err) {
        console.error("Error guitars page:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGuitars();
  }, []);

  useEffect(() => {
    handleFilter(activeCategory);
  }, [sortGuit]);

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
        <div className="container80">
          <div className="flexContainerBetween my-2">
            <div>
              <button
                className={`me-1
                ${activeCategory === "Tutti" ? "beatyButton3Active" : "beatyButton3"}
              `}
                onClick={() => handleFilter("Tutti")}
              >
                Tutti
              </button>
              <button
                className={`me-1
                ${activeCategory === "Acoustic" ? "beatyButton3Active" : "beatyButton3"}
              `}
                onClick={() => handleFilter("Acoustic")}
              >
                Acoustic
              </button>
              <button
                className={`me-1
                ${activeCategory === "Classic" ? "beatyButton3Active" : "beatyButton3"}
              `}
                onClick={() => handleFilter("Classic")}
              >
                Classic
              </button>
              <button
                className={`me-1
                ${activeCategory === "Electric" ? "beatyButton3Active" : "beatyButton3"}
              `}
                onClick={() => handleFilter("Electric")}
              >
                Electric
              </button>
              <button
                className={`me-1
                ${activeCategory === "Hollow" ? "beatyButton3Active" : "beatyButton3"}
              `}
                onClick={() => handleFilter("Hollow")}
              >
                Hollow
              </button>
            </div>

            <div className="flexContainerCenter">
              <p>Prezzo:</p>
              <button
                className={`mx-1
                ${sortGuit === "asc" ? "beatyButton3Active" : "beatyButton3"}
              `}
                onClick={() => setSortGuit("asc")}
              >
                <i className="bi bi-arrow-up-short"></i>
              </button>
              <button
                className={`me-1
                ${sortGuit === "desc" ? "beatyButton3Active" : "beatyButton3"}
              `}
                onClick={() => setSortGuit("desc")}
              >
                <i className="bi bi-arrow-down-short"></i>
              </button>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2">
            {filtered.map((g) => (
              <div className="col" key={g.id}>
                <div
                  className="card border-0 shadow guitarCard"
                  onClick={() => navigate(`/Product/${g.id}`)}
                >
                  <img src={g.mainImage} alt="img" />
                  <p>{g.price}€</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default GuitarsPage;
