# 🌌 Project Aether: Your Interactive AI Second Brain

**Project Aether** is a next-generation AI-powered study environment that transforms passive content consumption into active, immersive mastery. By leveraging Google's Gemini AI, 3D visualization, and gamification, Aether bridges the gap between watching a lecture and truly understanding it.

---

## 🚀 Key Features

### 🧠 1. AI Synthesis Engine (Google Gemini)
Turn hours of video or dense research papers into actionable insights in seconds.
- **Auto-Summarization**: Instant, high-level overviews of any topic.
- **Interactive Timelines**: Key milestone markers that let you jump to specific moments.
- **Contextual Quizzes**: Personalized assessments mapped directly to the content.
- **"Jump to Explanation"**: Every quiz question is linked to the exact timestamp where the answer is explained.

### 🕸️ 2. 3D Aetherial Neuron-Map
Visualize your knowledge in three dimensions. Using **Three.js**, Aether generates an interactive 3D graph of concepts:
- **Primary Nodes (Blue)**: Core concepts and main pillars.
- **Sub-Concepts (Purple)**: Supporting facts and related ideas.
- **Dynamic Growth**: Watch the map expand as the AI discovers new connections.

### 🎮 3. Concept Matcher Game
Study like you're playing. Aether uses your study material to create a custom matching game:
- **Real-time Stats**: Track your score, streaks, and best times.
- **Active Recall**: Match concepts with definitions to cement memory.
- **Round-Based Progression**: Clear rounds to master the entire topic.

### 📄 4. Multimodal Synthesis
- **YouTube Support**: Instant transcript extraction and video synchronization.
- **PDF Support**: Upload research papers, notes, or textbooks for full AI analysis.
- **Zen Focus Mode**: A distraction-free UI designed for deep work.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **3D Visualization**: Three.js, React-Force-Graph-3D.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **Core AI**: Google Gemini AI (Google Generative AI SDK).
- **Inspiration**: Aetherial Glassmorphism / Space-Visual Design.

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google AI (Gemini) API Key

### 2. Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

### 3. Installation
```bash
# Clone the repo
git clone https://github.com/riturajjhaba938/Aether.git

# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 4. Running the Application
```bash
# In server directory
npm run dev

# In client directory
npm run dev
```

---

## 🌌 The Aether Experience
> "Knowledge isn't just a list of facts; it's a web of connections."

Aether is designed for students, researchers, and lifelong learners who want to move beyond the screen and into the mind of the material.

---

## 🤝 Contributing
Contributions are welcome! If you have ideas for new learning modules or 3D visualizations, feel free to open a PR.

---

## 📜 License
MIT License - Created with ❤️ by the Code Bros.
