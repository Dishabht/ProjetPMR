import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import Logo from "../../images/logo/PMoveLogoAvecStyle.png";
import BackSignUp from "../../images/BackSingup.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    num: "",
    mail: "",
    handicap: "",
    civilite: "",
    birth: "",
    password: "",
    contact_mail: "",
    contact_num: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/userAdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Client ajouté avec succès");
      } else {
        alert(`Erreur: ${result.error}`);
      }
    } catch (error) {
      alert("Erreur lors de l'envoi des données");
    }
  };

  return (
    <div className="flex flex-col items-center mr-12 justify-center mt-28  ">
      <img
        src={Logo}
        alt="Logo"
        className="absolute z-10 mr-100 3xl:-top-40 xl:top-24 w-3/12 mt-2 hidden lg:block"
      />

      <form
        onSubmit={handleSubmit}
        className="xl:p-8 max-w-3xl w-full mt-28 xl:-ml-32 ml-12 "
      >
        <h2 className="relative xl:ml-0 ml-12 z-10 mb-16 font-raleway font-bold text-[60px] text-2xl font-bold ">
          S'inscrire
        </h2>

        {/* Civilité */}
        <div className="mb-4">
          <h4 className="relative font-raleway text-xl block font-raleway text-left font-bold mb-1 z-10">
            Civilité
          </h4>
          <div className="flex space-x-4 mt-8">
            <label className="flex relative z-10 items-center">
              <input
                type="radio"
                name="civilite"
                value="1"
                onChange={handleChange}
              />
              <span className="relative z-10 font-raleway ml-2">Mr</span>
            </label>
            <label className="flex relative z-10 items-center">
              <input
                type="radio"
                name="civilite"
                value="2"
                onChange={handleChange}
              />
              <span className="font-raleway ml-2">Mme</span>
            </label>
            <label className="flex relative z-10 items-center">
              <input
                type="radio"
                name="civilite"
                value="3"
                onChange={handleChange}
              />
              <span className="font-raleway ml-2">Autre</span>
            </label>
          </div>
        </div>

        {/* Nom et Prénom */}

        <div className="xl:grid xl:grid-cols-2 gap-40 xl:mb-4">
          <div className="flex flex-col">
            <h4 className="font-raleway text-xl block text-left font-bold mb-1 z-10">
              Nom
            </h4>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-[375px] p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black z-10 border border-black"
            />
          </div>
          <div className="flex flex-col">
            <h4 className="font-raleway text-xl block text-left font-bold mb-1 z-10">
              Prénom
            </h4>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
              className="w-[375px] p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black z-10 border border-black"
            />
          </div>
        </div>

        {/* Email et Téléphone */}
        <div className="xl:grid xl:grid-cols-2 gap-40 xl:mb-4">
          <div>
            <h4 className="font-raleway relative z-10 text-xl block font-raleway text-left font-bold mb-1 ">
              Adresse e-mail
            </h4>
            <input
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              required
              className="relative z-10 w-[375px] p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black border border-black"
            />
          </div>
          <div>
            <h4 className=" relative z-10 font-raleway text-xl block font-raleway text-left font-bold mb-1 ">
              Téléphone
            </h4>
            <input
              type="number"
              name="num"
              value={formData.num}
              onChange={handleChange}
              required
              className="relative z-10 w-[375px] p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black border border-black"
            />
          </div>
        </div>

        {/* Handicap et Date de naissance */}
        <div className="xl:grid xl:grid-cols-2 gap-40 xl:mb-4">
          <div>
            <h4 className="relative font-raleway text-xl block font-raleway text-left font-bold mb-1 z-10">
              Handicap
            </h4>
            <select
              name="handicap"
              value={formData.handicap}
              onChange={handleChange}
              required
              className="relative z-10 w-[375px] p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black border border-black "
            >
              <option value="">Sélectionner un handicap</option>
              <option value="1">BLND : Malvoyant ou non voyant</option>
              <option value="2">DEAF : Malentendant ou sourd</option>
              <option value="3">DPNA : Déficience Intellectuelle ou comportementale</option>
              <option value="4">WCHR :Besoin de fauteuil roulant pour les déplacements</option>
              <option value="5">WCHS : Besoin d'aide pour tout déplacement</option>
              <option value="6">WCHC : Assistance complète nécessaire</option>
              <option value="7">MAAS : Assistance spécifique</option>
            </select>
          </div>
          <div>
            <h4 className="relative z-10 font-raleway text-xl block font-raleway text-left font-bold mb-1">
              Date anniversaire
            </h4>
            <input
              type="date"
              name="birth"
              value={formData.birth}
              onChange={handleChange}
              required
              className="relative z-10 w-[375px] p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black border border-black"
            />
          </div>
        </div>

        {/* Contact Mail et Contact Num */}
        <div className="xl:grid xl:grid-cols-2 gap-40 xl:mb-4">
          <div>
            <h4 className="relative z-10 font-raleway text-xl block font-raleway text-left font-bold mb-1">
              Contact Mail
            </h4>
            <input
              type="email"
              name="contact_mail"
              value={formData.contact_mail}
              onChange={handleChange}
              required
              className="relative z-10 w-[375px] p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black border border-black"
            />
          </div>
          <div>
            <h4 className="relative z-10 font-raleway text-xl block font-raleway text-left font-bold mb-1">
              Contact Num
            </h4>
            <input
              type="number"
              name="contact_num"
              value={formData.contact_num}
              onChange={handleChange}
              required
              className="relative z-10 w-[375px] p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black border border-black"
            />
          </div>
        </div>

        <div className="xl:grid xl:grid-cols-2 gap-40 mb-4">
          <div>
            <h4 className="relative z-10 font-raleway text-xl block font-raleway text-left font-bold mb-1 ">
              Mot de passe
            </h4>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="relative z-10 w-[375px] p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black border border-black"
            />
          </div>
          <div>
            <h4 className="relative z-10 font-raleway text-xl block font-raleway text-left font-bold mb-1 ">
              Note
            </h4>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="relative z-10 w-[375px] p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black z-10 border border-black"
            ></textarea>
          </div>
        </div>

        {/* Conditions générales 
        <div className="flex leading-loose items-center font-raleway  mb-4">
          <input type="checkbox" className="mr-2" required />
          <span>
            J'ai lu et j'accepte les
            <a href="/#" className="ml-1 mr-1 text-blue-500 hover:underline">
              Conditions générales
            </a>
            et la
            <a href="/#" className="ml-1 mr-1 text-blue-500 hover:underline">
              Politique de confidentialité
            </a>
            .
          </span>
        </div>*/}

        {/* Bouton d'inscription */}
        <button
          type="submit"
          className="relative z-10 xl:w-[815px] w-[375px] font-raleway font-bold color-blues-3 text-white p-3 rounded-lg  transition"
        >
          S'inscrire
        </button>
      </form>
      <div className="absolute">
        <img
          src={BackSignUp}
          alt="fond"
          className="xl:max-w-[1150px] xl:ml-28 -ml-20 xl:-mt-[380px] -mt-[460px] max-w-[500px] opacity-100 z-0 "
        />
      </div>

      <div className="flex items-center xl:ml-0 ml-12 mt-4 lg:mt-24 mb-8">
        <div className="border-t border-gray-300 w-[155px] lg:w-[380px]"></div>
        <span className="px-4 text-gray-500">ou</span>
        <div className="border-t border-gray-300 w-[155px] lg:w-[380px]"></div>
      </div>

      <div className="flex flex-col xl:ml-0 ml-12 items-center ">
        <h2 className="text-lg xl:ml-0 font-raleway mb-6">
          Connectez-vous avec
        </h2>
        <button className="flex font-raleway font-bold items-center justify-center w-[375px] lg:w-[830px] border border-black rounded-lg py-2 mb-4 hover:bg-gray-100 ">
          <FaGoogle className="mr-2 text-xl text-red-600" />
          Continuer avec Google
        </button>

        <button className="flex font-raleway font-bold items-center justify-center  w-[375px] lg:w-[830px] border border-black rounded-lg py-2 mb-4 hover:bg-gray-100">
          <FaFacebook className="mr-2 text-xl text-blue-600" />
          Continuer avec Facebook
        </button>

        <button className="flex font-raleway font-bold items-center justify-center  w-[375px] lg:w-[830px] border border-black rounded-lg py-2 hover:bg-gray-100">
          <FaTwitter className="mr-2 text-xl text-blue-600" />
          Continuer avec Twitter
        </button>
        <div className="flex justify-center items-center">
          <p className="text-center font-raleway text-md mt-4">
            Vous avez déjà un compte ?
            <a href="/signup" className="ml-1 text-blue hover:underline">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
