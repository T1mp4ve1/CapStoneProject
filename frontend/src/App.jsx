import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarGuitar from "./components/NavbarGuitar";
import HomePageGuitar from "./components/HomePageGuitar";
import GuitarsPage from "./components/GuitarsPage";
import AccessoriesPage from "./components/AccessoriesPage";
import CustomshopPage from "./components/CustomshopPage";
import OpinionPage from "./components/OpinionPage";
import SupportPage from "./components/SupportPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarGuitar />
        <Routes>
          <Route path="/" element={<HomePageGuitar />} />
          <Route path="/Guitars" element={<GuitarsPage />} />
          <Route path="/Accessories" element={<AccessoriesPage />} />
          <Route path="/Customshop" element={<CustomshopPage />} />
          <Route path="/OpinionPage" element={<OpinionPage />} />
          <Route path="/SupportPage" element={<SupportPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
