import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarGuitar from "./components/NavbarGuitar";
import HomePageGuitar from "./components/HomePageGuitar";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarGuitar />
        <Routes>
          <Route path="/" element={<HomePageGuitar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
