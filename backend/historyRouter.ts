import { Router } from "express";
import { client } from "./prismaClient";

const historyController = Router();

historyController.get("/bottleFeedingHistory", async (_req, res) => {
  const bottleFeedingHistory = await client.bottleFeedingHistory.findMany({
    orderBy: {
      childId: "asc",
    },
  });
  res.send(bottleFeedingHistory);
});
historyController.get("/breastFeedingHistory", async (_req, res) => {
  const breastFeedingHistory = await client.breastFeedingHistory.findMany({
    orderBy: {
      childId: "asc",
    },
  });
  res.send(breastFeedingHistory);
});
historyController.get("/mealHistory", async (_req, res) => {
  const eatingHistory = await client.mealHistory.findMany({
    orderBy: {
      childId: "asc",
    },
  });
  res.send(eatingHistory);
});
historyController.get("/diapersHistory", async (_req, res) => {
  const diapersHistory = await client.diapersHistory.findMany({
    orderBy: {
      childId: "asc",
    },
  });
  res.send(diapersHistory);
});
historyController.get("/illnessHistory", async (_req, res) => {
  const illnessHistory = await client.illnessHistory.findMany({
    orderBy: {
      childId: "asc",
    },
  });
  res.send(illnessHistory);
});
historyController.get("/napHistory", async (_req, res) => {
  const napHistory = await client.napHistory.findMany({
    orderBy: {
      childId: "asc",
    },
  });
  res.send(napHistory);
});

historyController.delete(`/IllnessHistory/:id`, async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({ message: "id should be a number" });
  }
  const deleteHistory = await Promise.resolve()
    .then(() => {
      return client.illnessHistory.delete({
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
});
historyController.delete(`/diapersHistory/:id`, async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({ message: "id should be a number" });
  }
  const deleteHistory = await Promise.resolve()
    .then(() => {
      return client.diapersHistory.delete({
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
});
historyController.delete(`/napHistory/:id`, async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({ message: "id should be a number" });
  }
  const deleteHistory = await Promise.resolve()
    .then(() => {
      return client.napHistory.delete({
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
});
historyController.delete(`/mealHistory/:id`, async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({ message: "id should be a number" });
  }
  const deleteHistory = await Promise.resolve()
    .then(() => {
      return client.mealHistory.delete({
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
});
historyController.delete(`/breastFeedingHistory/:id`, async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({ message: "id should be a number" });
  }
  const deleteHistory = await Promise.resolve()
    .then(() => {
      return client.breastFeedingHistory.delete({
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
});
historyController.delete(`/bottleFeedingHistory/:id`, async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({ message: "id should be a number" });
  }
  const deleteHistory = await Promise.resolve()
    .then(() => {
      return client.bottleFeedingHistory.delete({
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
});

historyController.post("/napHistory", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = ["time", "date", "lengthOfTime", "childId"];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.time !== "string") {
    errors.push("time should be a string");
  }
  if (typeof body.date !== "string") {
    errors.push("date should be a string");
  }
  if (typeof body.lengthOfTime !== "string") {
    errors.push("lengthOfTime should be a string");
  }
  if (typeof body.childId !== "number" || isNaN(body.childId)) {
    errors.push("childId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const history = await client.napHistory.create({
      data: {
        time: body.time,
        date: body.date,
        lengthOfTime: body.lengthOfTime,
        childId: body.childId,
      },
    });
    return res.status(201).send(history);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
historyController.post("/illnessHistory", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = [
    "time",
    "date",
    "symptoms",
    "medicationType",
    "dosage",
    "childId",
  ];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.time !== "string") {
    errors.push("time should be a string");
  }
  if (typeof body.date !== "string") {
    errors.push("date should be a string");
  }
  if (typeof body.symptoms !== "string") {
    errors.push("symptoms should be a string");
  }
  if (typeof body.medicationType !== "string") {
    errors.push("medicationType should be a string");
  }
  if (typeof body.dosage !== "string") {
    errors.push("dosage should be a string");
  }
  if (typeof body.childId !== "number" || isNaN(body.childId)) {
    errors.push("childId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const history = await client.illnessHistory.create({
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
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});

historyController.post("/diapersHistory", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = ["time", "date", "diaperType", "consistency", "childId"];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.time !== "string") {
    errors.push("time should be a string");
  }
  if (typeof body.date !== "string") {
    errors.push("date should be a string");
  }
  if (typeof body.diaperType !== "string") {
    errors.push("diaperType should be a string");
  }
  if (typeof body.consistency !== "string") {
    errors.push("consistency should be a string");
  }
  if (typeof body.childId !== "number" || isNaN(body.childId)) {
    errors.push("childId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const history = await client.diapersHistory.create({
      data: {
        time: body.time,
        date: body.date,
        diaperType: body.diaperType,
        consistency: body.consistency,
        childId: body.childId,
      },
    });
    return res.status(201).send(history);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
historyController.post("/mealHistory", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = ["time", "date", "drinkType", "foodType", "childId"];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.time !== "string") {
    errors.push("time should be a string");
  }
  if (typeof body.date !== "string") {
    errors.push("date should be a string");
  }
  if (typeof body.drinkType !== "string") {
    errors.push("drinkType should be a string");
  }
  if (typeof body.foodType !== "string") {
    errors.push("foodType should be a string");
  }

  if (typeof body.childId !== "number" || isNaN(body.childId)) {
    errors.push("childId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const history = await client.mealHistory.create({
      data: {
        time: body.time,
        date: body.date,
        drinkType: body.drinkType,
        foodType: body.foodType,
        childId: body.childId,
      },
    });
    return res.status(201).send(history);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
historyController.post("/breastFeedingHistory", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = ["time", "date", "feedingTimeLength", "childId"];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.time !== "string") {
    errors.push("time should be a string");
  }
  if (typeof body.date !== "string") {
    errors.push("date should be a string");
  }
  if (typeof body.feedingTimeLength !== "string") {
    errors.push("feedingTimeLength should be a string");
  }

  if (typeof body.childId !== "number" || isNaN(body.childId)) {
    errors.push("childId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const history = await client.breastFeedingHistory.create({
      data: {
        time: body.time,
        date: body.date,
        feedingTimeLength: body.feedingTimeLength,
        childId: body.childId,
      },
    });
    return res.status(201).send(history);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
historyController.post("/bottleFeedingHistory", async (req, res) => {
  const body = req.body;
  const errors: string[] = [];
  const validKeys = [
    "time",
    "date",
    "bottleQuantity",
    "bottleQuantityLeft",
    "childId",
  ];
  const inputKeys = Object.keys(body);

  // Check for invalid keys
  inputKeys.forEach((key) => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // Validate fields
  if (typeof body.time !== "string") {
    errors.push("time should be a string");
  }
  if (typeof body.date !== "string") {
    errors.push("date should be a string");
  }
  if (typeof body.bottleQuantity !== "string") {
    errors.push("bottleQuantity should be a string");
  }
  if (typeof body.bottleQuantityLeft !== "string") {
    errors.push("bottleQuantityLeft should be a string");
  }

  if (typeof body.childId !== "number" || isNaN(body.childId)) {
    errors.push("childId should be a number");
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  try {
    const history = await client.bottleFeedingHistory.create({
      data: {
        time: body.time,
        date: body.date,
        bottleQuantity: body.bottleQuantity,
        bottleQuantityLeft: body.bottleQuantityLeft,
        childId: body.childId,
      },
    });
    return res.status(201).send(history);
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
});

export { historyController };
