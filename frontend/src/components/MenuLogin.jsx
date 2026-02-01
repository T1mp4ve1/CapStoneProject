import { useContext, useState } from "react";
import { loginFunc } from "../services/authService";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MenuRegistration from "./MenuRegistration";

function MenuLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await loginFunc(email, password);
      login(data);
      setEmail("");
      setPassword("");
    } catch (err) {
      alert("Credenziali errate", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <form className="loginMenu" onSubmit={handleLogin}>
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
            <button type="submit" className="w-100 loginBtn">
              Entra
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
export default MenuLogin;
