import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../images/logo/PMoveLogoSANSTITRE.png";
import Intersect from "../../images/Intersect.svg";
import { UserContext } from "../../UserContext";
import { logout } from "../../api/api";

const Navbars = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // Utilisation du contexte

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null); // Réinitialisation du contexte utilisateur
      alert("Déconnexion réussie !");
      navigate("/login"); // Redirection vers la page de connexion
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la déconnexion.");
    }
  };

  return (
    <div className="relative">
      <div className="flex">
        <div className="font-raleway text-sm font-bold color-blues-2 ml-[76%] mt-2">
          {user ? (
            <div className="flex items-center">
              <Link
                to="/profile"
                className="mr-4 hover:underline color-blues-2 font-bold"
              >
                Bienvenue, {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline text-red-600 font-bold"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:underline mr-2">
                Login
              </Link>
              <span className="right-0">|</span>
              <Link to="/signup" className="right-0 hover:underline ml-2">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Navbar principale */}
      <div className="mt-2 font-raleway color-blues h-24 w-[78%] p-2 relative flex items-center justify-center ">
        <div className="absolute -right-12">
          <img src={Intersect} alt="Intersect" className="mt-22 h-24" />
        </div>

        <Navbar
          expand="lg"
          className="text-white w-11/12 flex items-center justify-between"
        >
          <Container fluid className="flex items-center justify-between">
            <Navbar.Brand href="/#">
              <img src={Logo} alt="Logo" className="ml-16 w-1/2 mt-2" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse
              id="navbarScroll"
              className="flex items-center justify-between w-full"
            >
              <Nav className=" flex items-center lg:space-x-12 xl:space-x-20 3xl:space-x-36 ">
                <Link
                  to="/"
                  className="font-raleway !font-semibold text-white !text-xl hover:text-gray-400 nav-link"
                >
                  Home
                </Link>
                <Link
                  to="/itinerary"
                  className="font-raleway !font-semibold text-white !text-xl hover:text-gray-400 nav-link"
                >
                  Itinerary
                </Link>
                <Link
                  to="/prereservation"
                  className="font-raleway !font-semibold text-white !text-xl hover:text-gray-400 nav-link"
                >
                  Reservation
                </Link>
                <Link
                  to="/contact"
                  className="font-raleway !font-semibold text-white !text-xl hover:text-gray-400 nav-link"
                >
                  Contact
                </Link>
                <Link
                  to="/help"
                  className="font-raleway !font-semibold text-white !text-xl hover:text-gray-400 nav-link"
                >
                  Help
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Navbars;
