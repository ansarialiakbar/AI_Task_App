# 🚀 AI Task App

A full-stack AI Task Processing application that allows users to create tasks, process them asynchronously, and track results in real time.

---

## 📌 Features

- 🔐 User Authentication (JWT)
- 📝 Create AI Tasks (title, input, operation)
- ⚙️ Asynchronous Task Processing (Worker)
- 📊 Task Status Tracking (pending, running, success, failed)
- 📜 View Task Logs & Results
- 🔁 Background processing using Redis queue

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Worker
- Python
- Redis Queue Processing

### Database & Queue
- MongoDB (Atlas / Local)
- Redis (Upstash / Local)

### DevOps
- Docker
- Docker Compose

---

## 📁 Project Structure


ai-task-app/
│── backend/
│── frontend/
│── worker/
│── docker-compose.yml
│── .gitignore
│── README.md


---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
REDIS_URL=your_redis_url


### Worker (`worker/.env`)

MONGO_URI=your_mongodb_url
REDIS_URL=your_redis_url


---

## 🚀 Local Setup (Docker)

### 1. Clone the repository

```bash
git clone https://github.com/ansarialiakbar/AI_Task_App.git
cd ai-task-app
```

2. Run using Docker

docker-compose up --build

3. Access the app

Frontend → http://localhost:5173

Backend → http://localhost:5000

🧪 Running Without Docker (Optional)

Start MongoDB & Redis first

docker-compose up -d mongodb redis

## Backend
```
cd backend
npm install
npm run start
```

## Frontend
```
cd frontend
npm install
npm run dev
```
## Worker
```
cd worker
pip install -r requirements.txt
python -m app.worker
```

## 🌐 Deployment

Service	Platform
Frontend	Netlify
Backend	Render
Worker	Render
Redis	Upstash
MongoDB	MongoDB Atlas

## 🔗 Live URLs
```
Frontend: https://your-app.netlify.app
Backend: https://your-api.onrender.com
```

## 🧠 System Architecture
```
User → Frontend → Backend → MongoDB
                     ↓
                   Redis → Worker → MongoDB
```

## 🔄 Workflow

User registers/logs in
User creates a task
Backend stores task in MongoDB
Task is pushed to Redis queue
Worker picks task and processes it
Result is saved in MongoDB
Frontend displays updated task status

## ⚠️ Important Notes

Redis is required for background processing
MongoDB must be running before backend starts
Worker must be running for task execution

## ❗ Limitations

No Kubernetes deployment (Argo CD not implemented)
Basic error handling
No retry mechanism for failed tasks

## 🔮 Future Improvements

Kubernetes deployment
CI/CD pipeline
Task retry system
Logging & monitoring
Role-based authentication

## 📦 .gitignore (Root)
```
node_modules/
.env
.env.*
dist/
build/
__pycache__/
*.log
```

## 👨‍💻 Author

Ali Akbar
GitHub: https://github.com/ansarialiakbar
