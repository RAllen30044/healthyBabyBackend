"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const historyRouter_1 = require("./historyRouter");
const authRouter_1 = require("./authRouter");
const profileRouter_1 = require("./profileRouter");
const PORT = process.env.PORT || '3000';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(authRouter_1.authController);
app.use(historyRouter_1.historyController);
app.use(profileRouter_1.profileController);
app.listen(PORT, () => {
    console.log(`
  🚀 Server ready at: http://localhost:${PORT}
  `);
});
