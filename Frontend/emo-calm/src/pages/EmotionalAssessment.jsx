import React, { useState } from "react";
import { ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import { saveAssessment, isAuthenticated } from "../utils/authUtils";

const EmotionalAssessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const sections = [
    {
      title: "Physical & Emotional Symptoms",
      questions: [
        {
          id: 1,
          text: "How often do you experience unexplained body pain (e.g., headaches, back pain, muscle tension)?",
          options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 2,
          text: "Do you suffer from frequent digestive issues (e.g., bloating, IBS, acidity) without a clear medical reason?",
          options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 3,
          text: 'How often do you feel a "lump in the throat," tight chest, or shortness of breath during emotional moments?',
          options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 4,
          text: "Do you notice recurring fatigue or low energy levels despite enough rest?",
          options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 5,
          text: "How often do you experience sudden mood swings without clear triggers?",
          options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 6,
          text: "Do you notice that your physical symptoms worsen during stressful or emotional periods?",
          options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 7,
          text: "How frequently do you get sick (e.g., colds, infections) when under pressure?",
          options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 8,
          text: 'Do you ever feel emotionally "numb" or disconnected from your own feelings?',
          options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
          scores: [0, 1, 2, 3, 4],
        },
      ],
    },
    {
      title: "Emotional Expression & Coping Strategies",
      questions: [
        {
          id: 9,
          text: "When you're upset, how likely are you to talk about it with someone you trust?",
          options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 10,
          text: "How often do you hide your feelings to avoid burdening others?",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 11,
          text: "When you feel hurt, do you tend to distract yourself instead of processing the emotion?",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 12,
          text: "How easy is it for you to cry or express sadness when you need to?",
          options: [
            "Very easy",
            "Easy",
            "Neutral",
            "Difficult",
            "Very difficult",
          ],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 13,
          text: "Do you often tell yourself \"I'm fine\" even when you're not?",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 14,
          text: "How often do you express anger in healthy ways (e.g., communicating assertively)?",
          options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 15,
          text: "Do you engage in activities (e.g., journaling, meditation, therapy) to process emotions?",
          options: ["Regularly", "Often", "Sometimes", "Rarely", "Never"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 16,
          text: "Do you avoid conflict even when something really bothers you?",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
          scores: [0, 1, 2, 3, 4],
        },
      ],
    },
    {
      title: "Stress & Emotional Awareness",
      questions: [
        {
          id: 17,
          text: "How often do you feel stressed or overwhelmed?",
          options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 18,
          text: "How aware are you of your emotions in real time?",
          options: [
            "Very aware",
            "Aware",
            "Neutral",
            "Slightly unaware",
            "Not aware at all",
          ],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 19,
          text: "How often do you reflect on what you're feeling and why?",
          options: [
            "Daily",
            "A few times a week",
            "Occasionally",
            "Rarely",
            "Never",
          ],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 20,
          text: "Do you feel safe expressing your emotions in front of others?",
          options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 21,
          text: 'How often do you suppress your emotions to "stay strong" or keep the peace?',
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 22,
          text: "How quickly do you notice when your body reacts to emotional stress (e.g., fast heartbeat, sweating)?",
          options: ["Immediately", "Quickly", "Sometimes", "Rarely", "Never"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 23,
          text: "How often do you practice relaxation or stress-management techniques (e.g., breathing, yoga)?",
          options: ["Daily", "Often", "Occasionally", "Rarely", "Never"],
          scores: [0, 1, 2, 3, 4],
        },
      ],
    },
    {
      title: "Past Patterns & Beliefs",
      questions: [
        {
          id: 24,
          text: "When growing up, were you encouraged to express your emotions freely?",
          options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 25,
          text: "Do you believe showing emotions is a sign of weakness?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
          ],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 26,
          text: "Have you ever felt judged or rejected for expressing your true feelings?",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 27,
          text: "How comfortable are you with vulnerability in close relationships?",
          options: [
            "Very comfortable",
            "Comfortable",
            "Neutral",
            "Uncomfortable",
            "Very uncomfortable",
          ],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 28,
          text: 'Do you often bottle things up until you "explode" or break down?',
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 29,
          text: 'Do you tend to minimize your own pain by comparing it to others ("Others have it worse")?',
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
          scores: [0, 1, 2, 3, 4],
        },
        {
          id: 30,
          text: "Do you believe you have unresolved emotions from past experiences?",
          options: [
            "Not at all",
            "A little",
            "Somewhat",
            "Quite a lot",
            "Very much",
          ],
          scores: [0, 1, 2, 3, 4],
        },
      ],
    },
  ];

  const currentSectionData = sections[currentSection];
  const totalQuestions = sections.reduce(
    (sum, section) => sum + section.questions.length,
    0
  );
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const handleAnswer = (questionId, optionIndex, score) => {
    setAnswers({ ...answers, [questionId]: { option: optionIndex, score } });
  };

  const nextQuestion = () => {
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    }
  };

  const calculateResults = async () => {
    const totalScore = Object.values(answers).reduce(
      (sum, ans) => sum + ans.score,
      0
    );
    const maxScore = 100;
    const percentage = (totalScore / maxScore) * 100;

    let severity, interpretation, recommendations;

    if (percentage <= 25) {
      severity = "Minimal";
      interpretation =
        "You show minimal signs of emotional suppression. You generally express your emotions in healthy ways and have good emotional awareness.";
      recommendations = [
        "Continue your healthy emotional practices",
        "Share your strategies with others",
        "Stay mindful of any changes in emotional patterns",
      ];
    } else if (percentage <= 50) {
      severity = "Mild";
      interpretation =
        "You experience mild emotional suppression. While you can express emotions sometimes, there are areas where you hold back or avoid processing feelings.";
      recommendations = [
        "Practice identifying emotions as they arise",
        "Try journaling to process feelings",
        "Consider talking to trusted friends about emotions",
        "Explore mindfulness or meditation",
      ];
    } else if (percentage <= 75) {
      severity = "Moderate";
      interpretation =
        "You show moderate levels of emotional suppression. You frequently hold back emotions, which may be affecting your physical and mental wellbeing.";
      recommendations = [
        "Consider working with a therapist or counselor",
        "Practice emotional expression in safe environments",
        "Learn and use healthy coping mechanisms",
        "Address physical symptoms with healthcare providers",
        "Join support groups or workshops",
      ];
    } else {
      severity = "Severe";
      interpretation =
        "You experience significant emotional suppression. This pattern is likely impacting your health, relationships, and overall quality of life.";
      recommendations = [
        "Seek professional help from a therapist or psychologist",
        "Consider trauma-informed therapy approaches",
        "Work on building a support network",
        "Address any physical health concerns with doctors",
        "Learn emotion regulation techniques",
        "Be patient and compassionate with yourself",
      ];
    }

    // Save to assessment backend (CSV)
    try {
      console.log("📤 Sending data to assessment backend...");
      const response = await fetch("http://localhost:8000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: answers,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const savedResult = await response.json();
        console.log("✅ Assessment saved to CSV!", savedResult);
      } else {
        console.error("❌ Failed to save. Status:", response.status);
      }
    } catch (error) {
      console.error("❌ Error saving to CSV:", error);
    }

    // Save to user history (if logged in)
    if (isAuthenticated()) {
      try {
        await saveAssessment({
          answers: answers,
          total_score: totalScore,
          severity: severity,
          interpretation: interpretation,
          recommendations: recommendations,
        });
        console.log("✅ Saved to user history!");
      } catch (error) {
        console.error("❌ Failed to save to user history:", error);
      }
    }

    // Set results and show results screen
    setResults({
      totalScore,
      severity,
      interpretation,
      recommendations,
    });
    setShowResults(true);
  };

  const currentQ = currentSectionData.questions[currentQuestion];
  const isAnswered = answers[currentQ.id] !== undefined;
  const globalQuestionNumber =
    sections
      .slice(0, currentSection)
      .reduce((sum, s) => sum + s.questions.length, 0) +
    currentQuestion +
    1;

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-3xl mx-auto pt-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-purple-900 mb-2">
                Assessment Complete
              </h1>
              <p className="text-gray-600">Here are your results</p>
            </div>

            <div className="bg-linear-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
              <div className="text-center">
                <p className="text-gray-700 mb-2">Your Score</p>
                <p className="text-5xl font-bold text-purple-900 mb-2">
                  {results.totalScore}/100
                </p>
                <p className="text-xl font-semibold text-purple-700">
                  {results.severity} Suppression
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-900 mb-3">
                Interpretation
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {results.interpretation}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-900 mb-3">
                Recommendations
              </h2>
              <ul className="space-y-2">
                {results.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This assessment is for informational
                purposes only and is not a substitute for professional medical
                or psychological advice. If you're experiencing significant
                distress, please consult with a qualified healthcare provider.
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              Take Assessment Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="bg-pink-100 rounded-2xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-purple-900 text-center">
            Emotional Suppression Assessment
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-6">
            <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {currentSectionData.title}
            </span>
            <h2 className="text-xl font-bold text-purple-900 mb-4">
              Question {currentQuestion + 1}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {currentQ.text}
            </p>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() =>
                  handleAnswer(currentQ.id, index, currentQ.scores[index])
                }
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  answers[currentQ.id]?.option === index
                    ? "bg-purple-600 text-white shadow-lg scale-105"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={prevQuestion}
              disabled={currentSection === 0 && currentQuestion === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={!isAnswered}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentSection === sections.length - 1 &&
              currentQuestion === currentSectionData.questions.length - 1
                ? "Finish"
                : "Next"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="bg-purple-700 h-2 rounded-full transition-all duration-500 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute -right-4 -top-3 w-8 h-8 bg-white border-4 border-purple-700 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xs font-bold text-purple-700">
                    {answeredCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="text-sm font-medium text-gray-600">
              Question {globalQuestionNumber} of {totalQuestions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalAssessment;
