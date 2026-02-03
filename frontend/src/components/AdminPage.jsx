import { useState } from "react";
import UsersManager from "./AdminSections/UsersManager.jsx";
import ArtistsManager from "./AdminSections/ArtistsManager.jsx";
import GuitarsManager from "./AdminSections/GuitarsManager.jsx";
import OrdersManager from "./AdminSections/OrdersManager.jsx";
import ImageManager from "./AdminSections/ImageManager.jsx";

function AdminPage() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <>
      <div className="containerAfterNavbar text-center">
        <h2>Cosa vuoi gestire?</h2>
        <div className="">
          <button className="m-1" onClick={() => setActiveSection("users")}>
            Utenti
          </button>
          <button className="m-1" onClick={() => setActiveSection("artists")}>
            Artisti
          </button>
          <button className="m-1" onClick={() => setActiveSection("guitars")}>
            Chitarre
          </button>
          <button className="m-1" onClick={() => setActiveSection("orders")}>
            Ordini
          </button>
          <button className="m-1" onClick={() => setActiveSection("images")}>
            Immagini
          </button>
        </div>
      </div>
      <div className="container80 manageContaner flexContainerCenter">
        {activeSection === "users" && <UsersManager />}
        {activeSection === "artists" && <ArtistsManager />}
        {activeSection === "guitars" && <GuitarsManager />}
        {activeSection === "orders" && <OrdersManager />}
        {activeSection === "images" && <ImageManager />}
      </div>
    </>
  );
}

export default AdminPage;
