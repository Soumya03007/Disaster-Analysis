# 🛑 Disaster Analysis Web App

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?logo=fastapi)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwind-css)
![HuggingFace](https://img.shields.io/badge/HuggingFace-Model-yellow?logo=huggingface)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

An AI-powered web application that analyzes disaster-related images to generate detailed captions and structured reports.  
The backend uses **FastAPI** + **HuggingFace Transformers** for vision-language tasks, while the frontend is built with **React (TypeScript)** + **Vite** + **TailwindCSS** + **shadcn/ui** for a modern, responsive interface.

---

## 📸 Overview
This tool allows you to:
- Upload an image from a disaster scene.
- Automatically generate a descriptive caption using a vision transformer model.
- Generate a detailed disaster report describing:
  - **Disaster type** (e.g., flood, fire, earthquake)
  - **Human/animal presence**
  - **Casualties or injuries**
  - **Environmental conditions** (smoke, fire, water, debris)
  - **Infrastructure damage**
  - **Visibility conditions**
- Provide a concise summary for quick assessment.

---

## 🚀 Features
- 🔍 **Automatic Image Captioning** (HuggingFace vision model)
- 🤖 **AI-powered Disaster Report Generation**
- 📊 **Structured Data Extraction** from visual input
- 🎨 **Responsive Frontend** with modern UI components
- 🌐 **API-first Architecture** for easy integration

---

## 🧰 Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- Radix UI components
- React Router DOM
- TanStack Query

**Backend**
- FastAPI
- Uvicorn
- Pillow
- Transformers + Torch
- HuggingFace Hub
- python-dotenv

---

## 📂 Project Structure
```
backend/
├── app/
│ ├── init.py
│ ├── main.py # FastAPI entry point
│ └── utils.py # Caption & report generation logic
└── requirements.txt

frontend/
├── public/
├── src/
│ ├── components/ # UI components
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility functions
│ ├── pages/ # Page views
│ ├── App.tsx # App root component
│ └── main.tsx # React entry point
└── package.json

```

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Soumya03007/Disaster-Analysis.git
cd Disaster-Analysis
```
### 2️⃣ Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn app.main:app --reload
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

### 🙌 Acknowledgments
- Hugging Face for model hosting and pretrained transformers

- Radix UI + shadcn/ui for modern, accessible UI components

- FastAPI for high-performance backend development


