# ✍️ Blogify

A full-stack blogging platform where users can create, publish, and explore blog posts. Blogify provides user authentication, image uploads, blog management, and a commenting system through a React frontend and Express.js REST API.

---

## 🌐 Live Demo

🔗 **Live Application:** https://blog-website-xlem.onrender.com/

🔗 **Backend API:** https://blogify-server-7zj7.onrender.com/

---
<img width="1517" height="690" alt="Screenshot 2026-08-12 002550" src="https://github.com/user-attachments/assets/e3ee6517-1237-49e1-87b1-d8e16dee37e2" />


## 📌 About The Project

Blogify is a full-stack web application developed to understand and implement the complete flow of a modern web application.

The frontend is built with **React**, while the backend uses **Node.js and Express.js**. **MongoDB** is used as the database for storing users, blogs, and comments.

The application communicates through REST APIs, allowing the React frontend to interact with the Express backend.

---


## ✨ Features

### 👤 Authentication
- User registration
- User login
- JWT-based authentication
- Authentication using HTTP cookies
- Logout functionality
- Protected actions for authenticated users

### 📝 Blogging
- View all published blogs
- View individual blog posts
- Create a new blog
- Add a blog title and body
- Upload a cover image
- Display author information
- Display blog creation information

### 💬 Comments
- Add comments to blog posts
- Display all comments
- Display the comment author's name

### 🎨 User Interface
- Responsive React interface
- Tailwind CSS styling
- Navigation using React Router
- Reusable components
- Blog card layout
- Individual blog detail pages

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- Multer

---

## 🏗️ Project Structure

```text
blog-website/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── public/
│   │   └── uploads/
│   ├── app.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
