<div align="center">
  <h1>🌟 JyotishPeeth</h1>
  <p><i>Ancient Vedic Wisdom Meets Modern Artificial Intelligence</i></p>
</div>

**JyotishPeeth** is a beautifully crafted full-stack web application that brings traditional Indian astrology into the digital age. By combining a classic, culturally-rich design pattern with the cutting-edge predictive capabilities of Google Gemini AI, it offers users personalized and immersive astrological insights.

![Astrology Platform Preview](https://img.shields.io/badge/Status-Active-success) ![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue) ![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green) ![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)

## ✨ Core Features

* **Astrology Predictions:** Users input their birth details to discover their Moon Sign (Rashi), Nakshatra, and an incredibly detailed, elegantly formatted destiny reading spanning Career, Health, and Love.
* **Dual-Hand Palmistry Insights:** Upload images of both the left and right hands. The AI analyzes the photos and outputs a separate, deeply researched interpretation of line patterns for each hand.
* **Vedic Kundli Generator:** Enter basic birth information to instantly generate a comprehensive 12-house Vedic birth chart.
* **Bespoke UI/UX:** Developed with a custom CSS design system using a specialized color palette (Crimson Red, Khadi Cream, and Antique Gold), temple borders, structured layouts, and fluid animations.

## 🛠️ Technology Stack

* **Frontend (`/client`)**: React, Vite, React Router, Framer Motion (page transitions), Vanilla CSS, Lucide React (iconography).
* **Backend (`/server`)**: Node.js, Express.js, Multer (multipart form handling for Palm Images), OpenAI SDK API Wrapper acting as the interface to **Google Gemini 2.5 Flash**.

## 🚀 Running Locally

To run this application on your local machine, you will need two terminal windows open.

### 1. Backend Setup
1. Navigate to the server folder: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file inside the `server` directory and add your Google Gemini API key:
   ```env
   OPENAI_API_KEY=your_gemini_key_here
   PORT=5000
   ```
4. Start the backend: `node server.js`

### 2. Frontend Setup
1. Navigate to the client folder: `cd client`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`
4. Open your browser and navigate to `http://localhost:5173/`

## 🔮 Future Enhancements
* Implementing a complete user authentication system to save historical chart readings.
* Deploying the application across a serverless environment like Vercel (Frontend) and Render (Backend).
* Integrating local chart calculation logic (e.g. `swisseph`) for deterministic astronomical data.
