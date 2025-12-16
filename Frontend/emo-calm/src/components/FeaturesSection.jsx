import React from "react";
import { FaLeaf, FaMoon, FaBandAid } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-blue-50 to-gray-100">
      {/* Decorative soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-100/30 to-transparent pointer-events-none"></div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16 relative z-10">
        We're here to help you feel better.
      </h2>

      {/* Feature Cards */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
        {/* Stress less */}
        <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
          <FaBandAid className="text-5xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Stress less.</h3>
          <p className="text-gray-600 mb-4">
            Get in-the-moment relief for stress and anxiety so you can get back to living.
          </p>
          <a
            href="#"
            className="text-blue-700 font-medium underline hover:text-blue-900 transition"
          >
            Learn More
          </a>
        </div>

        {/* Sleep more */}
        <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
          <FaMoon className="text-5xl text-purple-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Sleep more.</h3>
          <p className="text-gray-600 mb-4">
            Fall asleep (and stay asleep) naturally and peacefully.
          </p>
          <a
            href="#"
            className="text-blue-700 font-medium underline hover:text-blue-900 transition"
          >
            Learn More
          </a>
        </div>

        {/* Live mindfully */}
        <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-2xl p-8 text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
          <FaLeaf className="text-5xl text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Live mindfully.</h3>
          <p className="text-gray-600 mb-4">
            Navigate life's ups and downs with resilience, confidence and guided support.
          </p>
          <a
            href="#"
            className="text-blue-700 font-medium underline hover:text-blue-900 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
