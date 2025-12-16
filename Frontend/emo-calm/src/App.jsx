import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import VideoSection from "./components/VideoSection";
import FAQSection from "./components/FAQSection";
import BlogSection from "./components/BlogSection";
import Chatbot from "./pages/Chatbot";
import FAQ from "./pages/FAQ"; // ✅ import full FAQ page
import FindTherapist from "./pages/FindTherapist";
import Assessment from "./pages/Assessment";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      {/* Navbar stays visible on all pages */}
      <Navbar />

      <div className="pt-20">
        {" "}
        {/* Adds padding so content isn’t hidden behind fixed Navbar */}
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeaturesSection />
                <BlogSection />
                <VideoSection />
                <FAQSection />
                <Assessment />
                <FindTherapist />
                <Login />
              </>
            }
          />

          {/* Chat Page */}
          <Route path="/chat" element={<Chatbot />} />

          {/* Full FAQ Page */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/find-therapist" element={<FindTherapist />} />

          {/* Assessment Page */}
          <Route path="/assessment" element={<Assessment />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
