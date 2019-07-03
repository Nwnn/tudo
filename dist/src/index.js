"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var api = express_1.default.Router();
api.get('/', function (req, res) {
    res.send('よ');
});
app.use('/api', api);
app.listen(80, function () {
    console.log('app listen');
});
