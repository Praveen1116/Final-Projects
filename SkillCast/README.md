# Acadify

Acadify is a full-stack web application for online course management, allowing users to sign up, browse, purchase, and manage courses. Admins can create, edit, and delete courses. The project uses React for the frontend and Node.js/Express with MongoDB for the backend.

---

## Features

- **User Authentication:** Signup and Signin for users and admins.
- **Course Browsing:** Users can view all available courses.
- **Course Purchase:** Users can buy courses (simulated, no payment gateway yet).
- **My Courses:** Users can view purchased courses.
- **Admin Panel:** Admins can view, add, edit, and delete their own courses.
- **Refund Request:** Users can request a refund via email.

---

## Tech Stack

- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT

---

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Praveen1116/Final-Projects/SkillCast.git
   ```

2. **Backend Setup:**
   - Go to the backend folder:
     ```bash
     cd Backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add your MongoDB connection string:
     ```
     MONGO_URL=your_mongodb_connection_string
     JWT_USER_SECRET=your_user_jwt_secret
     JWT_ADMIN_SECRET=your_admin_jwt_secret
     ```
   - Start the backend server:
     ```bash
     node index.js
     or
     nodemon index.js
     ```

3. **Frontend Setup:**
   - Go to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     or
     npm run dev
     ```

---

## Usage

- **User:** Sign up, sign in, browse courses, buy courses, view "My Courses".
- **Admin:** Sign up/sign in, add new courses, edit/delete own courses, view all created courses.
- **Refund:** Click "Refund" in the footer to send a refund request via email.

---

## Folder Structure

```
SkillCast/
├── Backend/
│   ├── routes/
│   ├── middlewares/
│   ├── db.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── Admin/
│   │   ├── pages/
│   │   ├── Template/
│   │   ├── App.css
│   │   └── App.jsx
│   └── package.json
└── README.md
```

---

## API Endpoints

### User

- `POST /api/v1/user/signup` – User registration
- `POST /api/v1/user/signin` – User login
- `GET /api/v1/user/purchases` – Get purchased courses
- `POST /api/v1/user/purchase/:courseId` – Purchase a course

### Admin

- `POST /api/v1/admin/signup` – Admin registration
- `POST /api/v1/admin/signin` – Admin login
- `POST /api/v1/admin/course` – Add a course
- `PUT /api/v1/admin/course/:courseId` – Edit a course
- `DELETE /api/v1/admin/course/:courseId` – Delete a course
- `GET /api/v1/admin/course/bulk` – Get all courses created by admin

### Courses

- `GET /api/v1/course/preview` – Get all courses

---

## Creator/Author

**Praveen Kumar**  
[GitHub Profile](https://github.com/Praveen1116)

---

## Contact

For refund requests or queries, email: [kpraveen1116@gmail.com](mailto:kpraveen1116@gmail.com)
