import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/NavbarGuitar.css";

function NavbarGuitar() {
  return (
    <nav className="navbarCustom fixed-top shadow d-flex justify-content-around align-items-center">
      <div className="navbarSide d-flex justify-content-around align-items-center">
        <Link as={Link} to="/#">
          Prodotti
        </Link>
        <i className="bi bi-dot fs-4"></i>
        <Link as={Link} to="/#">
          Di noi
        </Link>
        <i className="bi bi-dot fs-4"></i>
        <Link as={Link} to="/#">
          Home
        </Link>
      </div>
      <Navbar.Brand className="logoFont" as={Link} to="/">
        Chitart
      </Navbar.Brand>
      <div className="navbarSide d-flex justify-content-around align-items-center">
        <Link as={Link} to="/#" className="ms-3">
          Prodotti
        </Link>
        <i className="bi bi-dot fs-4"></i>
        <Link as={Link} to="/#" className="ms-3">
          Di noi
        </Link>
        <i className="bi bi-dot fs-4"></i>
        <Link as={Link} to="/#" className="ms-3">
          Media
        </Link>
      </div>
    </nav>
  );
}

export default NavbarGuitar;
