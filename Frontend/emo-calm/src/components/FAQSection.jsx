import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is EmoCalm?",
    answer:
      "EmoCalm is a holistic wellness platform that helps you understand, regulate, and heal your emotions. We offer guided tools like meditation, breathwork, and emotional awareness exercises to help you live with balance and mindfulness.",
  },
  {
    question: "How does the Emotional Assessment work?",
    answer:
      "Our Emotional Assessment analyzes your responses to identify patterns of emotional suppression and stress triggers. Based on your results, it suggests personalized healing practices such as journaling, meditation, or therapist recommendations.",
  },
  {
    question: "Is EmoCalm free to use?",
    answer:
      "Yes! EmoCalm offers free assessments and basic emotional wellness tools. You can also unlock premium guided sessions, therapist connections, and advanced analytics through our subscription plans.",
  },
  {
    question: "Can I talk to an expert or therapist through EmoCalm?",
    answer:
      "Absolutely. EmoCalm connects you with certified emotional wellness coaches and therapists who can guide you through personal challenges using evidence-based practices.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-blue-50 to-gray-100 text-gray-800">
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-100/30 to-transparent pointer-events-none"></div>

      {/* Heading */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-blue-700 font-medium">
          Everything you need to know about EmoCalm.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 py-6 transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left focus:outline-none"
            >
              <span className="text-lg md:text-xl font-semibold">
                {faq.question}
              </span>
              {openIndex === index ? (
                <FaChevronUp className="text-blue-700 transition-transform duration-300" />
              ) : (
                <FaChevronDown className="text-gray-500 transition-transform duration-300" />
              )}
            </button>

            <div
              className={`mt-3 text-gray-600 leading-relaxed transition-all duration-500 ${
                openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
