import { useEffect, useState } from "react";
import {
  createArtist,
  deleteArtist,
  getArtists,
} from "../../services/artistService";

function ArtistsManager() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [newArtist, setNewArtist] = useState({
    name: "",
    img: "",
    about: "",
  });

  // C
  const handleCreateArtist = async () => {
    try {
      const created = await createArtist(newArtist);
      setArtists((prev) => [...prev, created]);
      setNewArtist({ name: "", img: "", about: "" });
    } catch (err) {
      console.error("Create artist error:", err);
    }
  };

  // R
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists();
        setArtists(data);
      } catch (err) {
        console.error("Artists fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  // U

  // D
  const handleDelete = async (id) => {
    try {
      await deleteArtist(id);
      setArtists((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Artist delete error:", err);
    }
  };

  // SEARCH
  useEffect(() => {
    const result = artists.filter((a) =>
      a.name.toLowerCase().includes(searched.toLowerCase()),
    );
    setFiltered(result);
  }, [searched, artists]);

  if (loading) {
    return (
      <div className="spinner-border flexContainerCenter" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  // https://chitartstorage.blob.core.windows.net/images/d47cb81a-f244-4f88-9e60-728001017e25.jpg
  return (
    <>
      <div className="container80 manageContaner">
        <div className="createArtistContainer">
          <h3>Aggiungi artista</h3>
          <p>ciao</p>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nome..."
            value={newArtist.name}
            onChange={(e) =>
              setNewArtist({ ...newArtist, name: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="URL immagine..."
            value={newArtist.img}
            onChange={(e) =>
              setNewArtist({ ...newArtist, img: e.target.value })
            }
          />
          <textarea
            className="w-100"
            placeholder="Descrizione..."
            value={newArtist.about}
            onChange={(e) =>
              setNewArtist({ ...newArtist, about: e.target.value })
            }
          />
          <button className="mb-4 w-100" onClick={() => handleCreateArtist()}>
            Aggiungi
          </button>
        </div>

        <h2>Lista artisti</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nome artista..."
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Img</th>
              <th scope="col">About</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...filtered].reverse().map((a) => (
              <tr key={a.id}>
                <th scope="row">{a.id}</th>
                <td>{a.name}</td>
                <td>
                  <img src={a.img} alt="img" width={60} />{" "}
                </td>
                <td>{a.about}</td>
                <td>
                  <button className="btn btn-outline-warning mb-2">
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(a.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ArtistsManager;
