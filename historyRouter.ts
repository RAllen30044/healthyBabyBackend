import { Router } from "express";
import { client } from "./prismaClient";
import { validateRequest, validateRequestParams } from "zod-express-middleware";
import z from "zod";
import { time } from "console";

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

historyController.delete(
  `/IllnessHistory/:id`,
  validateRequest({
    params: z.object({
      id: z.number(),
    }),
  }),
  async (req, res) => {
    const id = +req.params.id;

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
  }
);
historyController.delete(
  `/diapersHistory/:id`,
  validateRequest({
    params: z.object({
      id: z.number(),
    }),
  }),
  async (req, res) => {
    const id = +req.params.id;

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
  }
);
historyController.delete(
  `/napHistory/:id`,
  validateRequest({
    params: z.object({
      id: z.number(),
    }),
  }),
  async (req, res) => {
    const id = +req.params.id;

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
  }
);
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

historyController.post(
  "/napHistory",
  validateRequest({
    body: z.object({
      time: z.string(),
      date: z.string(),
      lengthOfTime: z.string(),
      childId: z.number(),
    }),
  }),
  async (req, res) => {
    const body = req.body;

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
  }
);
historyController.post(
  "/illnessHistory",
  validateRequest({
    body: z.object({
      time: z.string(),
      date: z.string(),
      symptoms: z.string(),
      medicationType: z.string(),
      dosage: z.string(),
      childId: z.number(),
    }),
  }),
  async (req, res) => {
    const body = req.body;

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
  }
);

historyController.post(
  "/diapersHistory",
  validateRequest({
    body: z.object({
      time: z.string(),
      date: z.string(),
      diaperType: z.string(),
      consistency: z.string(),
      childId: z.number(),
    }),
  }),
  async (req, res) => {
    const body = req.body;

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
  }
);
historyController.post(
  "/mealHistory",
  validateRequest({
    body: z.object({
      time: z.string(),
      date: z.string(),
      drinkType: z.string(),
      foodType: z.string(),
      childId: z.number(),
    }),
  }),
  async (req, res) => {
    const body = req.body;

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
  }
);
historyController.post(
  "/breastFeedingHistory",
  validateRequest({
    body: z.object({
      time: z.string(),
      date: z.string(),
      feedingTimeLength: z.string(),
      childId: z.number(),
    }),
  }),
  async (req, res) => {
    const body = req.body;

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
  }
);
historyController.post(
  "/bottleFeedingHistory",
  validateRequest({
    body: z.object({
      time: z.string(),
      date: z.string(),
      bottleQuantity: z.string(),
      bottleQuantityLeft: z.string(),
      childId: z.number(),
    }),
  }),
  async (req, res) => {
    const body = req.body;

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
  }
);

export { historyController };
