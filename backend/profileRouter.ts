import { Router } from "express";
import { client } from "./prismaClient";
import {
  authMiddleware,
  encryptPassword,
  getDataFromAuthToken,
} from "./validations";
import { validateRequest } from "zod-express-middleware";
import z from "zod";

const profileController = Router();

profileController.get("/allProfileUsernames", async (_req, res) => {
  const profileNames = await client.profile.findMany({
    select: {
      username: true,
    },
  });
  res.send(profileNames);
});
profileController.get("/profiles", async (_req, res) => {
  const profiles = await client.profile.findMany({
    orderBy: {
      username: "asc",
    },
  });
  res.send(profiles);
});
profileController.get("/allProfileEmails", async (_req, res) => {
  const profileEmails = await client.profile.findMany({
    select: {
      email: true,
    },
  });
  res.send(profileEmails);
});
profileController.get("/children", authMiddleware, async (req, res) => {
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);

  if (!myJwtData) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const child = await client.child.findMany({
    where: {
      profileUsername: myJwtData.username,
    },
  });
  res.send(child);
});

profileController.get("/firstChild", authMiddleware, async (req, res) => {
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);

  if (!myJwtData) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const child = await Promise.resolve()
    .then(() =>
      client.child.findFirst({
        where: {
          profileUsername: myJwtData.username,
        },
      })
    )
    .catch(() => {
      null;
    });
  if (child === null) {
    return res.status(204).send({ message: "First Child not found" });
  }
  return res.status(200).send(child);
});
profileController.get("/profile", authMiddleware, async (req, res) => {
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);

  if (!myJwtData) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const profile = await Promise.resolve()
    .then(() =>
      client.profile.findFirst({
        where: {
          username: myJwtData.username,
        },
      })
    )
    .catch(() => {
      null;
    });
  if (profile === null) {
    return res.status(204).send({ message: "Profile not found" });
  }
  return res.status(200).send(profile);
});

profileController.post(
  "/profiles",
  validateRequest({
    body: z.object({
      username: z.string(),
      password: z.string(),
      caregiver: z.string(),
      email: z.string().email(),
    }),
  }),
  async (req, res) => {
    const body = req.body;

    try {
      const profile = await client.profile.create({
        data: {
          username: body.username,
          password: await encryptPassword(body.password),
          caregiver: body.caregiver,
          email: body.email,
        },
      });
      return res.status(201).send(profile);
    } catch (err) {
      return res.status(500).send({ error: `Internal Server Error` });
    }
  }
);
profileController.post(
  "/children",
  validateRequest({
    body: z.object({
      name: z.string(),
      DOB: z.string(),
      gender: z.string(),
      weight: z.string(),
      headSize: z.string(),
      height: z.string(),
      profileUsername: z.string(),
    }),
  }),
  async (req, res) => {
    const body = req.body;

    try {
      const child = await client.child.create({
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
    } catch (err) {
      return res.status(500).send({ error: "Internal server error" });
    }
  }
);
profileController.get("/currentChild/:id", authMiddleware, async (req, res) => {
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);

  if (!myJwtData) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const currentChild = await Promise.resolve()
    .then(() =>
      client.child.findFirst({
        where: {
          profileUsername: myJwtData.username,
          id: +req.params.id,
        },
      })
    )
    .catch(() => {
      null;
    });
  if (currentChild === null) {
    return res.status(204).send({ message: "child not found" });
  }
  return res.status(200).send(currentChild);
});
profileController.get("/firstChild/:id", authMiddleware, async (req, res) => {
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);

  if (!myJwtData) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const currentChild = await Promise.resolve()
    .then(() =>
      client.child.findFirst({
        where: {
          profileUsername: myJwtData.username,
        },
      })
    )
    .catch(() => {
      null;
    });
  if (currentChild === null) {
    return res.status(204).send({ message: "child not found" });
  }
  return res.status(200).send(currentChild);
});

profileController.patch(
  "/children/:id",
  authMiddleware,
  validateRequest({
    body: z.object({
      name: z.string(),
      DOB: z.string(),
      gender: z.string(),
      weight: z.string(),
      headSize: z.string(),
      height: z.string(),
      profileUsername: z.string(),
    }),
  }),
  (req, res) => {
    const [, token] = req.headers.authorization?.split?.(" ") || [];
    const myJwtData = getDataFromAuthToken(token);
    if (!myJwtData) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const body = req.body;
    const child = client.child
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
  }
);
profileController.patch(
  "/profile",
  authMiddleware,
  validateRequest({
    body: z.object({
      password: z.string(),
      caregiver: z.string(),
      email: z.string().email(),
    }),
  }),
  async (req, res) => {
    const [, token] = req.headers.authorization?.split?.(" ") || [];
    const myJwtData = getDataFromAuthToken(token);
    if (!myJwtData) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const body = req.body;
    const profile = client.profile
      .update({
        where: {
          username: myJwtData.username,
        },
        data: {
          password: await encryptPassword(body.password),
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
  }
);

export { profileController };
