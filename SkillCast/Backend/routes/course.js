const { Router } = require('express');
const { courseModel } = require('../db');

const courseRouter = Router();

courseRouter.get("/preview", async (req, res) => {
    try {
        const courses = await courseModel.find({});
        res.json({ courses });
    } catch(err) {
        res.status(500).json({ message: "Server error" });
    }
});

courseRouter.get("/preview/:courseId", async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.courseId);

        if(!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
    } catch(err) {
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = {
    courseRouter: courseRouter
}