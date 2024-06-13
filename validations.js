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
exports.authMiddleware = exports.getDataFromAuthToken = exports.generateToken = exports.createUnsecuredInformation = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
        throw new Error("JWT secret key is not defined.");
    }
    return secret;
};
const saltRounds = 11;
const encryptPassword = (password) => bcrypt_1.default.hash(password, saltRounds);
exports.encryptPassword = encryptPassword;
const createUnsecuredInformation = (user) => ({
    username: user.username,
});
exports.createUnsecuredInformation = createUnsecuredInformation;
const generateToken = (user) => jsonwebtoken_1.default.sign((0, exports.createUnsecuredInformation)(user), getJwtSecret());
exports.generateToken = generateToken;
const jwtInfoSchema = zod_1.default.object({
    username: zod_1.default.string(),
    iat: zod_1.default.number(),
});
const getDataFromAuthToken = (token) => {
    if (!token)
        return null;
    try {
        return jwtInfoSchema.parse(jsonwebtoken_1.default.verify(token, getJwtSecret()));
    }
    catch (e) {
        console.error(e);
        return null;
    }
};
exports.getDataFromAuthToken = getDataFromAuthToken;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    //Jwt Handler
    const [, token] = ((_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split) === null || _b === void 0 ? void 0 : _b.call(_a, " ")) || [];
    const myJwtData = (0, exports.getDataFromAuthToken)(token);
    if (!myJwtData) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const userFromJwt = yield prisma.profile.findFirst({
        where: {
            username: myJwtData.username,
        },
    });
    if (!userFromJwt) {
        return res.status(401).json({ message: "User not found" });
    }
    req.profile = userFromJwt;
    next();
    //Jwt Handler End
});
exports.authMiddleware = authMiddleware;
