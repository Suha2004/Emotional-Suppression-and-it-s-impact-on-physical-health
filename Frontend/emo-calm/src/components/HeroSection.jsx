import React from "react";

const HeroSection = () => {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background with fade effect */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/bg.png')" }}
      ></div>

      {/* Gradient overlay for fade effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white"></div>

      {/* Empty space to just show background */}
      <div className="flex-1"></div>

      {/* Tagline below background */}
      <div className="relative z-10 bg-white text-gray-800 text-center py-12 px-4 w-full">
        <h1 className="text-4xl md:text-5xl font-bold">
          Regulate your emotions, own your life.
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
