import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Link } from "react-router-dom";
import Bus from "../../images/Bus.svg";
import Avion from "../../images/Avion.svg";
import Taxi from "../../images/Taxi.svg";
import { motion } from "framer-motion";

mapboxgl.accessToken = "pk.eyJ1IjoiYnNkOTQiLCJhIjoiY201eHhjdTQ3MDdnZzJscjMyOXo2ZzhleCJ9.7zhgCDOGDcLyat5VdJaLPQ";

const Home = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const lng = 2.3522;
    const lat = 48.8566;
    const zoom = 10;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom,
    });

    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>You are here !</h3>"))
      .addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Section Hero Moderne */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary">
        {/* Gradient de fond animé (atténué) */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 pointer-events-none" />

        {/* Cercles de décoration flottants, plus discrets */}
        <motion.div
          className="absolute w-80 h-80 bg-primary/18 rounded-full blur-2xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ top: "-10%", right: "10%" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-accent/18 rounded-full blur-2xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ bottom: "-10%", left: "10%" }}
        />

        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-raleway lg:text-6xl text-4xl font-bold mb-5 gradient-text">
            Need us ?
          </h1>
          <p className="text-text-secondary text-lg mb-6 max-w-2xl mx-auto">
            PMove supports you in all your travels across France and beyond!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/reservation" className="btn-primary inline-block px-5 py-3 text-base">
              Start Your Journey
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Section Services */}
      <div className="relative py-16 lg:py-24 space-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-raleway text-3xl lg:text-5xl font-bold text-center gradient-text mb-3">
            Our Services
          </h2>
          <p className="text-center text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Choose your preferred transportation mode and book your assistance easily
          </p>
        </motion.div>

        <motion.div className="grid-auto" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {/* Card Taxi */}
          <motion.div className="card-modern group" variants={item} whileHover={{ y: -5 }}>
            <div className="flex justify-center mb-5">
              <motion.img
                src={Taxi}
                alt="Taxi Icon"
                className="w-16 h-16"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <h3 className="text-xl font-bold text-primary text-center mb-3">Taxi</h3>
            <p className="text-text-secondary text-center leading-relaxed max-w-[22rem] mx-auto text-base">
              Our taxi service is available 24/7 to meet all your transportation needs. Professional drivers ensure a comfortable and safe trip.
            </p>
          </motion.div>

          {/* Card Bus */}
          <motion.div className="card-modern group" variants={item} whileHover={{ y: -5 }}>
            <div className="flex justify-center mb-5">
              <motion.img
                src={Bus}
                alt="Bus Icon"
                className="w-16 h-16"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <h3 className="text-xl font-bold text-primary text-center mb-3">Public Transport</h3>
            <p className="text-text-secondary text-center leading-relaxed max-w-[22rem] mx-auto text-base">
              Modern, comfortable, and punctual buses and trains. Travel around the city effortlessly and reach your destination on time.
            </p>
          </motion.div>

          {/* Card Airplane */}
          <motion.div className="card-modern group" variants={item} whileHover={{ y: -5 }}>
            <div className="flex justify-center mb-5">
              <motion.img
                src={Avion}
                alt="Airplane Icon"
                className="w-16 h-16"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <h3 className="text-xl font-bold text-primary text-center mb-3">Airplane</h3>
            <p className="text-text-secondary text-center leading-relaxed max-w-[22rem] mx-auto text-base">
              Hassle-free journeys with regular flights and competitive rates. Enjoy a pleasant flying experience with quality services.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Section Pourquoi PMove */}
      <div className="relative py-16 lg:py-24 space-content bg-gradient-to-r from-bg-secondary to-bg-tertiary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-raleway text-3xl lg:text-5xl font-bold text-center gradient-text mb-6">
            Why Choose PMove?
          </h2>
          <p className="text-center text-text-secondary text-base md:text-lg leading-relaxed">
            Our solution is designed to make your travels simpler and your journeys more enjoyable. Whether you are traveling for work or leisure, we offer a range of services tailored to your needs. With our intuitive platform, you can easily plan, book, and track your trips across all transportation modes.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: "🛡️", title: "Safe & Secure", desc: "Your safety is our priority" },
            { icon: "⚡", title: "Fast Booking", desc: "Reserve in seconds" },
            { icon: "🌍", title: "Multimodal", desc: "All transport modes in one app" },
          ].map((feature, idx) => (
            <motion.div key={idx} className="card-modern text-center" variants={item}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
              <p className="text-text-secondary">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Carte interactive */}
      <div className="relative py-16 lg:py-24 space-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-raleway text-3xl lg:text-5xl font-bold text-center gradient-text mb-3">
            Find Your Route
          </h2>
          <p className="text-center text-text-secondary text-base md:text-lg mb-10">
            Explore available transportation options in your area
          </p>
        </motion.div>

        <motion.div
          className="w-full h-[280px] lg:h-[360px] rounded-2xl overflow-hidden shadow-md border border-border-light"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div ref={mapContainerRef} className="w-full h-full" />
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 lg:py-24 space-content bg-gradient-to-r from-primary/10 via-transparent to-accent/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-raleway text-3xl lg:text-4xl font-bold mb-5 gradient-text">
            Ready to Travel?
          </h2>
          <p className="text-text-secondary text-base md:text-lg mb-7 leading-relaxed">
            Join thousands of travelers who trust PMove for their multimodal journeys
          </p>
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link to="/reservation" className="btn-primary w-full md:w-auto px-5 py-3 text-base">
              Book Now
            </Link>
            <Link to="/help" className="btn-secondary w-full md:w-auto px-5 py-3 text-base">
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

export default Home;