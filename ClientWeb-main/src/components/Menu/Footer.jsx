import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-bg-secondary via-bg-tertiary to-bg py-12 px-4 md:px-8 text-text-secondary">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-text text-2xl font-semibold">PMove</h3>
            <p className="leading-relaxed text-sm md:text-base">
              PMove propose des solutions d’accompagnement PMR pour garantir des correspondances fluides
              entre train, bus et avion.
            </p>
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} PMove. Tous droits réservés.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/reservation" className="btn-primary px-5 py-3 text-sm md:text-base">
              Réserver
            </a>
            <a href="/help" className="btn-secondary px-5 py-3 text-sm md:text-base">
              Support
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h4 className="text-text text-lg font-semibold">À propos</h4>
            <p className="leading-relaxed text-sm md:text-base">
              Multimodal, accessible et coordonné avec vos trajets train, bus et avion.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-text text-lg font-semibold">Ressources</h4>
            <div className="flex flex-col space-y-2 text-sm md:text-base">
              <a href="/about" className="hover:text-primary transition-smooth">
                Politique de confidentialité
              </a>
              <a href="/services" className="hover:text-primary transition-smooth">
                Conditions d’utilisation
              </a>
              <a href="/contact" className="hover:text-primary transition-smooth">
                Informations entreprise
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-text text-lg font-semibold">Contact</h4>
            <div className="space-y-2 text-sm md:text-base">
              {[
                { icon: "☎", value: "+33 1 48 31 89 63" },
                { icon: "✉", value: "pmove@gmail.com" },
                { icon: "☁", value: "@pmove2025" },
              ].map((item) => (
                <div key={item.value} className="flex items-center gap-3">
                  <span className="text-primary text-lg">{item.icon}</span>
                  <span className="px-3 py-2 rounded-xl bg-bg-secondary/80 text-text shadow-sm shadow-black/25">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;