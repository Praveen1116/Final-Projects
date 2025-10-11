# 📝 Todo-App

A full-stack Todo application built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**.

## 🚀 Features

- User Signup & Signin (with JWT)
- Secure Passwords (bcrypt)
- Create, Read, Update, Delete Todos
- Rate Limiting for API Security
- Input Validation (zod)
- Static Frontend Serving
- Protected API Routes

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Validation:** zod
- **Security:** express-rate-limit
- **Environment:** dotenv

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Praveen1116/Final-Projects.git

# Go to the project folder
cd Final-Projects/finalTodo

# Install dependencies
npm install
```

## ⚙️ Usage

1. **Set up MongoDB:**  
   Make sure MongoDB is running locally or provide a connection string in `.env`.

2. **Configure Environment Variables:**  
   Create a `.env` file in `finalTodo` folder:
   ```
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_connection_string
   ```

3. **Start the server:**
   ```bash
   node index.js
   ```

4. **Open in browser:**  
   Visit [http://localhost:3000](http://localhost:3000)

## 📚 API Endpoints

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| POST   | `/api/signup`      | Register a new user       |
| POST   | `/api/signin`      | Login and get JWT token   |
| POST   | `/api/todo`        | Create a new todo         |
| GET    | `/api/todos`       | Get all todos (user)      |
| PUT    | `/api/todo/:id`    | Update a todo             |
| DELETE | `/api/todo/:id`    | Delete a todo             |

  ** Home <img width="1898" height="910" alt="Screenshot 2025-10-11 200015" src="https://github.com/user-attachments/assets/8a8f9fe8-78fc-4a55-a750-a8df1cf7df8f" />

  ** signup <img width="1919" height="910" alt="Screenshot 2025-10-11 200028" src="https://github.com/user-attachments/assets/d07256fc-332d-4eb1-98b3-232341e39970" />

  ** signin <img width="1919" height="917" alt="Screenshot 2025-10-11 200040" src="https://github.com/user-attachments/assets/24da0588-3057-4b6e-b0e4-64f1c4f24e1b" />

  ** Todos <img width="1900" height="913" alt="Screenshot 2025-10-11 200102" src="https://github.com/user-attachments/assets/c79524b8-031c-4c8b-8fed-fdd835fd4f84" />


## 🧑‍💻 Author

- [Praveen Kumar](https://github.com/Praveen1116)

---

> **Made with ❤️ by Mr.Hyper**
