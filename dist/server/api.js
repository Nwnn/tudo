"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
exports.api = express_1.default.Router();
exports.api.use(body_parser_1.default.json());
exports.api.get('/', function (req, res) {
    res.send({
        name: "作業",
        time: new Date(),
    });
});
