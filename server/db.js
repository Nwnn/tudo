"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/todoDatabase', { useNewUrlParser: true });
// userスキーマ作成
var userSchema = new mongoose.Schema({
    name: String
});
// Userモデル作成
exports.UserModel = mongoose.model('user', userSchema);
// taskスキーマ作成
var taskSchema = new mongoose.Schema({
    name: String,
    startTime: mongoose.Schema.Types.Date,
    dueTime: mongoose.Schema.Types.Date,
    icon: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String,
    status: { type: mongoose.Schema.Types.Boolean, "default": false },
    createTime: { type: mongoose.Schema.Types.Date, "default": Date.now() },
    updateTime: { type: mongoose.Schema.Types.Date, "default": Date.now() },
    author: { type: mongoose.Schema.Types.ObjectId },
    member: { type: [mongoose.Schema.Types.ObjectId], "default": undefined }
});
// task
exports.TaskModel = mongoose.model('task', taskSchema);
