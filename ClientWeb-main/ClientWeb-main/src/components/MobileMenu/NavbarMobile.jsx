import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../images/logo/PMoveLogoAvecStyle2.png";
import Intersect from "../../images/Intersect.svg";

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Conteneur principal bleu */}
      <div className="font-raleway color-blues h-24 w-[58%] p-2 flex items-center justify-center bg-blue-600 relative">
        {!isOpen && (
          <div className="absolute -right-10 top-0">
            <img src={Intersect} alt="Intersect" className="h-24" />
          </div>
        )}

        <Navbar
          expand="lg"
          className="flex items-center justify-between w-full"
        >
          <Container fluid className="flex items-center justify-between">
            <Navbar.Brand href="/#">
              <img src={Logo} alt="Logo" className="h-[240px]" />
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>

      {/* Bouton du menu hamburger, placé en dehors du fond bleu */}
      <div className="absolute top-6 right-12">
        <div
          className="cursor-pointer text-3xl bg-white p-2 rounded-md border "
          onClick={toggleSidebar}
        >
          {isOpen ? "\u00D7" : "\u2630"}
        </div>
      </div>

      {/* La sidebar pour les liens de navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] color-blues text-white shadow-lg transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <img src={Logo} alt="Logo" className="h-[200px] ml-4" />
        {/* Liens de navigation */}
        <nav className=" flex flex-col items-start ml-2 space-y-12 p-4">
          {[
            "Home",
            "Itinerary",
            "Reservation",
            "Contact",
            "Help",
            "Login",
            "Sign up",
          ].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={toggleSidebar}
              className="font-raleway !font-semibold text-white !text-xl hover:text-gray-400 nav-link"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {/* Masque de fond pour fermer la sidebar en cliquant à l'extérieur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default NavbarMobile;
