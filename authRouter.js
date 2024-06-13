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
exports.authController = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = __importDefault(require("zod"));
const zod_express_middleware_1 = require("zod-express-middleware");
const validations_1 = require("./validations");
const prismaClient_1 = require("./prismaClient");
const authController = (0, express_1.Router)();
exports.authController = authController;
authController.post("/auth/login", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.default.object({
        username: zod_1.default.string(),
        password: zod_1.default.string(),
    }),
}), (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ body: { username: bodyUserName, password: bodyPassword } }, res) {
    const user = yield prismaClient_1.client.profile.findFirst({
        where: {
            username: bodyUserName,
        },
    });
    if (!user) {
        return res.status(404).send({ message: "User Not found" });
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(bodyPassword, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "invalid Credentials" });
    }
    const userInformation = (0, validations_1.createUnsecuredInformation)(user);
    const token = (0, validations_1.generateToken)(user);
    return res.status(200).json({ token, userInformation });
}));
