"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var express_1 = require("express");
// import express, { Router, Request } from 'express';
var body_parser_1 = require("body-parser");
var db_1 = require("./db");
// export const api = express.Router();
// api.use(bodyParser.json());
// api.use(bodyParser.urlencoded({extended: true}));
exports.api = express_1.Router();
exports.api.use(body_parser_1.json());
exports.api.use(body_parser_1.urlencoded({ extended: true }));
var User = /** @class */ (function () {
    function User(userDoc) {
        this.userDoc = userDoc;
    }
    User.getUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userDoc, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.UserModel.findOne({ id: userId })];
                    case 1:
                        userDoc = _a.sent();
                        if (userDoc !== null) {
                            user = new User(userDoc);
                            return [2 /*return*/, user];
                        }
                        else {
                            throw new Error("\u305D\u3093\u306A" + userId + "\u306F\u5B58\u5728\u3057\u307E\u305B\u3093");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.createTaskFromRequest = function (request) {
        var task = Task.createTaskFromRequest(request, this);
    };
    User.prototype.getTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, tasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.UserModel.aggregate().lookup({ from: 'task', localField: '_id', foreignField: 'author', as: 'tasks' }).match({ _id: this.userDoc._id })];
                    case 1:
                        user = (_a.sent())[0];
                        tasks = user.tasks;
                        return [2 /*return*/, tasks];
                }
            });
        });
    };
    return User;
}());
var Task = /** @class */ (function () {
    function Task(taskDoc) {
        this.taskDoc = taskDoc;
    }
    Task.createTaskFromRequest = function (request, user) {
        return __awaiter(this, void 0, void 0, function () {
            var taskDoc, task, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        taskDoc = new db_1.TaskModel();
                        taskDoc.name = request.body.name;
                        taskDoc.startTime = request.body.startTime;
                        taskDoc.icon = request.body.icon;
                        taskDoc.description = request.body.description;
                        taskDoc.dueTime = request.body.dueTime;
                        taskDoc.author = user.userDoc._id;
                        _a = Task.bind;
                        return [4 /*yield*/, taskDoc.save()];
                    case 1:
                        task = new (_a.apply(Task, [void 0, _b.sent()]))();
                        return [2 /*return*/, task];
                }
            });
        });
    };
    Task.prototype.changeStatus = function (status) {
        this.taskDoc.status = status;
        this.taskDoc.save();
    };
    Task.prototype.switchStatus = function () {
        this.changeStatus(!this.taskDoc.status);
    };
    Task.prototype.update = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        for (key in request) {
                            this.taskDoc[key] = request[key];
                        }
                        return [4 /*yield*/, this.taskDoc.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Task.getTaskById = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var taskDoc, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.TaskModel.findOne({ id: taskId })];
                    case 1:
                        taskDoc = _a.sent();
                        if (taskDoc !== null) {
                            task = new Task(taskDoc);
                            return [2 /*return*/, task];
                        }
                        else {
                            throw new Error("\u305D\u3093\u306A" + taskId + "\u306F\u5B58\u5728\u3057\u307E\u305B\u3093");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Task;
}());
// アプリ全体の実装
var TodoListApp = /** @class */ (function () {
    function TodoListApp() {
    }
    TodoListApp.prototype.getUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.getUserById(userId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    TodoListApp.prototype.getTask = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Task.getTaskById(taskId)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, task];
                }
            });
        });
    };
    return TodoListApp;
}());
var todoapp = new TodoListApp();
// api.get('/',(req, res) => {
//     res.json({message:"hello"});
// });
// タスク全件取得
exports.api.get('/tasks', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userId, user, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userId = undefined;
                return [4 /*yield*/, todoapp.getUser(userId)];
            case 1:
                user = _c.sent();
                _b = (_a = res).send;
                return [4 /*yield*/, user.getTasks()];
            case 2:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
// タスクの追加
exports.api.post('/task', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                console.log(userId);
                return [4 /*yield*/, todoapp.getUser(userId)];
            case 1:
                user = _a.sent();
                user.createTaskFromRequest(req);
                res.send();
                return [2 /*return*/];
        }
    });
}); });
// ユーザごとのタスク取得 
exports.api.get('/user/:userid/task', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userId, user, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userId = Number(req.params.userId);
                return [4 /*yield*/, todoapp.getUser(userId)];
            case 1:
                user = _c.sent();
                _b = (_a = res).send;
                return [4 /*yield*/, user.getTasks()];
            case 2:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
// チェック
exports.api.put('/check', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var taskId, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.body.taskId;
                return [4 /*yield*/, todoapp.getTask(taskId)];
            case 1:
                task = _a.sent();
                try {
                    task.switchStatus();
                    res.send();
                }
                catch (error) {
                    res.status(400).send(error);
                }
                return [2 /*return*/];
        }
    });
}); });
// 更新
exports.api.put('/task/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var taskId, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.body.taskId;
                return [4 /*yield*/, todoapp.getTask(taskId)];
            case 1:
                task = _a.sent();
                task.update(req.body);
                res.send();
                return [2 /*return*/];
        }
    });
}); });
