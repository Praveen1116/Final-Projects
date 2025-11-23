# SkillCast

SkillCast is a platform for online course management, allowing admins to create and manage courses, and users to enroll and learn.

## Features

- **Admin Panel:** Add, update, and manage courses.
- **User Panel:** Sign up, sign in, enroll in courses, and track progress.
- **Course Management:** CRUD operations for courses.
- **Authentication:** Secure login/signup for admins and users.
- **Frontend:** Built with React and Vite.
- **Backend:** Node.js with Express and MongoDB.

## Folder Structure

```
SkillCast/
├── Backend/
│   ├── .env
│   ├── config.js
│   ├── db.js
│   ├── index.js
│   ├── middlewares/
│   ├── routes/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md
```

## Getting Started

### Backend

1. Install dependencies:
   ```
   cd Backend
   npm install
   ```
2. Set up your `.env` file with required environment variables.
3. Start the server:
   ```
   npm start
   ```

### Frontend

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```

## Environment Variables

Create a `.env` file in `Backend` with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
