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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const chai_1 = require("chai");
const database_1 = require("../src/database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Mock endpoints
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    (0, database_1.createUser)(username, password);
    res.status(201).send('User registered');
});
app.post('/login', (req, res) => {
    res.status(200).send('User logged in');
});
app.post('/logout', (req, res) => {
    res.status(200).send('User logged out');
});
describe('Authentication API', () => {
    it('should register a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/register').send({ username: 'testuser', password: 'testpass' });
        (0, chai_1.expect)(response.status).to.equal(201);
        (0, chai_1.expect)(response.text).to.equal('User registered');
    }));
    it('should login a user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app).post('/register').send({ username: 'testuser', password: 'testpass' });
        const response = yield (0, supertest_1.default)(app).post('/login').send({ username: 'testuser', password: 'testpass' });
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.text).to.equal('User logged in');
    }));
    it('should logout a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/logout');
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.text).to.equal('User logged out');
    }));
});
