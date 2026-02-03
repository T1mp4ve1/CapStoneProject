import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { NotificationsProvider } from "./context/NotificationsContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <NotificationsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </NotificationsProvider>
  </AuthProvider>,
);
