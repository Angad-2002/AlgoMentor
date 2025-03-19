# AlgoMentor – AI-Powered Educational Platform

## 🚀 Project Overview
AlgoMentor is an AI-powered educational platform designed to revolutionize learning through the **Socratic method**. The platform engages students with **thought-provoking questions**, promotes **critical thinking**, and provides a **comprehensive learning environment** using:

- **Multimodal support** (text, images, videos)
- **Interactive tools** for learning concepts dynamically
- **Personalized paths** for continuous learning and improvement

## 🎯 Vision
The goal is to create an **intelligent Socratic learning assistant** that can **mimic a personalized tutor** and guide students to understand concepts deeply. The platform enables:

✅ **AI Chat Assistant** for guided Socratic questioning  
✅ **Multimodal learning** (Text, Image, Video-based queries)  
✅ **Integrated Code Editor** for real-time coding & debugging  
✅ **Interactive Visualizations** for Data Structures & Algorithms  
✅ **Self-Evaluation & Activity Tracking** with performance insights  
✅ **Gamified Learning** using badges & motivational AI assistant  

Some future plans include **collaborative learning, integration with external educational platforms, and live certified courses** powered by cutting-edge AI models.

---

## 🏗️ Architecture

![Architecture](https://github.com/Angad-2002/AlgoMentor/blob/main/visuals/Architecture.png)

### 🔑 Key Components:
1. **AI Chat Assistant**: Uses Socratic questioning to deepen understanding.
2. **Multimodal Learning Support**: Accepts text, image, and video-based queries.
3. **Interactive Visualization Tools**: Dynamic DSA visualizations.
4. **Integrated Code Editor**: Enables real-time coding and debugging.
5. **Self-Evaluation Tools**: Customizable quizzes for knowledge assessment.
6. **Activity Tracking & Heatmaps**: Monitors study patterns.
7. **Gamification**: Encourages engagement through achievement badges.
8. **Motivational AI Assistant**: Provides daily inspiration for learners.

### 🧠 Current LLM Model
- **Framework**: Groq
- **Model**: LLama 3 70B

---

## ✨ Features
### ✅ In-Scope Features
- **AI Chat Assistant** with Socratic method-based learning.
- **Multimodal Query Support**: Accepts text, images, and video-based doubts.
- **Interactive DSA Visualizations**: Real-time demonstrations of algorithms.
- **Resource Suggestion Engine**: AI-driven learning material recommendations.
- **Integrated Code Editor**: Supports live coding & debugging.
- **Custom Self-Evaluation Tests**: Adaptive difficulty quizzes.
- **Study Activity Heatmaps**: Tracks user progress visually.
- **Gamification & Achievement Badges**: Rewards for learning milestones.
- **Motivational AI Assistant**: Daily quotes to inspire students.

### ❌ Out of Scope
- **Guaranteed accuracy of AI-generated responses**: Users should verify critical information independently.

---

## 🔮 Future Opportunities
1. **Collaborative Learning**: Study groups, discussion forums, and peer learning.
2. **Integration with External Learning Platforms**: Access to high-quality courses.
3. **Live Certified Courses**: Expert-led sessions for advanced topics.
4. **Gemini Model Integration**: More personalized AI-driven responses.
5. **Lang Graph Agent AI Assistant**: Improved navigation & accessibility.
6. **Optimized Inference Time**: Enhanced system performance.

---

## 🛠️ Challenges Faced During Development
### 🚧 Technical Challenges & Solutions

1. **JSON Response Issues from LLM**  
   - **Problem**: Inconsistent JSON data parsing errors.
   - **Solution**: Added validation checks & logging for unexpected responses.

2. **Gemini & Langchain Integration Challenges**  
   - **Problem**: Compatibility issues affecting smooth AI interaction.
   - **Solution**: Switched to alternative models, awaiting future Gemini updates.

3. **CORS Policy Issues**  
   - **Problem**: Frontend API access restrictions.
   - **Solution**: Configured server headers to allow cross-origin requests.

4. **Multimodal Chat Implementation**  
   - **Problem**: Handling diverse input types (text, images, etc.).
   - **Solution**: Researched & integrated a suitable multimodal framework.

5. **Heatmap Generation for Study Streaks**  
   - **Problem**: Lack of clear documentation for heatmap visualization.
   - **Solution**: Experimented with various libraries to find an optimal solution.

6. **LangGraph Agent Integration**  
   - **Problem**: Difficulty structuring all features as LangGraph nodes.
   - **Solution**: Exploring ways to resolve documentation gaps.

---

## 🛠️ Installation & Setup Guide

### 🔹 Backend Setup (Python & FastAPI)
1. **Clone the repository**
   ```bash
   git clone https://github.com/Angad-2002/Socratic-Learning.git
   cd Socratic-Learning
   ```
2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the backend server**
   ```bash
   cd backend-ml
   python main.py
   ```
   **Backend Running at:** `http://0.0.0.0:8000`

### 🔹 Frontend Setup (React & Vite)
1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm run dev
   ```
   **Frontend Running at:** `http://localhost:3000`

### 🔹 Backend API (Node.js & Express)
1. **Navigate to backend directory**
   ```bash
   cd backend
   ```
2. **Run the server**
   ```bash
   node server.js
   ```
   **Backend Running at:** `http://localhost:5000`

---

## 💡 Contributing
Contributions are welcome! If you have ideas to enhance the platform, feel free to:
- **Fork the repository**
- **Create a feature branch**
- **Submit a pull request**

## 📜 License
This project is licensed under the **MIT License**.
