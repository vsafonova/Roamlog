import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/Mobile/StartPage";
import UserPage from "./pages/UserPage";
import Mapbox from "./components/mapBox/Mapbox";
import Passport from "./components/Passport";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/UserMap" element={<UserPage />} />
        <Route path="/Map" element={<Mapbox />} />
        <Route path="/Passport" element={<Passport />} />
      </Routes>
    </Router>
  );
}
