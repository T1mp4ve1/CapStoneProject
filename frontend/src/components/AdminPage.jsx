import { useState } from "react";
import UsersManager from "./AdminSections/UsersManager.jsx";
import ArtistsManager from "./AdminSections/ArtistsManager.jsx";
import GuitarsManager from "./AdminSections/GuitarsManager.jsx";
import OrdersManager from "./AdminSections/OrdersManager.jsx";
import TicketsManager from "./AdminSections/TicketsManager.jsx";

function AdminPage() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <>
      <div className="containerAfterNavbar text-center">
        <h2>Cosa vuoi gestire?</h2>
        <div className="">
          <button
            className={`me-1 ${activeSection === "users" ? "beatyButton3Active" : "beatyButton3"}`}
            onClick={() => setActiveSection("users")}
          >
            Utenti
          </button>
          <button
            className={`me-1 ${activeSection === "artists" ? "beatyButton3Active" : "beatyButton3"}`}
            onClick={() => setActiveSection("artists")}
          >
            Artisti
          </button>
          <button
            className={`me-1 ${activeSection === "guitars" ? "beatyButton3Active" : "beatyButton3"}`}
            onClick={() => setActiveSection("guitars")}
          >
            Chitarre
          </button>
          <button
            className={`me-1 ${activeSection === "orders" ? "beatyButton3Active" : "beatyButton3"}`}
            onClick={() => setActiveSection("orders")}
          >
            Ordini
          </button>
          <button
            className={`me-1 ${activeSection === "tickets" ? "beatyButton3Active" : "beatyButton3"}`}
            onClick={() => setActiveSection("tickets")}
          >
            Tickets
          </button>
        </div>
      </div>
      <div className="componentContainer">
        {activeSection === "users" && <UsersManager />}
        {activeSection === "artists" && <ArtistsManager />}
        {activeSection === "guitars" && <GuitarsManager />}
        {activeSection === "orders" && <OrdersManager />}
        {activeSection === "tickets" && <TicketsManager />}
      </div>
    </>
  );
}

export default AdminPage;
