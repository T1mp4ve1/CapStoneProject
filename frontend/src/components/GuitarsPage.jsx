import { useEffect, useState } from "react";
import { getGuitars } from "../services/guitarService";

function GuitarsPage() {
  const api = import.meta.env.VITE_API_URL;

  const [guitars, setGuitars] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <div className="row row-cols-4 g-2">
            {guitars.map((g) => (
              <div className="col" key={g.id}>
                <div className="card border-0 position-relative shadow guitarCard">
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
