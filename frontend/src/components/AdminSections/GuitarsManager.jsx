import { useEffect, useState } from "react";
import {
  createGuitar,
  deleteGuitar,
  getGuitars,
  updateGuitar,
} from "../../services/guitarService";
import { getToken } from "../../services/authService";

function GuitarsManager() {
  const api = import.meta.env.VITE_API_URL;
  const [guitars, setGuitars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingOnCreate, setLoadingOnCreate] = useState(false);
  const [searched, setSearched] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [editGuitar, setEditGuitar] = useState(null);
  const [newGuitar, setNewGuitar] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: 1,
    images: [],
  });

  // C
  const handleCreateGuitar = async () => {
    setLoadingOnCreate(true);
    try {
      const created = await createGuitar(newGuitar);

      if (newGuitar.images.length > 0) {
        const token = getToken();

        for (let i = 0; i < newGuitar.images.length; i++) {
          const formData = new FormData();
          formData.append("file", newGuitar.images[i]);
          formData.append("EntityType", 1);
          formData.append("EntityId", created.id);
          formData.append("IsMain", i === 0);

          try {
            await fetch(`${api}/Image/upload`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });
          } catch (err) {
            console.error("Error upload image", err);
          }
        }
      }

      setGuitars((prev) => [...prev, created]);
      setNewGuitar({
        name: "",
        description: "",
        price: 0,
        categoryId: 1,
        images: [],
      });
    } catch (err) {
      console.error("Create guitar page error:", err);
    } finally {
      setLoadingOnCreate(false);
    }
  };

  // R
  useEffect(() => {
    const fetchGuitars = async () => {
      try {
        const data = await getGuitars();
        setGuitars(data);
      } catch (err) {
        console.error("Guitar page fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuitars();
  }, []);

  // U
  const handleUpdate = async () => {
    try {
      const edited = await updateGuitar(editGuitar.id, editGuitar);
      setGuitars((prev) => prev.map((a) => (a.id === edited.id ? edited : a)));
      setEditGuitar(null);
    } catch (err) {
      console.error("Update guitar page error", err);
    }
  };

  // D
  const handleDelete = async (id) => {
    try {
      await deleteGuitar(id);
      setGuitars((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      console.error("Guitar page delete error:", err);
    }
  };

  // SEARCH
  useEffect(() => {
    const result = guitars.filter((g) => g.id.includes(searched));
    setFiltered(result);
  }, [searched, guitars]);

  if (loading) {
    return (
      <div className="spinner-border flexContainerCenter" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container80 manageContaner">
      {/* CREATE FORM */}
      <div className="createGuitarContainer position-relative">
        <h3>Aggiungi chitarra</h3>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nome..."
          value={newGuitar.name}
          onChange={(e) => setNewGuitar({ ...newGuitar, name: e.target.value })}
        />
        <input
          type="number"
          step={0.01}
          className="form-control mb-2"
          placeholder="Prezzo..."
          value={newGuitar.price}
          onChange={(e) =>
            setNewGuitar({ ...newGuitar, price: parseFloat(e.target.value) })
          }
        />
        <textarea
          type="text"
          className="form-control mb-2"
          placeholder="Description..."
          value={newGuitar.description}
          onChange={(e) =>
            setNewGuitar({ ...newGuitar, description: e.target.value })
          }
        />
        <select
          className="form-select mb-2"
          value={newGuitar.categoryId}
          onChange={(e) =>
            setNewGuitar({ ...newGuitar, categoryId: Number(e.target.value) })
          }
          aria-label="Default select example"
        >
          <option value={1}>Acoustic</option>
          <option value={2}>Electric</option>
          <option value={3}>Classic</option>
          <option value={4}>Hollow body</option>
        </select>
        <input
          type="file"
          multiple
          className="form-control mb-2"
          onChange={(e) =>
            setNewGuitar({ ...newGuitar, images: Array.from(e.target.files) })
          }
        />
        <button className="mb-4 w-100" onClick={() => handleCreateGuitar()}>
          Aggiungi
        </button>
        {loadingOnCreate && (
          <>
            <div className="loadingOverlay">
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* UPDATE FORM */}
      {editGuitar && (
        <div className="modalOverlay">
          <div
            className="modalContent fastOpacity"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Modifica chitarra</h3>

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nome..."
              value={editGuitar.name}
              onChange={(e) =>
                setEditGuitar({ ...editGuitar, name: e.target.value })
              }
            />

            <input
              type="number"
              step={0.01}
              className="form-control mb-2"
              placeholder="Prezzo..."
              value={editGuitar.price}
              onChange={(e) =>
                setEditGuitar({ ...editGuitar, price: e.target.value })
              }
            />

            <textarea
              type="text"
              className="form-control mb-2"
              placeholder="Description..."
              value={editGuitar.description}
              onChange={(e) =>
                setEditGuitar({ ...editGuitar, description: e.target.value })
              }
            />

            <select
              className="form-select mb-2"
              value={editGuitar.categoryId}
              onChange={(e) =>
                setEditGuitar({
                  ...editGuitar,
                  categoryId: Number(e.target.value),
                })
              }
              aria-label="Default select example"
            >
              <option value={1}>Acoustic</option>
              <option value={2}>Electric</option>
              <option value={3}>Classic</option>
              <option value={4}>Hollow body</option>
            </select>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-success w-100" onClick={handleUpdate}>
                Salva
              </button>

              <button
                className="btn btn-secondary w-100"
                onClick={() => setEditGuitar(null)}
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIST */}
      <div className="artistListContainer">
        <h2>Lista chitarre</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Id chitarra..."
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Tipo</th>
              <th scope="col">TipoId</th>
              <th scope="col">About</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...filtered].reverse().map((g) => (
              <tr key={g.id}>
                <th scope="row">{g.id}</th>
                <td>{g.name}</td>
                <td>{g.price}</td>
                <td>{g.category}</td>
                <td>{g.categoryId}</td>
                <td>{g.description}</td>
                <td>
                  <button
                    className="btn btn-outline-warning mb-2"
                    onClick={() => setEditGuitar(g)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(g.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GuitarsManager;
