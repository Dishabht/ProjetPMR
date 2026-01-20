import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#5489CE] text-white py-6 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Section gauche : Logo et nom */}
        <div className="mb-4 md:mb-0">
          <a href="/" className="text-2xl font-bold text-white">
            À propos de nous                                           
          </a>
          <p className="max-w-[450px] leading-relaxed">
            PMove propose des solutions adaptées pour les PMR telles que des services d'accompagnement pour faciliter leurs déplacements.
          </p>
          <p className="mt-2 text-sm">
            <br></br>© {new Date().getFullYear()} PMove. Tous droits réservés.
          </p>
        </div>

        {/* Section centrale : Navigation */}
        <div className="flex flex-col md:flex-row md:space-x-6 w-full md:w-auto justify-self-end mt-4 md:mt-0 text-center md:text-left">
          <a href="/about" className="hover:text-gray-400">Politique confidentialité</a>
          <a href="/services" className="hover:text-gray-400">Condition et utillisation</a>
          <a href="/contact" className="hover:text-gray-400">Information entreprise</a>
        </div>

        {/* Section droite : Contact */}
        <div className="flex flex-col space-y-4 items-center">
          <a href="/" className="text-2xl font-bold text-white mb-4">
            Contactez-nous !
          </a>
          
          {/* Phone and Email aligned horizontally */}
          <div className="flex flex-row space-x-4 items-center">
            <div className="flex items-center space-x-2">
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.6l2.2-2.2a1.003 1.003 0 0 1 1.05-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.75 21 3 13.25 3 4.5c0-.55.45-1 1-1H6c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57a1.003 1.003 0 0 1-.25 1.05l-2.7 2.67z" />
              </svg>
              <span className="bg-[#8DDB8F] text-[#000000] px-2 py-1 rounded-md font-semibold">
                +33 1 48 31 89 63
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 12.713l-11.306-7.84v-1.473h22.611v1.473z" />
                <path d="M22.306 4.26h-20.611l10.306 7.152z" />
                <path d="M.694 18.52v-9.498l10.306 7.083 10.306-7.083v9.498h-20.611z" />
              </svg>
              <span className="bg-white text-[#000000] px-2 py-1 rounded-md font-semibold">
                pmove@gmail.com
              </span>
            </div>
          </div>

          {/* Twitter handle centered below */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2">
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.93 4.93 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.374 4.482A13.949 13.949 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.574 4.903 4.903 0 0 1-2.229-.616v.062a4.919 4.919 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.224.084 4.923 4.923 0 0 0 4.598 3.417 9.868 9.868 0 0 1-6.102 2.104c-.396 0-.79-.023-1.174-.067A13.953 13.953 0 0 0 7.548 21c9.054 0 14.01-7.504 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z" />
              </svg>
              <span className="bg-[#000000] text-white px-2 py-1 rounded-md font-semibold">
                @pmove2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


