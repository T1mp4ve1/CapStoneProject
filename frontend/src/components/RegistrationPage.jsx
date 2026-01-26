import { useState } from "react";
import { registrationFunc } from "../services/registrationService";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const data = await registrationFunc(email, password, firstName);
      console.log("Registration OK:", data);
      setEmail("");
      setPassword("");
      setFirstName("");
    } catch (err) {
      alert("Form sbagliata", err);
    }
  };

  return (
    <>
      <div className="containerAfterNavbar">
        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <form className="loginMenu" onSubmit={handleRegistration}>
              <div className="mb-3">
                <div className="m-3 loginMenu">
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
          </div>
        </div>
      </div>
    </>
  );
};
export default RegistrationPage;
