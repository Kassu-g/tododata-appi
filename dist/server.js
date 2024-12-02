"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./models/User");
const api1 = (0, express_1.default)();
const PORT = 3000;
const osote = 'mongodb://127.0.0.1:27017/testdb';
api1.use(body_parser_1.default.json());
api1.use(express_1.default.static('public'));
mongoose_1.default.connect(osote)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
api1.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, todo } = req.body;
    try {
        let user = yield User_1.User.findOne({ name });
        if (user) {
            user.todos.push({ todo });
        }
        else {
            user = new User_1.User({ name, todos: [{ todo }] });
        }
        yield user.save();
        res.send(`Todo added successfully for user ${name}.`);
    }
    catch (error) {
        res.status(500).send('Error saving todo');
    }
}));
api1.listen(PORT, () => {
    console.log(`Täällä toimii http://localhost:${PORT}`);
});
