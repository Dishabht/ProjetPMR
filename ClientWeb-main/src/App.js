import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Menu/Home";
import Itinerary from "./components/Menu/Itinerary";
import Login from "./components/Menu/Login";
import Signup from "./components/Menu/Signup";
import Reservation from "./components/Menu/Reservation";
import Footer from "./components/Menu/Footer";
import Navbar from "./components/Menu/Navbars";
import { UserProvider } from "./UserContext";
import ReservationTrajet from "./components/Menu/ReservationTrajet";
import MobileNavbars from "./components/MobileMenu/NavbarMobile";
import Accompagnateur from "./components/Menu/Accompagnateur";
import Logout from "./components/Menu/Logout";
import Support from "./components/Menu/Support";
import Prereservation from "./components/Menu/Prereservation";
import Profile from "./components/Menu/Profile";
import Reservation2 from "./components/Menu/Reservation2";
import Wallet from "./components/Menu/Wallet";
import Dashboard from "./components/Admin/Dashboard";
import ImportPlanning from "./components/Admin/ImportPlanning";
import MissionMatching from "./components/Admin/MissionMatching";
import AgentBlocking from "./components/Admin/AgentBlocking";
import SupervisionRealtime from "./components/Admin/SupervisionRealtime";
import ZoneManagement from "./components/Admin/ZoneManagement";
import AgentProfiles from "./components/Admin/AgentProfiles";
import Coordination from "./components/Admin/Coordination";
import SecurityGovernance from "./components/Admin/SecurityGovernance";
import AIAssistant from "./components/AIAssistant";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <div className="hidden lg:block">
            <Navbar />
          </div>
          <div className="block lg:hidden">
            <MobileNavbars />
          </div>

          <Routes>
            <Route path="/logout" element={<Logout />} />
            <Route path="/reservationnul" element={<ReservationTrajet />} />
            <Route path="/acc" element={<Accompagnateur />} />
            <Route path="/" element={<Home />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/support" element={<Support />} />
            <Route path="/prereservation" element={<Prereservation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reservation2" element={<Reservation2 />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/admin" element={<Dashboard />} />     
            <Route path="/admin/import-planning" element={<ImportPlanning />} />
            <Route path="/admin/mission-matching" element={<MissionMatching />} />
            <Route path="/admin/agent-blocking" element={<AgentBlocking />} />
            <Route path="/admin/supervision" element={<SupervisionRealtime />} />
            <Route path="/admin/zones" element={<ZoneManagement />} />
            <Route path="/admin/agents" element={<AgentProfiles />} />
            <Route path="/admin/coordination" element={<Coordination />} />
            <Route path="/admin/security" element={<SecurityGovernance />} />
          </Routes>
          <Footer />
          <AIAssistant />
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;
