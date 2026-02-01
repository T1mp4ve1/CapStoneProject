import { Dropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/NavbarGuitar.css";
import { useContext, useState } from "react";
import { loginFunc } from "../services/authService";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function NavbarGuitar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDropdown, setshowDropdown] = useState(false);
  const { cartCount } = useContext(CartContext);
  const { userRoles, isLogged, login, logout } = useContext(AuthContext);
  const isAdmin = userRoles.includes("Admin");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginFunc(email, password);
      login(data);
      setEmail("");
      setPassword("");
      setshowDropdown(false);
    } catch (err) {
      alert("Credenziali errate", err);
    }
  };

  const handleLogout = () => {
    logout();
    setshowDropdown(false);
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
          <Link to="/CartPage" className="position-relative">
            <i className="bi bi-bag-fill fs-3 ms-3"></i>
            {cartCount > 0 && (
              <span className="badge cartBadge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>

          <i className="bi bi-bell-fill fs-4"></i>

          <Dropdown
            align="end"
            show={showDropdown}
            onToggle={() => setshowDropdown(!showDropdown)}
          >
            <Dropdown.Toggle
              as="div"
              className="profileDropdownToggle"
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-person-fill fs-2 me-3"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="profileDropdownMenu border-0 slowOpacity shadow-lg">
              {isLogged ? (
                <>
                  <div className="m-3 d-flex flex-column">
                    <Link
                      to="/Customshop"
                      className="flexContainerLeft dropdownItem"
                    >
                      <i className="bi bi-floppy-fill"></i>
                      <p>Ordini</p>
                    </Link>
                    <Link
                      to="/Customshop"
                      className="flexContainerLeft dropdownItem"
                    >
                      <i className="bi bi-bandaid-fill"></i>
                      <p>Supporto</p>
                    </Link>
                    <Link
                      to="/Customshop"
                      className="flexContainerLeft dropdownItem"
                    >
                      <i className="bi bi-gear-fill"></i>
                      <p>Impostazioni</p>
                    </Link>
                  </div>
                </>
              ) : (
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
              )}

              <Dropdown.Divider />

              {isLogged ? (
                <>
                  <div className="m-3">
                    <button onClick={handleLogout} className="w-100 loginBtn">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <Link to="/RegistrationPage">Registrati</Link>
                  </div>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {isAdmin && (
          <>
            <Link to="/AdminPage" className="adminButton">
              <i className="bi bi-gear-fill text-danger fs-3"></i>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavbarGuitar;
