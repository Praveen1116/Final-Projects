const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorId: { type: Schema.Types.ObjectId, ref: 'admin' }
});

const purchaseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    courseId: { type: Schema.Types.ObjectId, ref: 'course' } 
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}