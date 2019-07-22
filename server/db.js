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
exports.__esModule = true;
// import mongoose, {Schema, Document, model, connect} from 'mongoose';
var mongoose = require("mongoose");
var bson_1 = require("bson");
mongoose.connect('mongodb://localhost:27017/todoDatabase', { useNewUrlParser: true });
// // User schema types
// interface UserDocument extends User, mongoose.Document{
//     name: string;
//     tasks:[String];
// }
// // Task schema types
// interface TaskDocument extends Task, mongoose.Document{
//     name: string;
//     startTime : Date;
//     dueTime : Date;
//     icon :string;
//     description : string;
//     status : boolean;
//     createTime : Date;
//     updateTime : Date | undefined;
// }
// // update types
// interface updateTaskDocument extends updateTask, mongoose.Document {
//     name : string | undefined;
//     startTime: Date | undefined;
//     dueTime : Date | undefined;
//     icon : string | undefined;
//     description : string | undefined;
//     status : boolean | undefined;
// }
// userスキーマ作成
var userSchema = new mongoose.Schema({
    name: String
});
// Userモデル作成
var User = mongoose.model('user', userSchema);
// user
// const user = new User();
// user.name = '田中';
// taskスキーマ作成
var taskSchema = new mongoose.Schema({
    name: String,
    startTime: mongoose.Schema.Types.Date,
    dueTime: mongoose.Schema.Types.Date,
    icon: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String,
    status: { type: mongoose.Schema.Types.Boolean, "default": false },
    createTime: { type: mongoose.Schema.Types.Date, "default": Date.now() },
    updateTime: { type: mongoose.Schema.Types.Date },
    usersId: { type: [mongoose.Schema.Types.ObjectId] }
});
// updateスキーマ作成
var updateSchema = new mongoose.Schema({
    updateTaskId: { type: mongoose.Schema.Types.ObjectId, "default": undefined },
    name: { type: String, "default": undefined },
    updateName: { type: String, "default": undefined },
    startTime: { type: Date, "default": undefined },
    dueTime: { type: Date, "default": undefined },
    icon: { type: String, "default": undefined },
    status: { type: Boolean, "default": undefined },
    description: { type: String, "default": undefined },
    usersId: { type: mongoose.Types.ObjectId }
});
var UpdateTasks = mongoose.model('update', updateSchema);
// task
var Task = mongoose.model('task', taskSchema);
var task = new Task();
task.name = "歯磨き";
task.createTime = new Date();
task.description = "徹底的に";
task.icon = "url";
// (async() => {
//     await user.save().then((resolve) => {
//         console.log("###resolve###\n",resolve);
//     }).catch((reject) => {
//         console.log("###rejects###\n",reject);
//     });
// })();
// (async() => {
//     await task.save().then((resolve) => {
//         console.log("#######resolve#####\n",resolve);
//     }).catch((reject) => {
//         console.log("###rejects#####\n",reject);
//     });
// })();
// abstract class DbController extends Document {
//     abstract docSave(): void;
// }
// class CreateUser extends DbController {
//     private userDoc : UserDocument;
//     constructor(userDoc: UserDocument) {
//         super();
//         this.userDoc = userDoc;
//     }
//     public docSave(): any {
//         this.userDoc.save().then((resolve) => {
//             return resolve;
//         }).catch((rejects) => {
//             return rejects;
//         });
//     }
// }
// class CreateTask extends DbController {
//     private taskDoc : TaskDocument;
//     constructor(taskDoc : TaskDocument) {
//         super();
//         this.taskDoc = taskDoc;
//     }
//     public docSave(): any {
//         this.taskDoc.save().then((resolve) => {
//             return resolve;
//         }).catch((rejects) => {
//             return rejects;
//         });
//     }
// }
var CreateUser = /** @class */ (function () {
    function CreateUser(userDoc) {
        // super();
        this.userDoc = userDoc;
    }
    CreateUser.prototype.saveDoc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var User, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        User = mongoose.model('user', userSchema);
                        user = new User();
                        user.name = this.userDoc.name;
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CreateUser;
}());
var CreateTask = /** @class */ (function () {
    function CreateTask(taskDoc) {
        // super();
        this.taskDoc = taskDoc;
    }
    CreateTask.prototype.saveDoc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Task, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Task = mongoose.model('task', taskSchema);
                        task = new Task();
                        task.name = this.taskDoc.name;
                        task.createTime = this.taskDoc.createTime;
                        task.dueTime = this.taskDoc.dueTime;
                        task.description = this.taskDoc.description;
                        task.icon = this.taskDoc.icon;
                        return [4 /*yield*/, task.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CreateTask;
}());
var TaskCheck = /** @class */ (function () {
    function TaskCheck(task) {
        // super();
        this.task = task;
    }
    TaskCheck.prototype.checkTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Task;
            return __generator(this, function (_a) {
                Task = mongoose.model('task', taskSchema);
                Task.findOne({ name: this.task.name }).then(function (resolve) {
                    if (resolve) {
                        var id = new bson_1.ObjectID(resolve._id);
                        Task.findById(id).then(function (resolve) {
                            if (resolve) {
                                resolve.status = true;
                                resolve.save().then(function (resolve) {
                                    console.log(resolve);
                                })["catch"](function (rejects) {
                                    console.log("saveできない");
                                });
                            }
                        })["catch"](function (rejects) {
                            console.log("そんなidのものはない");
                        });
                    }
                })["catch"](function (rejects) {
                    console.log("そんな名前のものはない");
                });
                return [2 /*return*/];
            });
        });
    };
    return TaskCheck;
}());
var UpdateTask = /** @class */ (function () {
    function UpdateTask(updateTask) {
        this.updateTask = updateTask;
    }
    UpdateTask.prototype.UpdateTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Task;
            var _this = this;
            return __generator(this, function (_a) {
                Task = mongoose.model('task', taskSchema);
                Task.findOne({ name: this.updateTask.name }).then(function (resolve) {
                    if (resolve) {
                        var task_1 = new Task(resolve);
                        var taskId = new bson_1.ObjectID(task_1._id);
                        Task.findById(taskId).then(function (resolve) {
                            if (resolve) {
                                if (_this.updateTask.icon) {
                                    resolve.icon = _this.updateTask.icon;
                                }
                                if (_this.updateTask.description) {
                                    resolve.description = _this.updateTask.description;
                                }
                                if (_this.updateTask.startTime) {
                                    resolve.startTime = _this.updateTask.startTime;
                                }
                                if (_this.updateTask.dueTime) {
                                    resolve.dueTime = _this.updateTask.dueTime;
                                }
                                if (_this.updateTask.userId) {
                                    // const userId = new ObjectID(this.updateTask.users)
                                    resolve.usersId.push(_this.updateTask.userId);
                                }
                                if (_this.updateTask.updateName) {
                                    resolve.name = _this.updateTask.updateName;
                                }
                                if (_this.updateTask.status === true) {
                                    resolve.status = true;
                                }
                                _this.updateTask.updateTaskId = resolve._id;
                                (function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.updateTask.save().then(function (resolve) {
                                                    console.log("###resolve###\nupdate保存した\n", resolve);
                                                })["catch"](function (rejects) {
                                                    console.log("###rejects###\nupdate保存できなかった\n", rejects);
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })();
                                resolve.updateTime = new Date();
                                (function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, resolve.save().then(function (resolve) {
                                                    console.log("###taskに保存した###", resolve);
                                                })["catch"](function (rejects) {
                                                    console.log("保存できないぞ\n", rejects);
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })();
                            }
                        })["catch"](function (rejects) {
                            console.log("そんなidのタスクは無い");
                        });
                    }
                })["catch"](function (rejects) {
                    console.log("そんな名前のタスクはない");
                });
                return [2 /*return*/];
            });
        });
    };
    return UpdateTask;
}());
var GetTaskByUserName = /** @class */ (function () {
    function GetTaskByUserName(userName) {
        this.userName = userName;
    }
    GetTaskByUserName.prototype.getTaskByUserName = function () {
        var _this = this;
        User.findOne({ name: this.userName }).then(function (resolve) {
            if (resolve) {
                var userId = resolve._id;
                Task.aggregate().lookup({ from: 'users', localField: 'usersId', foreignField: '_id', as: 'users' }).then(function (resolve) {
                    resolve.forEach(function (task) {
                        task.users.forEach(function (user) {
                            if (user.name === _this.userName) {
                                console.log(task.name);
                            }
                        });
                    });
                })["catch"](function (rejects) {
                    console.log("###rejects###\n", rejects);
                });
            }
        })["catch"](function (rejects) {
            console.log("###rejects###\n", rejects);
        });
    };
    return GetTaskByUserName;
}());
var RegistrationTaskToUser = /** @class */ (function () {
    function RegistrationTaskToUser(userName, taskName) {
        this.userName = userName;
        this.taskName = taskName;
    }
    RegistrationTaskToUser.prototype.registration = function () {
        var _this = this;
        var updateData = new UpdateTasks();
        User.findOne({ name: this.userName }).then(function (resolve) {
            if (resolve) {
                updateData.userId = resolve._id;
                var userId = new bson_1.ObjectID(updateData.userId);
                Task.findOne({ name: _this.taskName }).then((function (resolve) {
                    if (resolve && updateData.userId) {
                        resolve.usersId.push(updateData.userId);
                        resolve.save().then(function (resolve) {
                            console.log("###resolve###\n保存できた", resolve);
                        })["catch"](function (rejects) {
                            console.log("###rejects###\n保存できなかった", rejects);
                        });
                    }
                }))["catch"](function (rejects) {
                    console.log("###rejects###\nそんな名前のtaskは無い", rejects);
                });
            }
        })["catch"](function (rejects) {
            console.log("###rejects###\nそんな名前の人はいない", rejects);
        });
    };
    return RegistrationTaskToUser;
}());
var get = new GetTaskByUserName('佐藤');
// get.getTaskByUserName()
var updatetask = new UpdateTasks();
updatetask.name = "家の掃除";
updatetask.description = "ちゃんとやりなさい";
updatetask.icon = "url変えた";
updatetask.status = true;
// const update = new UpdateTask(updatetask);
// update.UpdateTask();
var user1 = new User();
user1.name = "斎藤";
var createUser = new CreateUser(user1);
// createUser.saveDoc();
var task1 = new Task();
task1.name = "洗濯";
task1.createTime = new Date();
task1.description = "徹底的に";
task1.icon = "url";
var createTask = new CreateTask(task1);
// createTask.saveDoc();
var getTaskByUserName = new GetTaskByUserName('佐藤');
getTaskByUserName.getTaskByUserName();
var registrationTaskToUser = new RegistrationTaskToUser('佐藤', "庭の草取り");
// registrationTaskToUser.registration();
// const update: updateTaskDocument = {icon : "urlsssss",startTime : new Date(2022,11,23)};
// const updateTask = new UpdateTask(update);
