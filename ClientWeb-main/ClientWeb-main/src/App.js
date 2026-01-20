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
import Help from "./components/Menu/Help";
import Contact from "./components/Menu/Contact";
import Prereservation from "./components/Menu/Prereservation";
import Profile from "./components/Menu/Profile";
import Reservation2 from "./components/Menu/Reservation2";

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
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/prereservation" element={<Prereservation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reservation2" element={<Reservation2 />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;
