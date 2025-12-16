# Emotional-Suppression-and-it-s-impact-on-physical-health
Emo Calm explores the relationship between emotional suppression and physical health outcomes. This project analyzes how unexpressed emotions can manifest as physical symptoms and impact overall wellbeing, providing data-driven insights into the mind-body connection.
# 🌿 EmoCalm

**Discover the Emotional Roots of Physical Symptoms**

EmoCalm bridges the gap between physical symptoms and emotional wellness by helping users understand the metaphysical connections behind their health conditions. Inspired by *Metaphysical Anatomy* by Evette Rose, this platform provides personalized insights, healing resources, and connects users with holistic practitioners.

---

## ✨ Features

### 🤖 AI-Powered Symptom Analysis
- Interactive chatbot that analyzes physical symptoms and diseases
- Maps conditions to emotional root causes using our curated database
- Fallback to Groq API for conditions not in our database
- Personalized healing recommendations


###📊 Assessment & Scoring

Interactive health assessment questionnaire
Personalized wellness score based on responses
Track your emotional and physical health metrics over time
Visual progress indicators and insights

### 📚 Comprehensive Database
- **mapping1.json** contains mappings for various conditions:
  - Disease/Symptom name
  - Physical root cause
  - Emotional root cause
  - Healing tips and tools
  - Curated resources (yoga, meditation, breathwork)

### 🧘 Healing Resources
- YouTube video recommendations for:
  - Targeted yoga practices
  - Guided meditations
  - Breathwork exercises
- Evidence-based healing modalities
- Self-care tools and techniques

### 👥 Therapist Directory
- Connect with verified holistic practitioners
- Browse by specialty (somatic therapy, energy healing, etc.)
- Book consultations directly through the platform

---

## 🛠️ Tech Stack

### Frontend
- **React** - Component-based UI
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Navigation

### Backend
- **Python** - Core backend logic
- **Flask/FastAPI** - REST API framework
- **Groq API** - AI-powered chatbot responses
- **JSON Database** - Symptom-emotion mappings

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 18+
Python 3.9+
Groq API Key
```

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/emocalm.git
cd emocalm/frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd ../backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "GROQ_API_KEY=your_api_key_here" > .env

# Start the server
python app.py
```

---

## 📁 Project Structure

```
emocalm/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx
│   │   │   ├── Therapists.jsx
│   │   │   └── Resources.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   └── TherapistsPage.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app.py
│   ├── groq_client.py
│   ├── database/
│   │   └── mapping1.json
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

## 🔄 How It Works

1. **User Input**: Patient describes symptoms or conditions through the chat interface
2. **Database Search**: System searches `mapping1.json` for matching conditions
3. **AI Fallback**: If no match found, Groq API analyzes the condition using metaphysical principles
4. **Response Generation**: 
   - Emotional root cause explanation
   - Healing tips and practical tools
   - Curated YouTube resources (yoga, meditation, breathwork)
5. **Additional Support**: Users can explore the therapist directory for professional guidance

---

## 📊 Database Schema (mapping1.json)

```json
{
  "conditions": [
    {
      "id": "001",
      "symptom": "Lower Back Pain",
      "physical_cause": "Muscle strain, poor posture, disc issues",
      "emotional_cause": "Financial insecurity, lack of support, feeling unsupported in life",
      "healing_tips": [
        "Practice grounding exercises",
        "Journal about support systems",
        "Address financial anxieties"
      ],
      "resources": {
        "yoga": "https://youtube.com/...",
        "meditation": "https://youtube.com/...",
        "breathwork": "https://youtube.com/..."
      }
    }
  ]
}
```

---

## 🎯 Roadmap

- [ ] Expand symptom database to 500+ conditions
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] User progress tracking
- [ ] Community forum
- [ ] Integration with wearable devices
- [ ] Practitioner dashboard

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

EmoCalm is designed for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider with questions regarding a medical condition.

---



**Transform your healing journey. Understand your body's emotional language.**

[Get Started](https://localhost5173)
