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
exports.profileController = void 0;
const express_1 = require("express");
const prismaClient_1 = require("./prismaClient");
const validations_1 = require("./validations");
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = __importDefault(require("zod"));
const profileController = (0, express_1.Router)();
exports.profileController = profileController;
profileController.get("/allProfileUsernames", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profileNames = yield prismaClient_1.client.profile.findMany({
        select: {
            username: true,
        },
    });
    res.send(profileNames);
}));
profileController.get("/profiles", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profiles = yield prismaClient_1.client.profile.findMany({
        orderBy: {
            username: "asc",
        },
    });
    res.send(profiles);
}));
profileController.get("/allProfileEmails", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profileEmails = yield prismaClient_1.client.profile.findMany({
        select: {
            email: true,
        },
    });
    res.send(profileEmails);
}));
profileController.get("/children", validations_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const [, token] = ((_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split) === null || _b === void 0 ? void 0 : _b.call(_a, " ")) || [];
    const myJwtData = (0, validations_1.getDataFromAuthToken)(token);
    if (!myJwtData) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const child = yield prismaClient_1.client.child.findMany({
        where: {
            profileUsername: myJwtData.username,
        },
    });
    res.send(child);
}));
profileController.get("/firstChild", validations_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const [, token] = ((_d = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split) === null || _d === void 0 ? void 0 : _d.call(_c, " ")) || [];
    const myJwtData = (0, validations_1.getDataFromAuthToken)(token);
    if (!myJwtData) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const child = yield Promise.resolve()
        .then(() => prismaClient_1.client.child.findFirst({
        where: {
            profileUsername: myJwtData.username,
        },
    }))
        .catch(() => {
        null;
    });
    if (child === null) {
        return res.status(204).send({ message: "First Child not found" });
    }
    return res.status(200).send(child);
}));
profileController.get("/profile", validations_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const [, token] = ((_f = (_e = req.headers.authorization) === null || _e === void 0 ? void 0 : _e.split) === null || _f === void 0 ? void 0 : _f.call(_e, " ")) || [];
    const myJwtData = (0, validations_1.getDataFromAuthToken)(token);
    if (!myJwtData) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const profile = yield Promise.resolve()
        .then(() => prismaClient_1.client.profile.findFirst({
        where: {
            username: myJwtData.username,
        },
    }))
        .catch(() => {
        null;
    });
    if (profile === null) {
        return res.status(204).send({ message: "Profile not found" });
    }
    return res.status(200).send(profile);
}));
profileController.post("/profiles", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.default.object({
        username: zod_1.default.string(),
        password: zod_1.default.string(),
        caregiver: zod_1.default.string(),
        email: zod_1.default.string().email(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const profile = yield prismaClient_1.client.profile.create({
            data: {
                username: body.username,
                password: yield (0, validations_1.encryptPassword)(body.password),
                caregiver: body.caregiver,
                email: body.email,
            },
        });
        return res.status(201).send(profile);
    }
    catch (err) {
        return res.status(500).send({ error: `Internal Server Error` });
    }
}));
profileController.post("/children", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.default.object({
        name: zod_1.default.string(),
        DOB: zod_1.default.string(),
        gender: zod_1.default.string(),
        weight: zod_1.default.string(),
        headSize: zod_1.default.string(),
        height: zod_1.default.string(),
        profileUsername: zod_1.default.string(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const child = yield prismaClient_1.client.child.create({
            data: {
                name: body.name,
                DOB: body.DOB,
                gender: body.gender,
                height: body.height,
                weight: body.weight,
                headSize: body.headSize,
                profileUsername: body.profileUsername,
            },
        });
        return res.status(201).send(child);
    }
    catch (err) {
        return res.status(500).send({ error: "Internal server error" });
    }
}));
profileController.get("/currentChild/:id", validations_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    const [, token] = ((_h = (_g = req.headers.authorization) === null || _g === void 0 ? void 0 : _g.split) === null || _h === void 0 ? void 0 : _h.call(_g, " ")) || [];
    const myJwtData = (0, validations_1.getDataFromAuthToken)(token);
    if (!myJwtData) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const currentChild = yield Promise.resolve()
        .then(() => prismaClient_1.client.child.findFirst({
        where: {
            profileUsername: myJwtData.username,
            id: +req.params.id,
        },
    }))
        .catch(() => {
        null;
    });
    if (currentChild === null) {
        return res.status(204).send({ message: "child not found" });
    }
    return res.status(200).send(currentChild);
}));
profileController.get("/firstChild/:id", validations_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    const [, token] = ((_k = (_j = req.headers.authorization) === null || _j === void 0 ? void 0 : _j.split) === null || _k === void 0 ? void 0 : _k.call(_j, " ")) || [];
    const myJwtData = (0, validations_1.getDataFromAuthToken)(token);
    if (!myJwtData) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const currentChild = yield Promise.resolve()
        .then(() => prismaClient_1.client.child.findFirst({
        where: {
            profileUsername: myJwtData.username,
        },
    }))
        .catch(() => {
        null;
    });
    if (currentChild === null) {
        return res.status(204).send({ message: "child not found" });
    }
    return res.status(200).send(currentChild);
}));
profileController.patch("/children/:id", validations_1.authMiddleware, (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.default.object({
        name: zod_1.default.string(),
        DOB: zod_1.default.string(),
        gender: zod_1.default.string(),
        weight: zod_1.default.string(),
        headSize: zod_1.default.string(),
        height: zod_1.default.string(),
        profileUsername: zod_1.default.string(),
    }),
}), (req, res) => {
    var _a, _b;
    const [, token] = ((_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split) === null || _b === void 0 ? void 0 : _b.call(_a, " ")) || [];
    const myJwtData = (0, validations_1.getDataFromAuthToken)(token);
    if (!myJwtData) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const body = req.body;
    const child = prismaClient_1.client.child
        .update({
        where: {
            id: +req.params.id,
            profileUsername: myJwtData.username,
        },
        data: {
            name: body.name,
            DOB: body.DOB,
            gender: body.gender,
            height: body.height,
            weight: body.weight,
            headSize: body.headSize,
            profileUsername: myJwtData.username,
        },
    })
        .catch(() => {
        null;
    });
    if (child === null) {
        return res.status(204).send({ message: "child not found" });
    }
    return res.status(200).send(child);
});
profileController.patch("/profile", validations_1.authMiddleware, (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.default.object({
        password: zod_1.default.string(),
        caregiver: zod_1.default.string(),
        email: zod_1.default.string().email(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    const [, token] = ((_m = (_l = req.headers.authorization) === null || _l === void 0 ? void 0 : _l.split) === null || _m === void 0 ? void 0 : _m.call(_l, " ")) || [];
    const myJwtData = (0, validations_1.getDataFromAuthToken)(token);
    if (!myJwtData) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const body = req.body;
    const profile = prismaClient_1.client.profile
        .update({
        where: {
            username: myJwtData.username,
        },
        data: {
            password: yield (0, validations_1.encryptPassword)(body.password),
            caregiver: body.caregiver,
            email: body.email,
        },
    })
        .catch(() => {
        null;
    });
    if (profile === null) {
        return res.status(204).send({ message: "Profile not found" });
    }
    return res.status(200).send(profile);
}));
