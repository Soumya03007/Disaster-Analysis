# 🛑 Disaster Analysis Web App

An AI-powered web application that analyzes disaster-related images to generate detailed captions and reports.  
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

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/Disaster-Analysis.git
cd Disaster-Analysis
```
### 2. Backend Setup
```
cd backend
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
### 3. Create a .env file in backend/:
```
HUGGINGFACE_API_KEY=your_api_key_here
```
### 4. Run the backend:
```
uvicorn app.main:app --reload
```
Backend will run at: http://127.0.0.1:8000

### 5. Frontend Setup
```
cd ../frontend
npm install
npm run dev
```
Frontend will run at: http://localhost:5173
