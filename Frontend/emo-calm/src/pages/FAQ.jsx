import React, { useState } from "react";

const faqs = [
  {
    question: "What is Emotional Suppression?",
    answer: `Suppressing emotions means actively pushing away uncomfortable thoughts or feelings instead of processing them, often to maintain composure or avoid discomfort. It can involve conscious efforts like distraction or numbing, or unconscious avoidance, but the feelings remain “bottled up” and may resurface later with negative consequences, such as increased stress or emotional outbursts.`,
  },
  {
    question: "How does it impact our health?",
    answer: `While suppressing emotions may offer temporary relief, long-term suppression is linked to increased stress, anxiety, and depression, and can manifest physically through chronic tension, weakened immune function, and a higher risk for chronic health conditions like autoimmune diseases, heart disease, and digestive issues.`,
  },
  {
    question: "What are the root causes of chronic illness?",
    answer: `Chronic illnesses are complex and generally result from a combination of interacting genetic, behavioral, environmental stress, and social factors. While genetics may increase susceptibility, lifestyle choices and environmental exposures often act as the trigger for disease development.`,
  },
  {
    question: "How can I heal?",
    answer: `Healing from chronic illness or managing its symptoms to improve your quality of life involves a multifaceted approach.

1. **Professional Medical Guidance**
- Collaborate with healthcare providers.
- Follow treatment plans & track symptoms.
- Seek mental health support.

2. **Lifestyle & Behavior**
- Eat whole, nutrient-dense foods.
- Incorporate regular movement.
- Improve sleep hygiene.
- Manage stress & avoid harmful substances.

3. **Emotional Processing**
- Acknowledge feelings instead of suppressing them.
- Journal, express creatively, or speak to a therapist.
- Build a support system & practice self-compassion.

Healing is not linear — small, consistent changes add up.`,
  },
  {
    question: "How do I regulate my emotions?",
    answer: `Emotional regulation means identifying, understanding, and managing emotions instead of suppressing them.

**In-the-moment strategies**
- Deep breathing (box breathing)
- Grounding (5-4-3-2-1 technique)
- Name the emotion
- Step away briefly
- Self-soothing

**Long-term strategies**
- Identify triggers
- Challenge negative thoughts (reframe)
- Practice mindfulness
- Maintain sleep, nutrition, exercise
- Journaling feelings
- Build a support system
- Practice self-compassion

If emotions feel overwhelming, therapy (CBT or DBT) can help.`,
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center pt-24 pb-20 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-sm uppercase tracking-wide text-blue-500 font-medium">
          FAQ
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3">
          Got questions?
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Find answers to common questions about EmoCalm and how we can support
          your emotional wellness journey.
        </p>
      </div>

      {/* FAQ List */}
      <div className="w-full max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-sm rounded-2xl border border-blue-100 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
            >
              <span className="font-semibold text-gray-800 text-lg">
                {faq.question}
              </span>
              <span className="text-blue-500 text-xl font-bold">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-[500px] p-6 pt-0 opacity-100" : "max-h-0 opacity-0 p-0"
              }`}
            >
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
