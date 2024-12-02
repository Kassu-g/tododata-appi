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
const User_1 = require("./models/User");
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const api1 = (0, express_1.default)();
const PORT = 3000;
const osote = 'mongodb://127.0.0.1:27017/testdb';
api1.use(body_parser_1.default.json());
api1.use(express_1.default.static('public'));
mongoose_1.default.connect(osote)
    .then(() => console.log('Toimiiko'))
    .catch(err => console.error('error:', err));
api1.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, todo } = req.body;
    try {
        let käyttis = yield User_1.User.findOne({ name });
        if (käyttis) {
            käyttis.todos.push({ todo });
        }
        else {
            käyttis = new User_1.User({ name, todos: [{ todo }] });
        }
        yield käyttis.save();
        res.send(`Todo added successfully for user ${name}.`);
    }
    catch (error) {
        res.status(500).send('Error saving todo');
    }
}));
api1.get('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const käyttäjä = yield User_1.User.findOne({ name: id }).exec();
        if (!käyttäjä) {
            return res.status(404).send('User not found');
        }
        res.json(käyttäjä.todos);
    }
    catch (error) {
        res.status(500).send('Error retrieving todos');
    }
}));
api1.listen(PORT, () => {
    console.log(`Täällä toimii http://localhost:${PORT}`);
});
