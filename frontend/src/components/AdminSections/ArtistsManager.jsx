import { useEffect, useState } from "react";
import {
  createArtist,
  deleteArtist,
  getArtists,
  updateArtist,
} from "../../services/artistService";

function ArtistsManager() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [editArtist, setEditArtist] = useState(null);
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
  const handleUpdate = async () => {
    try {
      const edited = await updateArtist(editArtist.id, editArtist);
      setArtists((prev) => prev.map((a) => (a.id === edited.id ? edited : a)));
      setEditArtist(null);
    } catch (err) {
      console.error("Update artist error", err);
    }
  };

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

  return (
    <>
      {/* CREATE FORM */}
      <div className="createArtistContainer">
        <h3>Aggiungi artista</h3>
        <input
          type="text"
          className="form-control mb-2 rounded-4 border-0"
          placeholder="Nome..."
          value={newArtist.name}
          onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2 rounded-4 border-0"
          placeholder="URL immagine..."
          value={newArtist.img}
          onChange={(e) => setNewArtist({ ...newArtist, img: e.target.value })}
        />
        <textarea
          className="form-control mb-2 rounded-4 border-0"
          placeholder="Descrizione..."
          value={newArtist.about}
          onChange={(e) =>
            setNewArtist({ ...newArtist, about: e.target.value })
          }
        />
        <button
          className="mb-4 w-100 loginBtn"
          onClick={() => handleCreateArtist()}
        >
          Aggiungi
        </button>
      </div>

      {/* UPDATE FORM */}
      {editArtist && (
        <div className="modalOverlay" onClick={() => setEditArtist(null)}>
          <div
            className="modalContent fastOpacity"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Modifica artista</h3>

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nome..."
              value={editArtist.name}
              onChange={(e) =>
                setEditArtist({ ...editArtist, name: e.target.value })
              }
            />

            <input
              type="text"
              className="form-control mb-2"
              placeholder="URL immagine..."
              value={editArtist.img}
              onChange={(e) =>
                setEditArtist({ ...editArtist, img: e.target.value })
              }
            />

            <textarea
              className="form-control mb-2"
              placeholder="Descrizione..."
              value={editArtist.about}
              onChange={(e) =>
                setEditArtist({ ...editArtist, about: e.target.value })
              }
            />

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-success w-100" onClick={handleUpdate}>
                Salva
              </button>

              <button
                className="btn btn-secondary w-100"
                onClick={() => setEditArtist(null)}
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIST */}
      <div>
        <h2>Lista artisti</h2>
        <input
          type="text"
          className="form-control mb-3 rounded-4 border-0"
          placeholder="Nome artista..."
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Img</th>
              <th>About</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <tr>
                  <td>
                    <div className="spinner-border"></div>
                  </td>
                  <td>
                    <div className="spinner-border"></div>
                  </td>
                  <td>
                    <div className="spinner-border"></div>
                  </td>
                  <td>
                    <div className="spinner-border"></div>
                  </td>
                  <td>
                    <div className="spinner-border"></div>
                  </td>
                  <td>
                    <div className="spinner-border"></div>
                  </td>
                </tr>
              </>
            ) : (
              <>
                {[...filtered].reverse().map((a) => (
                  <tr key={a.id}>
                    <td scope="row">{a.id}</td>
                    <td>{a.name}</td>
                    <td>
                      <img src={a.img} alt="img" width={60} />{" "}
                    </td>
                    <td>{a.about}</td>
                    <td>
                      <button
                        className="editButtonSm mb-2"
                        onClick={() => setEditArtist(a)}
                      >
                        <i className="bi bi-pen"></i>
                      </button>
                      <button
                        className="beatyButtonSm"
                        onClick={() => handleDelete(a.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ArtistsManager;
