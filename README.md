# SkillsSwap

## Project Overview
**SkillsSwap** is a MERN-stack (MongoDB, Express, React, Node.js) web application designed as a peer-to-peer skill-sharing platform for students. There is no monetary exchange involved; instead, the currency is knowledge itself. Users can offer their skills to teach others and in return, learn new skills from their peers.

## Folder Structure
The project is divided into two main parts: a React frontend and a Node.js/Express backend.

```text
SkillsSwap/
├── client/                 # Frontend React application (built with Vite)
│   ├── public/             # Static assets
│   ├── src/                # React source code (components, pages, styles, etc.)
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── server/                 # Backend Node.js / Express application
│   ├── config/             # Database and server configurations
│   ├── controllers/        # Request handlers/logic
│   ├── middleware/         # Express middlewares (e.g., Auth)
│   ├── models/             # Mongoose schemas (User, Skill, SwapRequest)
│   ├── routes/             # API route definitions
│   └── package.json        # Backend dependencies
└── Documentation/          # Project design and requirement documentation
```

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (either installed locally or a MongoDB Atlas connection string)
- Git

### Installation

Clone the repository to your local machine:
```bash
git clone https://github.com/nitinbs24/SkillSwap.git
cd SkillSwap
```

#### 1. Backend Setup
Open a terminal and navigate to the `server` directory to install its dependencies:
```bash
cd server
npm install
```

**Environment Variables:**
In the `server` directory, make sure you have a `.env` file containing your database and authentication configuration:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
```

#### 2. Frontend Setup
Open a new terminal or go back to the project root, then navigate to the `client` directory to install frontend dependencies:
```bash
cd client
npm install
```

---

## Running the Application

Once you have installed the dependencies in both folders, you will need two separate terminal windows/tabs to run the backend and the frontend simultaneously.

### Start the Backend Server
In your first terminal, from the root of the project:
```bash
cd server
npm run dev
```
*The backend API will start running on `http://localhost:5000`.*

### Start the Frontend Server
In your second terminal, from the root of the project:
```bash
cd client
npm run dev
```
*The frontend React application will start running on `http://localhost:5173`. Open this URL in your browser to view the application.*
