import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/Mobile/StartPage";
import UserPage from "./pages/UserPage";
import Mapbox from "./components/mapBox/Mapbox";
import Passport from "./components/Passport";
import HomePage from "./pages/Desktop/HomePage";
import useMediaQuery from "./hooks/useMediaQuery";

export default function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Router>
      <Routes>
        <Route path="/" element={isMobile ? <StartPage /> : <HomePage />} />
        <Route path="/UserMap" element={<UserPage />} />
        <Route path="/Map" element={<Mapbox />} />
        <Route path="/Passport" element={<Passport />} />
      </Routes>
    </Router>
  );
}
