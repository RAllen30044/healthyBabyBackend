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
exports.historyController = void 0;
const express_1 = require("express");
const prismaClient_1 = require("./prismaClient");
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = __importDefault(require("zod"));
const historyController = (0, express_1.Router)();
exports.historyController = historyController;
historyController.get("/bottleFeedingHistory", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bottleFeedingHistory = yield prismaClient_1.client.bottleFeedingHistory.findMany({
        orderBy: {
            childId: "asc",
        },
    });
    res.send(bottleFeedingHistory);
}));
historyController.get("/breastFeedingHistory", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const breastFeedingHistory = yield prismaClient_1.client.breastFeedingHistory.findMany({
        orderBy: {
            childId: "asc",
        },
    });
    res.send(breastFeedingHistory);
}));
historyController.get("/mealHistory", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eatingHistory = yield prismaClient_1.client.mealHistory.findMany({
        orderBy: {
            childId: "asc",
        },
    });
    res.send(eatingHistory);
}));
historyController.get("/diapersHistory", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const diapersHistory = yield prismaClient_1.client.diapersHistory.findMany({
        orderBy: {
            childId: "asc",
        },
    });
    res.send(diapersHistory);
}));
historyController.get("/illnessHistory", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const illnessHistory = yield prismaClient_1.client.illnessHistory.findMany({
        orderBy: {
            childId: "asc",
        },
    });
    res.send(illnessHistory);
}));
historyController.get("/napHistory", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const napHistory = yield prismaClient_1.client.napHistory.findMany({
        orderBy: {
            childId: "asc",
        },
    });
    res.send(napHistory);
}));
historyController.delete(`/IllnessHistory/:id`, (0, zod_express_middleware_1.validateRequest)({
    params: zod_1.default.object({
        id: zod_1.default.number(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const deleteHistory = yield Promise.resolve()
        .then(() => {
        return prismaClient_1.client.illnessHistory.delete({
            where: {
                id,
            },
        });
    })
        .catch(() => null);
    if (deleteHistory === null) {
        return res.status(204).send({ message: `History not found` });
    }
    return res.status(200).send(deleteHistory);
}));
historyController.delete(`/diapersHistory/:id`, (0, zod_express_middleware_1.validateRequest)({
    params: zod_1.default.object({
        id: zod_1.default.number(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const deleteHistory = yield Promise.resolve()
        .then(() => {
        return prismaClient_1.client.diapersHistory.delete({
            where: {
                id,
            },
        });
    })
        .catch(() => null);
    if (deleteHistory === null) {
        return res.status(204).send({ message: `History not found` });
    }
    return res.status(200).send(deleteHistory);
}));
historyController.delete(`/napHistory/:id`, (0, zod_express_middleware_1.validateRequest)({
    params: zod_1.default.object({
        id: zod_1.default.number(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const deleteHistory = yield Promise.resolve()
        .then(() => {
        return prismaClient_1.client.napHistory.delete({
            where: {
                id,
            },
        });
    })
        .catch(() => null);
    if (deleteHistory === null) {
        return res.status(204).send({ message: `History not found` });
    }
    return res.status(200).send(deleteHistory);
}));
historyController.delete(`/mealHistory/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    if (isNaN(id)) {
        return res.status(400).send({ message: "id should be a number" });
    }
    const deleteHistory = yield Promise.resolve()
        .then(() => {
        return prismaClient_1.client.mealHistory.delete({
            where: {
                id,
            },
        });
    })
        .catch(() => null);
    if (deleteHistory === null) {
        return res.status(204).send({ message: `History not found` });
    }
    return res.status(200).send(deleteHistory);
}));
historyController.delete(`/breastFeedingHistory/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    if (isNaN(id)) {
        return res.status(400).send({ message: "id should be a number" });
    }
    const deleteHistory = yield Promise.resolve()
        .then(() => {
        return prismaClient_1.client.breastFeedingHistory.delete({
            where: {
                id,
            },
        });
    })
        .catch(() => null);
    if (deleteHistory === null) {
        return res.status(204).send({ message: `History not found` });
    }
    return res.status(200).send(deleteHistory);
}));
historyController.delete(`/bottleFeedingHistory/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    if (isNaN(id)) {
        return res.status(400).send({ message: "id should be a number" });
    }
    const deleteHistory = yield Promise.resolve()
        .then(() => {
        return prismaClient_1.client.bottleFeedingHistory.delete({
            where: {
                id,
            },
        });
    })
        .catch(() => null);
    if (deleteHistory === null) {
        return res.status(204).send({ message: `History not found` });
    }
    return res.status(200).send(deleteHistory);
}));
historyController.post("/napHistory", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.default.object({
        time: zod_1.default.string(),
        date: zod_1.default.string(),
        lengthOfTime: zod_1.default.string(),
        childId: zod_1.default.number(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const history = yield prismaClient_1.client.napHistory.create({
            data: {
                time: body.time,
                date: body.date,
                lengthOfTime: body.lengthOfTime,
                childId: body.childId,
            },
        });
        return res.status(201).send(history);
    }
    catch (err) {
        return res.status(500).send({ error: "Internal server error" });
    }
}));
historyController.post("/illnessHistory", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.default.object({
        time: zod_1.default.string(),
        date: zod_1.default.string(),
        symptoms: zod_1.default.string(),
        medicationType: zod_1.default.string(),
        dosage: zod_1.default.string(),
        childId: zod_1.default.number(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const history = yield prismaClient_1.client.illnessHistory.create({
            data: {
                time: body.time,
                date: body.date,
                symptoms: body.symptoms,
                medicationType: body.medicationType,
                dosage: body.dosage,
                childId: body.childId,
            },
        });
        return res.status(201).send(history);
    }
    catch (err) {
        return res.status(500).send({ error: "Internal server error" });
    }
}));
historyController.post("/diapersHistory", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.default.object({
        time: zod_1.default.string(),
        date: zod_1.default.string(),
        diaperType: zod_1.default.string(),
        consistency: zod_1.default.string(),
        childId: zod_1.default.number(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const history = yield prismaClient_1.client.diapersHistory.create({
            data: {
                time: body.time,
                date: body.date,
                diaperType: body.diaperType,
                consistency: body.consistency,
                childId: body.childId,
            },
        });
        return res.status(201).send(history);
    }
    catch (err) {
        return res.status(500).send({ error: "Internal server error" });
    }
}));
historyController.post("/mealHistory", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.default.object({
        time: zod_1.default.string(),
        date: zod_1.default.string(),
        drinkType: zod_1.default.string(),
        foodType: zod_1.default.string(),
        childId: zod_1.default.number(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const history = yield prismaClient_1.client.mealHistory.create({
            data: {
                time: body.time,
                date: body.date,
                drinkType: body.drinkType,
                foodType: body.foodType,
                childId: body.childId,
            },
        });
        return res.status(201).send(history);
    }
    catch (err) {
        return res.status(500).send({ error: "Internal server error" });
    }
}));
historyController.post("/breastFeedingHistory", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.default.object({
        time: zod_1.default.string(),
        date: zod_1.default.string(),
        feedingTimeLength: zod_1.default.string(),
        childId: zod_1.default.number(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const history = yield prismaClient_1.client.breastFeedingHistory.create({
            data: {
                time: body.time,
                date: body.date,
                feedingTimeLength: body.feedingTimeLength,
                childId: body.childId,
            },
        });
        return res.status(201).send(history);
    }
    catch (err) {
        return res.status(500).send({ error: "Internal server error" });
    }
}));
historyController.post("/bottleFeedingHistory", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.default.object({
        time: zod_1.default.string(),
        date: zod_1.default.string(),
        bottleQuantity: zod_1.default.string(),
        bottleQuantityLeft: zod_1.default.string(),
        childId: zod_1.default.number(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const history = yield prismaClient_1.client.bottleFeedingHistory.create({
            data: {
                time: body.time,
                date: body.date,
                bottleQuantity: body.bottleQuantity,
                bottleQuantityLeft: body.bottleQuantityLeft,
                childId: body.childId,
            },
        });
        return res.status(201).send(history);
    }
    catch (err) {
        return res.status(500).send({ error: "Internal server error" });
    }
}));
