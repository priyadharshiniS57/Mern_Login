# 🔐 Beginner-Friendly MERN Stack Authentication Project

A simple, modern, and clean **MERN Stack** (MongoDB, Express.js, React, Node.js) authentication project featuring user registration, login, password hashing with **bcrypt**, authentication with **JSON Web Tokens (JWT)**, and a **Protected Dashboard**.

---

## 📁 Project Structure

```text
Mern_Login/
├── backend/                     # Node.js + Express backend
│   ├── config/
│   │   └── db.js                # MongoDB connection logic
│   ├── controllers/
│   │   └── authController.js    # Register, Login & GetMe logic
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification middleware
│   ├── models/
│   │   └── User.js              # Mongoose User schema
│   ├── routes/
│   │   └── authRoutes.js        # Authentication endpoints
│   ├── .env                     # Environment variables (Mongo URI, JWT Secret, Port)
│   ├── .env.example             # Example environment template
│   ├── package.json             # Backend dependencies & scripts
│   └── server.js                # Express entry point
│
├── frontend/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Responsive navigation bar
│   │   │   └── ProtectedRoute.jsx # Route guard for private pages
│   │   ├── pages/
│   │   │   ├── Login.jsx        # Login page with validation
│   │   │   ├── Register.jsx     # Registration page with validation
│   │   │   └── Dashboard.jsx    # Protected dashboard page
│   │   ├── App.jsx              # Main router & page routes
│   │   ├── index.css            # Modern glassmorphism UI styles
│   │   └── main.jsx             # React entry point
│   ├── index.html               # HTML template with Google Fonts
│   ├── package.json             # Frontend dependencies & scripts
│   └── vite.config.js           # Vite configuration
│
└── README.md                    # Complete project documentation
```

---

## 🛠️ Tech Stack & Libraries

- **Frontend**: [React](https://react.dev/) + [React Router](https://reactrouter.com/) + [Vite](https://vitejs.dev/) + Vanilla CSS
- **Backend**: [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Security**: 
  - `bcryptjs` for password hashing
  - `jsonwebtoken` (JWT) for stateless token authentication
  - `cors` to allow frontend-backend communication
  - `dotenv` for configuration management

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** running locally on your computer (e.g., MongoDB Compass or MongoDB Community Server), **or** a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection URI.

---

### 2. Backend Setup

Open your terminal, navigate to the `backend` directory:

```bash
cd backend
```

#### Install Backend Dependencies:
```bash
npm install
```

#### Configure Environment Variables:
The backend includes a pre-configured `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_auth_db
JWT_SECRET=super_secret_jwt_key_change_in_production
```
*(If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string).*

#### Run Backend Server:
- **Development mode (auto-restart with nodemon):**
  ```bash
  npm run dev
  ```
- **Standard start:**
  ```bash
  npm start
  ```
Your backend will start at: `http://localhost:5000`

---

### 3. Frontend Setup

Open a **new** terminal window and navigate to the `frontend` directory:

```bash
cd frontend
```

#### Install Frontend Dependencies:
```bash
npm install
```

#### Run Frontend Development Server:
```bash
npm run dev
```
Your frontend will start at: `http://localhost:3000`

---

## 💡 How Authentication Works

1. **User Registration (`/register`)**:
   - The user inputs `name`, `email`, and `password`.
   - The frontend performs client-side validation.
   - The backend validates fields, checks if the email is already registered, generates a salt, and hashes the password with **bcrypt**.
   - The user is saved to MongoDB with the hashed password.
   - A **JSON Web Token (JWT)** is created containing the user's ID and returned to the frontend.

2. **User Login (`/login`)**:
   - User inputs `email` and `password`.
   - Backend searches for the user by email in MongoDB.
   - `bcrypt.compare()` compares the plain text password against the hashed password.
   - If valid, a new JWT token is returned and stored in the browser's `localStorage`.

3. **Protected Dashboard (`/dashboard`)**:
   - The `<ProtectedRoute>` component ensures unauthorized users cannot access the dashboard. If no token is found, it automatically redirects to `/login`.
   - When the Dashboard loads, it sends a `GET` request to `/api/auth/me` with the HTTP header:
     `Authorization: Bearer <token>`
   - The backend `authMiddleware` verifies the token's signature with `JWT_SECRET`, decodes the user ID, retrieves the user profile from MongoDB (without the password), and responds with user data.

4. **Logout**:
   - Clicking the **Logout** button removes the `token` and `user` data from `localStorage` and redirects to `/login`.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Access | Header Required |
|---|---|---|---|---|
| `GET` | `/` | Health check API status | Public | None |
| `POST` | `/api/auth/register` | Register a new user | Public | None |
| `POST` | `/api/auth/login` | Authenticate user & get JWT token | Public | None |
| `GET` | `/api/auth/me` | Fetch logged-in user profile | Protected | `Authorization: Bearer <token>` |

---

## 🧪 Testing the Project

1. Ensure MongoDB service is running on your machine.
2. Start the backend (`cd backend && npm run dev`).
3. Start the frontend (`cd frontend && npm run dev`).
4. Visit `http://localhost:3000/register` in your web browser.
5. Create an account with a name, email, and password (min 6 characters).
6. Notice the immediate redirection to the **Protected Dashboard**, where your details and active JWT token are displayed.
7. Click **Logout** and try manually navigating to `http://localhost:3000/dashboard` — notice that the route guard blocks unauthorized access and redirects to `/login`!
