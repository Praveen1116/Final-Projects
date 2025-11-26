const { Router } = require('express');
const { adminModel, courseModel } = require('../db');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { adminMiddleware } = require('../middlewares/admin');

const { JWT_ADMIN_SECRET } = require('../config');
const { required } = require('zod/mini');

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
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

    const admin = await adminModel.findOne({ email });

    if(!admin) {
        try {
            const hashedPassword = await bcrypt.hash(password, 12);

            await adminModel.create({
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

adminRouter.post("/signin", async (req, res) => {
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

    const admin = await adminModel.findOne({ email });

    if(admin) {
        try {
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if(!passwordMatch) {
                res.status(401).json({
                    message: "Incorrect email or password"
                });
                return;
            }

            const token = jwt.sign({
                id: admin._id
            }, JWT_ADMIN_SECRET);

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

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;

    const requiredBody = z.object({
        title: z.string().min(2).max(30),
        description: z.string().min(5).max(200),
        price: z.number(),
        imageURL: z.string().url(),
    });

    const parsedData = requiredBody.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message: "Write proper details"
        })
        return;
    }

    const { title, description, price, imageURL } = parsedData.data;

    const course = await courseModel.findOne({ title });

    if(!course) {
        try {
            await courseModel.create({ title, description, price, imageURL, creatorId: adminId });

            res.status(201).json({
                message: "Course added"
            });
        } catch(err) {
            res.status(500).json({
                message: "Issue in adding course"
            });
        }
    } else {
        res.json({
            message: "Duplicate course"
        });
    }
});

adminRouter.put("/course/:courseId", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    const courseId = req.params.courseId;

    const requiredBody = z.object({
        title: z.string().min(2).max(30),
        description: z.string().min(5).max(200),
        price: z.number(),
        imageURL: z.string().url(),
    });

    const parsedData = requiredBody.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message: "Update proper details"
        })
        return;
    }

    const course = await courseModel.findById(courseId);

    if(!course) {
        res.status(404).json({
            message: "Course not found"
        });
        return;
    }

    if(course.creatorId.toString() !== adminId) {
        res.status(403).json({
            message: "You are not an authorized person to update this course"
        });
        return;
    }

    try {
        await courseModel.findByIdAndUpdate(courseId, parsedData.data, { new: true });
        res.status(201).json({
            message: "Course updated!"
        })
    } catch(err) {
        res.json({
            message: "Issue in updating the items"
        })
    }
});

adminRouter.delete("/course/:courseId", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    const courseId = req.params.courseId;

    const course = await courseModel.findById(courseId);

    if(!course) {
        res.status(404).json({
            message: "Course not found"
        });
        return;
    }

    if(course.creatorId.toString() !== adminId) {
        res.status(403).json({
            message: "You are not an authorized person to delete this course"
        });
        return;
    }

    try {
        await courseModel.findByIdAndDelete(courseId);
        res.status(200).json({
            message: "Course deleted!"
        })
    } catch(err) {
        res.json({
            message: "Issue in deleting the items"
        })
    }
})

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;

    try {
        const courses = await courseModel.find({ creatorId: adminId });

        res.json({
            message: "Courses created by you",
            courses: courses
        })
    } catch(err) {
        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = {
    adminRouter: adminRouter
}
