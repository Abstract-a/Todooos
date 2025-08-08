# 📝 Task Management App
_A simple yet powerful app to manage your tasks, stay organized, and collaborate._

## 🚀 Overview
This is a **full-stack Task Management Application** that allows users to:
- Create, edit, complete and delete tasks.
- **Authenticate** securely using sign-up/sign-in.
- Add **comments** on tasks.

Perfect for **personal productivity**.

---

## ✨ Features
- 🔐 **User Authentication** – Secure sign-up, login, and logout.
- 📋 **Task Management** – Add, update, and delete tasks.
- 💬 **Comments** – add, update, and delete Comment on tasks.
- 📱 **Responsive UI** – Works on desktop and mobile.
- ⚡ **Fast & Intuitive** – Built with the MERN stack.

---

## 🛠 Tech Stack
**Frontend:** React, TailwindCSS, Vite
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Auth:** JWT-based authentication

---

## 📸 Demo
_ 1 - sign up and sign in processes
![signin-signup](https://github.com/user-attachments/assets/31bb1365-976b-4929-aa74-a9f479745655)


_ 2 - create, update, complete, delete tasks
![task-crud](https://github.com/user-attachments/assets/8b7d79ec-d026-4a4d-876c-7d0a70c78ab3)

_ 3 - search tasks
![task-search](https://github.com/user-attachments/assets/544181c3-fc59-4b44-a437-6c639ccc0c7d)

_ 4 - create, update, delete comments
![comment-crud](https://github.com/user-attachments/assets/eb26c204-bf1a-4daa-a83c-d4c379f24e30)

_ 5 - sign out
![signin-signup](https://github.com/user-attachments/assets/5b01a587-8e66-4d69-9ffc-93f5686b8fb2)


## 📦 Installation
```bash
# Clone repository
git clone https://github.com/username/Todooos.git
cd Todooos/frontend

# Install dependencies on the frontend
npm install

# Set environment variables in .env
# VITE_API_BASE_URL

# run the frontend
npm run dev

cd Todooos/backend

# Install dependencies on the backend
npm install

# Set environment variables in .env
PORT
MONGO_URI
JWT_SECRET

# Run the app
npm run dev
