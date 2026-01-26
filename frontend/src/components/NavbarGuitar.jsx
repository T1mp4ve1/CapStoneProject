import { Dropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/NavbarGuitar.css";
import { useState } from "react";
import { loginFunc } from "../services/authService";

function NavbarGuitar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginFunc(email, password);
      console.log("Login OK:", data);
      setEmail("");
      setPassword("");
    } catch (err) {
      alert("Credenziali errate", err);
    }
  };

  return (
    <nav className="navbarCustom fixed-top shadow d-flex justify-content-around align-items-center">
      <div className="navbarSide d-flex justify-content-around align-items-center">
        <Link to="/Guitars" className="navbarLink">
          Chitarre
        </Link>
        <i className="bi bi-dot fs-4"></i>
        <Link to="/Accessories" className="navbarLink">
          Accessori
        </Link>
        <i className="bi bi-dot fs-4"></i>
        <Link to="/Customshop" className="navbarLink">
          Custom shop
        </Link>
      </div>
      <Navbar.Brand className="logoFont" as={Link} to="/">
        Chitart
      </Navbar.Brand>
      <div className="navbarSide d-flex justify-content-around align-items-center">
        <Link to="/OpinionPage" className="navbarLink">
          Opinioni
        </Link>
        <i className="bi bi-dot fs-4"></i>
        <Link to="/SupportPage" className="navbarLink">
          Supporto
        </Link>
        <i className="bi bi-dot fs-4"></i>
        <div className="d-flex justify-content-around align-items-center iconsProfileContainer shadow-sm">
          <i className="bi bi-bag-fill fs-3"></i>
          <i className="bi bi-bell-fill fs-4"></i>
          <Dropdown align="end">
            <Dropdown.Toggle
              as="div"
              className="profileIconHitbox profileDropdownToggle"
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-person-fill fs-2"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="profileDropdownMenu border-0 slowOpacity shadow-lg">
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
              <Dropdown.Divider />
              <div className="text-center">
                <Link to="/Logout">Registrati</Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}

export default NavbarGuitar;
