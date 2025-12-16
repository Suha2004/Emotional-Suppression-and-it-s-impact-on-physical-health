import React from "react";


const VideoSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 via-blue-50 to-white text-center flex flex-col items-center overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-100/40 via-transparent to-transparent pointer-events-none"></div>

      {/* Heading */}
      <div className="relative z-10 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          How emotional suppression affects us?
        </h2>
        <p className="text-lg md:text-xl text-blue-700 font-medium">
          Watch here.
        </p>
      </div>

      {/* YouTube Video Embed */}
      <div className="relative z-10 w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-white/60 backdrop-blur-sm">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/mtzJXAI3S60"
          title="EmoCalm video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default VideoSection;
