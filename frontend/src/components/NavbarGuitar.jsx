import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/NavbarGuitar.css";

function NavbarGuitar() {
  return (
    <nav className="navbarCustom fixed-top shadow d-flex justify-content-around align-items-center">
      <div className="navbarSide d-flex justify-content-around align-items-center">
        <Link as={Link} to="/Guitars">
          Chitarre
        </Link>
        <i className="bi bi-dot fs-4"></i>
        <Link as={Link} to="/Accessories">
          Accessori
        </Link>
        <i className="bi bi-dot fs-4"></i>
        <Link as={Link} to="/Customshop">
          Custom shop
        </Link>
      </div>
      <Navbar.Brand className="logoFont" as={Link} to="/">
        Chitart
      </Navbar.Brand>
      <div className="navbarSide d-flex justify-content-around align-items-center">
        <Link as={Link} to="/OpinionPage" className="ms-3">
          Opinioni
        </Link>
        <i className="bi bi-dot fs-4"></i>
        <Link as={Link} to="/SupportPage" className="ms-3">
          Supporto
        </Link>
        <i className="bi bi-dot fs-4"></i>
        <div className="d-flex justify-content-around align-items-center iconsProfileContainer shadow-sm">
          <i className="bi bi-bag-fill fs-3"></i>
          <i className="bi bi-bell-fill fs-4"></i>
          <i className="bi bi-person-fill fs-2"></i>
        </div>
      </div>
    </nav>
  );
}

export default NavbarGuitar;
