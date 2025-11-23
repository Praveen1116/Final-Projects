const { Router } = require('express');
const { userModel, purchaseModel, courseModel } = require('../db');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userMiddleware } = require('../middlewares/user');

const { JWT_USER_SECRET } = require('../config');

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(50)
                            .regex(/[A-Z]/, "Must contain atleast one uppercase")
                            .regex(/[a-z]/, "Must contain atleast one lowercase")
                            .regex(/[0-9]/, "Must contain atleast one number")
                            .regex(/[^A-Za-z0-9]/, "Must contain atleast one special character"),
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(50)
    })

    const parsedData = requiredBody.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message: "Incorrect format",
            errors: parsedData.error.errors
        });
        return;
    }

    const { email, password, firstName, lastName } = parsedData.data;

    const user = await userModel.findOne({ email });

    if(!user) {
        try {
            const hashedPassword = await bcrypt.hash(password, 12);

            await userModel.create({
                email, password: hashedPassword, firstName, lastName
            });

            res.status(201).json({
                message: "You are signed up!"
            });
        } catch(err) {
            res.status(500).json({
                message: "Server error"
            })
        }
    } else { 
        res.json({
            message: "You are already registered"
        });
    }
});

userRouter.post("/signin", async (req, res) => {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(50)
                            .regex(/[A-Z]/, "Must contain atleast one uppercase")
                            .regex(/[a-z]/, "Must contain atleast one lowercase")
                            .regex(/[0-9]/, "Must contain atleast one number")
                            .regex(/[^A-Za-z0-9]/, "Must contain atleast one special character")
    });

    const parsedData = requiredBody.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message: "Incorrect format",
            errors: parsedData.error.errors
        });
        return;
    }

    const { email, password } = parsedData.data;

    const user = await userModel.findOne({ email });

    if(user) {
        try {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch) {
                res.status(401).json({
                    message: "Incorrect email or password"
                });
                return;
            }

            const token = jwt.sign({
                id: user._id
            }, JWT_USER_SECRET);

            res.json({
                message: "You are signed in",
                token
            })
        } catch(err) {
            res.status(500).json({
                message: "Server error"
            })
        }
    } else {
        res.json({
            message: "You are not registered"
        });
    }
});

userRouter.get("/purchases", userMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        const purchases = await purchaseModel.find({ userId });
        let purchaseCourseIds = purchases.map(p => p.courseId);

        const courses = await courseModel.find({
            _id: { $in: purchaseCourseIds }
        });

        res.json({
            message: "Your courses",
            purchasedCourses: courses
        })
    } catch(err) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

userRouter.post("/purchase/:courseId", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.params.courseId;

    const course = await courseModel.findById(courseId);

    if(!course) {
        res.json({
            message: "Course not found"
        });
        return;
    }

    const alreadyPurchased = await purchaseModel.findOne({ userId, courseId });

    if(alreadyPurchased) {
        res.json({
            message: "Course already purchased"
        })
        return;
    }

    try {
        await purchaseModel.create({ userId, courseId });
        res.json({ message: "Course purchased" });
    } catch(err) {
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = {
    userRouter: userRouter
}