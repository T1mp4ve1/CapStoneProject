import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/NavbarGuitar.css";

function NavbarGuitar() {
  return (
    <nav className="navbarCustom fixed-top shadow d-flex justify-content-around align-items-center">
      <div className="navbarSide d-flex justify-content-around align-items-center">
        <Link as={Link} to="/products">Prodotti</Link>
        <i className="bi bi-dot"></i>
        <Link as={Link} to="/products">Di noi</Link>
        <i className="bi bi-dot"></i>
        <Link as={Link} to="/products">Media</Link>
      </div>
      <Navbar.Brand className="logoFont" as={Link} to="/">
        Chitart
      </Navbar.Brand>
      <div className="navbarSide d-flex justify-content-around align-items-center">
        <Link as={Link} to="/products" className="ms-3">Prodotti</Link>
        <i className="bi bi-dot"></i>
        <Link as={Link} to="/products" className="ms-3">Di noi</Link>
        <i className="bi bi-dot"></i>
        <Link as={Link} to="/products" className="ms-3">Media</Link>
      </div>
    </nav>
  );
}

export default NavbarGuitar;
