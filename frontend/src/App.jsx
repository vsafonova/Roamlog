import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/Mobile/StartPage";
import Mapbox from "./components/Mapbox";

export default function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<StartPage/>} />
        <Route path="/UserMap" element={<Mapbox/>} />
      </Routes>
    </Router>
  );
}
