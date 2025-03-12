# MLOPs-ClassTask-3 (Public)

## 📌 Project Overview
This project is a **full-stack Pomodoro To-Do application** that allows users to **manage tasks** while utilizing the **Pomodoro technique** for improved productivity. The application consists of:
- **Frontend:** React-based user interface.
- **Backend:** Flask API handling task management.
- **Database:** Redis for fast, in-memory storage.

## 🏗️ Features
✅ Add, complete, and delete tasks.  
✅ Pomodoro timer for productivity.  
✅ Watch mode for real-time updates.  
✅ Docker Compose for containerized deployment.  

---

## 🛠️ Technologies Used
- **Frontend:** React + Vite
- **Backend:** Flask (Python)
- **Database:** Redis
- **Containerization:** Docker & Docker Compose
- **Real-time Updates:** Watch mode with `develop.watch`

---

## 🚀 Setup Instructions
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-repo/MLOPs-ClassTask-3.git
cd MLOPs-ClassTask-3
```

### **2️⃣ Run the Application with Docker Compose**
```bash
docker-compose up --build
```

### **3️⃣ Access the Application**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/tasks
- **Redis (if needed for debugging):** `docker exec -it <redis-container-id> redis-cli`

---

## ⚙️ Watch Mode for Real-Time Updates
This project supports **automatic syncing of changes** using Docker’s `develop.watch` feature:
- **Backend:** Auto-reloads Flask when Python files change.
- **Frontend:** Auto-refreshes React app when JS files change.
- **Rebuilds** the containers only when `requirements.txt`, `package.json`, or `Dockerfile` is updated.

---

## 📜 API Endpoints (Backend)
| Method | Endpoint | Description |
|--------|-------------|-------------|
| `GET` | `/tasks` | Get all tasks |
| `POST` | `/tasks` | Add a new task |
| `PUT` | `/tasks/<task_id>/complete` | Toggle task completion |
| `DELETE` | `/tasks/<task_id>` | Delete a task |

---

## 📂 Folder Structure
```
/MLOPs-ClassTask-3
│── /backend         # Flask API
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│── /frontend        # React UI
│   ├── src/
│   ├── Dockerfile
│── docker-compose.yml
│── README.md
```

---

