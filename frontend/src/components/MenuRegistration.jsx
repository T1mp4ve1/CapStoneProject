import { useState } from "react";
import { registrationFunc } from "../services/userService.js";

const MenuRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const data = await registrationFunc(email, password, firstName);
      console.log("Registration OK:", data);
      setIsSuccess(true);
      setEmail("");
      setPassword("");
      setFirstName("");
    } catch (err) {
      console.log("Errore backend:", err);
      setIsSuccess(false);
      if (Array.isArray(err)) {
        setErrors(err.map((e) => e.description));
      } else if (err?.message) {
        setErrors([err.message]);
      } else {
        setErrors(["Errore sconosciuto"]);
      }
    }
  };

  return (
    <>
      <form className="loginMenu" onSubmit={handleRegistration}>
        <div className="mb-3">
          <div className="m-3 loginMenu">
            <div className="messageContainer my-2">
              {isSuccess === null && (
                <>
                  <p className="textTrasparent">hidden</p>
                </>
              )}
              {isSuccess === true && (
                <div className="text-success d-flex justify-content-center align-items-center">
                  <i className="bi bi-check-lg me-1"></i>
                  <p>Registrazione completata</p>
                </div>
              )}
              {isSuccess === false && (
                <>
                  {errors.map((e, i) => (
                    <div
                      key={i}
                      className="text-danger d-flex justify-content-center align-items-center"
                    >
                      <i className="bi bi-x fs-5"></i>
                      <p>{e}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
            <input
              type="email"
              className="form-control mb-1"
              id="EmailInput"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-1"
              id="PasswordInput"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-1"
              id="NameInput"
              placeholder="nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <button type="submit" className="w-100 loginBtn">
              Registrati
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default MenuRegistration;
