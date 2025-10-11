const express = require('express');
const jwt = require('jsonwebtoken');
const { z, safeParse } = require('zod');
const path = require('path');
const { UserModel, TodoModel } = require('./db');
const bcrypt = require("bcrypt");
require('dotenv').config();

const { auth } = require('./auth');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const rateLimit = require('express-rate-limit');
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: "To many requests, try again later!" }
}));

app.use(express.static(path.join(__dirname, "public")));

const JWT_SECRET = process.env.JWT_SECRET;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/signup", async (req, res) => {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(50)
                            .regex(/[A-Z]/, "Must contain one uppercase letter")
                            .regex(/[a-z]/, "Must contain one lowercase letter")
                            .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
        name: z.string().min(2).max(50)
    });

    const parsedData = requiredBody.safeParse(req.body);

    if(!parsedData.success) {
        res.json({
            message: "Incorrect format",
            errors: parsedData.error.errors
        });
        return
    }

    const { email, password, name } = parsedData.data;

    const user = await UserModel.findOne({ email });

    if(!user) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.create({
                name: name,
                email: email,
                password: hashedPassword
                });

            res.json({
                message: "You are signed up"
            });
        } catch(err) {
            res.status(500).json({
                message: "Server error"
            });
        }
    } else {
        res.json({
            message: "User already registered"
        });
    }
});

app.post("/api/signin", async (req, res) => {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(50)
                            .regex(/[A-Z]/, "Must contain one uppercase letter")
                            .regex(/[a-z]/, "Must contain one lowercase letter")
                            .regex(/[^A-Za-z0-9]/, "Must contain one special character")
    });

    const parsedData = requiredBody.safeParse(req.body);

    if(!parsedData.success) {
        res.json({
            message: "Incorrect format",
            errors: parsedData.error.errors
        });
        return
    }

    const { email, password } = parsedData.data;

    const user = await UserModel.findOne({ email });

    if(user) {
        try {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch) {
                res.status(401).json({
                    message: "Incorrect emailId or password"
                });
                return
            }

            const token = jwt.sign({
                id: user._id.toString()
            }, JWT_SECRET);

            res.json({
                message: "You are signed in",
                token,
                name: user.name
            });
        } catch(err) {
            res.status(401).json({
                message: "Server error"
            });
        }
    } else {
        res.json({
            message: "You are not registered"
        });
    }
});

app.post("/api/todo", auth, async (req, res) => {
    const todoRequired = z.object({
        title: z.string().min(2),
        done: z.boolean()
    });

    const parsedData = todoRequired.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message: "Invalid input format",
            errors: parsedData.error.errors
        });
        return
    }

    const userId = req.userId;
    const { title, done } = parsedData.data;

    try {
        await TodoModel.create({
            userId,
            title,
            done
        });
        res.json({
            message: "A new todo created"
        });
    } catch (err) {
        res.status(500).json({ message: "Can't create todo" })
    }
});

app.get("/api/todos", auth, async (req, res) => {
    const userId = req.userId;

    try {
        const todos = await TodoModel.find({ userId }).populate("userId");
        res.json({ todos });
    } catch(err) {
        res.status(500).json({ message: "Can't fetch! Try after sometime" });
    }
});

app.put("/api/todo/:id", auth, async (req, res) => {
    const todoToUpdate = z.object({
        title: z.string().min(2).optional(),
        done: z.boolean().optional()
    });

    const parsedData = todoToUpdate.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message: "Invalid input format",
            errors: parsedData.error.errors
        });
        return
    }

    const todoId = req.params.id;
    const userId = req.userId;

    try {
        const updationTodo = await TodoModel.findOneAndUpdate(
            { _id: todoId, userId },
            parsedData.data,
            { new: true }
        );

        if(!updationTodo) {
            res.status(404).json({ message: "Todo not found" });
            return
        }

        res.json({
            message: "Todo updated!",
            todo: updationTodo
        })
    } catch(err) {
        res.status(500).json({ message: "Internal error to update todo" });
    }
});

app.delete("/api/todo/:id", auth, async (req, res) => {
    const userId = req.userId;
    const todoId = req.params.id;

    try {
        const todoToDelete = await TodoModel.findOneAndDelete(
            { _id: todoId, userId }
        );

        if(!todoToDelete) {
            res.status(404).json({ message: "Todo not found to delete" });
            return
        }

        res.json({ message: "Todo deleted" });
    } catch(err) {
        res.status(500).json({ message: "Internal error to delete todo" });
    }


})

app.listen(3000);