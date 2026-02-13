import { useContext, useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";

function UsersManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { token } = useContext(AuthContext);

  // R
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(token);
        setUsers(data);
      } catch (err) {
        console.error("Artists fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // U
  // const handleUpdate = async () => {
  //   try {
  //     const edited = await updateArtist(editArtist.id, editArtist);
  //     setArtists((prev) => prev.map((a) => (a.id === edited.id ? edited : a)));
  //     setEditArtist(null);
  //   } catch (err) {
  //     console.error("Update artist error", err);
  //   }
  // };

  // D
  const handleDelete = async (email) => {
    try {
      await deleteUser(email, token);
      setUsers((prev) => prev.filter((u) => u.email !== email));
    } catch (err) {
      console.error("User delete error:", err);
    }
  };

  // SEARCH
  useEffect(() => {
    const result = users.filter((u) => u.email.includes(searched));
    setFiltered(result);
  }, [searched, users]);

  if (loading) {
    return (
      <div className="spinner-border flexContainerCenter" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="container80 manageContaner">
        <h2>Utenti</h2>
        {/* LIST */}
        <div className="artistListContainer">
          <input
            type="text"
            className="form-control mb-3 rounded-4 border-0"
            placeholder="User id..."
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
          />
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Email</th>
                <th>CreatedAt</th>
                <th>Telefono</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...filtered].reverse().map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>
                    {u.email}
                    {u.emailConfirmed ? (
                      <i className="bi bi-check text-success"></i>
                    ) : (
                      <i className="bi bi-x text-danger"></i>
                    )}
                  </td>
                  <td>
                    {new Date(u.createdAt).toLocaleString("it-IT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    {u.phoneNumber && (
                      <>
                        {u.phoneNumber}
                        {u.phoneNumberConfirmed ? (
                          <i className="bi bi-check text-success"></i>
                        ) : (
                          <i className="bi bi-x text-danger"></i>
                        )}
                      </>
                    )}
                  </td>
                  <td className="d-flex flex-column justify-content-center">
                    <button className="editButtonSm mb-2">
                      <i className="bi bi-pen"></i>
                    </button>
                    <button
                      className="beatyButtonSm"
                      onClick={() => handleDelete(u.email)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UsersManager;
