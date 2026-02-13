import { useEffect, useState } from "react";
import {
  appRoles,
  getSingleUsers,
  roleColors,
  selfUpdateRole,
  updateUser,
} from "../../services/userService";
import { useAuth } from "../../context/UseAuth";

function ProfileSettings() {
  const [loadingRole, setLoadingRole] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const { token, setUserRoles } = useAuth();
  // console.log(userInfo);
  const handleChange = (field, value) => {
    setEditingField(field);
    setFieldValue(value);
  };

  const handleCancel = () => {
    setEditingField(null);
    setFieldValue("");
  };

  const handleSave = async () => {
    const body = { [editingField]: fieldValue };
    const res = await updateUser(body, token);
    setUserInfo(res.data);
    console.log("Update", [res.data]);
    setEditingField(null);
    setFieldValue("");
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      setLoadingRole(true);
      const res = await selfUpdateRole(userId, newRole, token);
      console.log(res);
      setUserRoles(newRole);
      localStorage.setItem("userRoles", JSON.stringify([newRole]));

      setUserInfo((prev) => ({
        ...prev,
        roles: [newRole],
      }));
    } catch (err) {
      console.error("Update errore:", err);
    } finally {
      setLoadingRole(false);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const res = await getSingleUsers(token);
      setUserInfo(res.data);
      console.log("useEffect:", res.data);
    };
    getInfo();
  }, []);

  return (
    <>
      <div className="containerAfterNavbar slowOpacity">
        {userInfo && (
          <div className="row flexContainerCenter">
            <div className="col-6 beigeContainer shadow-sm">
              <h2>Profile Settings</h2>
              <hr />
              <ul className="fs-5">
                {/* Email */}
                <li className="flexContainerBetween mb-2">
                  <p>Email:</p>
                  {editingField === "email" ? (
                    <div className="d-flex align-items-center">
                      <input
                        className="form-control form-control-sm me-2"
                        type="text"
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                      ></input>
                      <i
                        style={{ cursor: "pointer" }}
                        className="bi bi-check-circle text-success me-2"
                        onClick={handleSave}
                      ></i>
                      <i
                        style={{ cursor: "pointer" }}
                        className="bi bi-x-circle text-danger"
                        onClick={handleCancel}
                      ></i>
                    </div>
                  ) : (
                    <p>
                      <span className="fw-bold me-2">{userInfo.email}</span>
                      <i
                        className="bi bi-pen"
                        onClick={() => handleChange("email", userInfo.email)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </p>
                  )}
                </li>

                {/* Name */}
                <li className="flexContainerBetween mb-2">
                  <p>Nome:</p>
                  {editingField === "firstName" ? (
                    <div className="d-flex align-items-center">
                      <input
                        className="form-control form-control-sm me-2"
                        type="text"
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                      ></input>
                      <i
                        style={{ cursor: "pointer" }}
                        className="bi bi-check-circle text-success me-2"
                        onClick={handleSave}
                      ></i>
                      <i
                        style={{ cursor: "pointer" }}
                        className="bi bi-x-circle text-danger"
                        onClick={handleCancel}
                      ></i>
                    </div>
                  ) : (
                    <p>
                      <span className="fw-bold me-2">{userInfo.firstName}</span>
                      <i
                        className="bi bi-pen"
                        onClick={() =>
                          handleChange("firstName", userInfo.firstName)
                        }
                        style={{ cursor: "pointer" }}
                      ></i>
                    </p>
                  )}
                </li>

                {/* PhoneNumber */}
                <li className="flexContainerBetween mb-2">
                  <p>Telefono:</p>
                  {editingField === "phoneNumber" ? (
                    <div className="d-flex align-items-center">
                      <input
                        className="form-control form-control-sm me-2"
                        type="text"
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                      ></input>
                      <i
                        style={{ cursor: "pointer" }}
                        className="bi bi-check-circle text-success me-2"
                        onClick={handleSave}
                      ></i>
                      <i
                        style={{ cursor: "pointer" }}
                        className="bi bi-x-circle text-danger"
                        onClick={handleCancel}
                      ></i>
                    </div>
                  ) : (
                    <p>
                      <span className="fw-bold me-2">
                        {userInfo.phoneNumber}
                      </span>
                      <i
                        className="bi bi-pen"
                        onClick={() =>
                          handleChange("phoneNumber", userInfo.phoneNumber)
                        }
                        style={{ cursor: "pointer" }}
                      ></i>
                    </p>
                  )}
                </li>

                {/* Date */}
                <li className="flexContainerBetween mb-2">
                  <p>Creato:</p>
                  <p className="fw-bold">
                    {new Date(userInfo.createdAt).toLocaleString("it-IT", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </li>

                {/* Role */}
                <li className="flexContainerBetween mb-2">
                  <p>Ruolo:</p>

                  {loadingRole ? (
                    <>
                      <div
                        className="spinner-border flexContainerCenter"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="dropdown">
                        <button
                          className={`btn btn-light dropdown-toggle rounded-5 ${roleColors[userInfo.roles[0]]}`}
                          data-bs-toggle="dropdown"
                        >
                          {userInfo.roles[0]}
                        </button>

                        <ul className="dropdown-menu">
                          {appRoles.slice(2).map((r) => (
                            <li key={r}>
                              <button
                                className={`dropdown-item d-flex align-items-center ${roleColors[r]}`}
                                onClick={() => handleChangeRole(userInfo.id, r)}
                              >
                                {r}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileSettings;
