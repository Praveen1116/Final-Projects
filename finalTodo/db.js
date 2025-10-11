const mongoose = require('mongoose');
const { email } = require('zod');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const User = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
});

const Todo = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    title: String,
    done: Boolean
});

Todo.index({ userId: 1 });

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model("todos", Todo);

module.exports = {
    UserModel,
    TodoModel
}