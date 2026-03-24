# MERN AI Flow App

A full-stack MERN application that allows users to input a prompt, generate an AI response, and visualize the flow using React Flow. Users can also save prompts and responses to MongoDB.

---

## Features

- 🔹 Input prompt using a visual node (React Flow)
- 🔹 AI-generated response using OpenRouter API
- 🔹 Flow visualization between input and output nodes
- 🔹 Save prompt & response to MongoDB
- 🔹 Clear input/output functionality
- 🔹 Loading state handling for better UX
- 🔹 Fully deployed frontend & backend

---

## Tech Stack

### Frontend
- React (TypeScript)
- React Flow
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- OpenRouter API

---

## How It Works

1. User enters a prompt in the input node
2. Clicks **Run Flow**
3. Frontend sends request to backend API
4. Backend calls OpenRouter AI API
5. AI response is returned and displayed in result node
6. User can save the result to MongoDB

---

## Run Locally

### 1. Clone Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
```

---

### 2. Backend Setup
```bash
cd Backend
npm install
npm run dev
```

---

### 3. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

---

## Deployment

- **Frontend:** https://mern-ai-app-frontend.onrender.com 
- **Backend:** https://mern-ai-app-backend.onrender.com
- **Database:** MongoDB Atlas  

---

## Notes

- Free hosting (Render) may cause **cold start delay**
-I initially tried to use the free models mentioned in the assignment like Gemini Flash Lite and Mistral, but they were not available through the OpenRouter API at the time and were returning errors.
So to ensure my application works correctly end-to-end, I switched to a stable model (GPT-3.5).
- AI responses are not real-time for live events (e.g. news)
---

## Demo

A short demo video is included showing:
- Running AI flow
- Saving data
- MongoDB database entry

---

## Author

**Shahina Sheikh**

---
