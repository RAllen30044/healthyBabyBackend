import { Router } from "express";
import bcrypt from "bcrypt";
import z from "zod";
import { validateRequest } from "zod-express-middleware";
import { createUnsecuredInformation, generateToken } from "./validations";
import { client } from "./prismaClient";

const authController = Router();

authController.post(
  "/auth/login",
  validateRequest({
    body: z.object({
      username: z.string(),
      password: z.string(),
    }),
  }),
  async ({ body: { username: bodyUserName, password: bodyPassword } }, res) => {
    const user = await client.profile.findFirst({
      where: {
        username: bodyUserName,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(bodyPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "invalid Credentials" });
    }

    const userInformation = createUnsecuredInformation(user);
    const token = generateToken(user);

    return res.status(200).json({ token, userInformation });
  }
);

export { authController };
