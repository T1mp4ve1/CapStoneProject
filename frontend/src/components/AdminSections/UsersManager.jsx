import { useContext, useEffect, useState } from "react";
import {
  appRoles,
  deleteUser,
  getUsers,
  roleColors,
  updateUserRole,
} from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";

function UsersManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRole, setLoadingRole] = useState({});
  const [searched, setSearched] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { token } = useContext(AuthContext);

  // R
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(token);
        setUsers(data);
        console.log(data);
      } catch (err) {
        console.error("Artists fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // U
  const handleChangeRole = async (userId, newState) => {
    try {
      setLoadingRole((prev) => ({ ...prev, [userId]: true }));
      await updateUserRole(userId, newState, token);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, roles: [newState] } : u)),
      );
    } catch (err) {
      console.error("Update errore:", err);
    } finally {
      setLoadingRole((prev) => ({ ...prev, [userId]: false }));
    }
  };

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

  return (
    <>
      <h2>Utenti</h2>
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
            <th>Ruolo</th>
            <th>Email</th>
            <th>CreatedAt</th>
            <th>Telefono</th>
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
              {[...filtered]?.reverse().map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>
                    <div className="dropdown">
                      {loadingRole[u.id] ? (
                        <div
                          className="spinner-border flexContainerCenter"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <>
                          <button
                            className={`btn btn-light dropdown-toggle rounded-5 ${roleColors[u.roles[0]]}`}
                            data-bs-toggle="dropdown"
                          >
                            {u.roles[0]}
                          </button>

                          <ul className="dropdown-menu">
                            {appRoles.map((r) => (
                              <li key={r}>
                                <button
                                  className={`dropdown-item d-flex align-items-center ${roleColors[r]}`}
                                  onClick={() => handleChangeRole(u.id, r)}
                                >
                                  {r}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </td>
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
                  <td>
                    <button className="editButtonSm me-1">
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
            </>
          )}
        </tbody>
      </table>
    </>
  );
}

export default UsersManager;
