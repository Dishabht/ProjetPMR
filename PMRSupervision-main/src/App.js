import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Login from "./components/Menu/Login";
import SupervisionLayout from "./components/Supervision/SupervisionLayout";
import NetworkOverview from "./components/Supervision/NetworkOverview";
import Missions from "./components/Supervision/Missions";
import RiskConnections from "./components/Supervision/RiskConnections";
import Agents from "./components/Supervision/Agents";
import Alerts from "./components/Supervision/Alerts";
import Settings from "./components/Supervision/Settings";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<SupervisionLayout />}>
              <Route index element={<NetworkOverview />} />
              <Route path="missions" element={<Missions />} />
              <Route path="correspondances" element={<RiskConnections />} />
              <Route path="agents" element={<Agents />} />
              <Route path="alertes" element={<Alerts />} />
              <Route path="parametres" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;
