import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarGuitar from "./components/NavbarGuitar";
import HomePageGuitar from "./components/HomePageGuitar";
import GuitarsPage from "./components/GuitarsPage";
import CustomshopPage from "./components/CustomshopPage";
import OpinionPage from "./components/OpinionPage";
import SupportPage from "./components/ProfilePages/SupportPage";
import AdminPage from "./components/AdminPage";
import RegistrationPage from "./components/RegistrationPage";
import DetailsPage from "./components/DetailsPage";
import CartPage from "./components/CartPage";
import ProfileSettings from "./components/ProfilePages/ProfileSettings";
import UserOrders from "./components/ProfilePages/UserOrders";
import FooterGuitar from "./components/FooterGuitar";

function App() {
  return (
    <div className="appContainer">
      <BrowserRouter>
        <NavbarGuitar />
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<HomePageGuitar />} />
            <Route path="/Guitars" element={<GuitarsPage />} />
            <Route path="/Product/:id" element={<DetailsPage />} />
            <Route path="/Customshop" element={<CustomshopPage />} />
            <Route path="/OpinionPage" element={<OpinionPage />} />
            <Route path="/SupportPage" element={<SupportPage />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/RegistrationPage" element={<RegistrationPage />} />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/ProfileSettings" element={<ProfileSettings />} />
            <Route path="/UserOrders" element={<UserOrders />} />
          </Routes>
        </div>
        <FooterGuitar />
      </BrowserRouter>
    </div>
  );
}

export default App;
