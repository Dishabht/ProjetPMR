import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/send-email",
        { email, name, subject, message },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (res.data.code === 200) {
        toast.success("Votre message a été envoyé avec succès !");
        setSubmitted(true);
      } else {
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (err) {
      toast.error("Erreur réseau lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary">
        <div className="max-w-lg p-8 text-center bg-card border border-border rounded-2xl shadow-xl">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="mb-4 text-4xl font-extrabold text-text">
            Merci pour votre message !
          </h2>
          <p className="mb-8 text-lg text-text-secondary">
            Nous vous répondrons dans les plus brefs délais.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 text-white bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
          >
            Retour à l'accueil
          </button>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary px-4 py-12">
      <div className="w-full max-w-2xl p-8 bg-card border border-border rounded-2xl shadow-xl">
        <h1 className="mb-2 text-4xl font-bold text-text">
          Nous Contacter
        </h1>
        <p className="mb-8 text-text-secondary">
          Une question ? N'hésitez pas à nous écrire.
        </p>
        
        <form onSubmit={submit} className="space-y-6">
          {/* Name and Email Fields */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block mb-2 font-semibold text-text"
              >
                Nom
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                placeholder="Votre nom"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-2 font-semibold text-text"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 font-semibold text-text"
            >
              Sujet
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
              placeholder="Objet de votre message"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block mb-2 font-semibold text-text"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all resize-none"
              placeholder="Écrivez votre message ici..."
              rows="6"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center justify-center px-8 py-3 text-white bg-gradient-to-r from-primary to-accent rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold min-w-[180px]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="w-5 h-5 mr-2 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 100 8H4z"
                    ></path>
                  </svg>
                  Envoi...
                </>
              ) : (
                "Envoyer le message"
              )}
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
};

export default Contact;