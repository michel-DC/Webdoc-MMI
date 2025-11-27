import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingHero from "./components/LandingHero";
import Joueur from "./pages/joueur/Joueur";
import Garde from "./pages/garde/Garde";
import VIP from "./pages/vip/VIP";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingHero />} />
        <Route path="/joueur" element={<Joueur />} />
        <Route path="/garde" element={<Garde />} />
        <Route path="/vip" element={<VIP />} />
      </Routes>
    </Router>
  );
}

export default App;
