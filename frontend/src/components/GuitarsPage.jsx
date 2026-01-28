import { useEffect, useState } from "react";

function GuitarsPage() {
  const api = import.meta.env.VITE_API_URL;

  const [guitars, setGuitars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1️⃣ FETCH CHITARRE
        const res = await fetch(`${api}/Guitar`);
        const guitarsData = await res.json();

        // 2️⃣ FETCH IMMAGINI PER OGNI CHITARRA
        const guitarsWithImages = await Promise.all(
          guitarsData.map(async (g) => {
            const imgRes = await fetch(`${api}/Image/${g.id}`);
            const images = await imgRes.json();

            return {
              ...g,
              images: images, // array di immagini
              mainImage: images.find((i) => i.isMain)?.url || null,
            };
          })
        );

        setGuitars(guitarsWithImages);
      } catch (err) {
        console.error("Error loading guitars page:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="containerAfterNavbar slowOpacity">
        <h2>Loading guitars...</h2>
      </div>
    );
  }

  return (
    <div className="containerAfterNavbar slowOpacity">
      <h2>Guitars Page</h2>

      <div className="guitarsGrid">
        {guitars.map((g) => (
          <div key={g.id} className="guitarCard">
            <img
              src={g.mainImage || "/placeholder.png"}
              alt={g.name}
              className="guitarThumb"
            />
            <h4>{g.name}</h4>
            <p>{g.description}</p>
            <small>Tipo: {g.category}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuitarsPage;