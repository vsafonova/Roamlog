import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/Mobile/StartPage";

export default function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<StartPage/>} />
      </Routes>
    </Router>
  );
}
