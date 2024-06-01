import express from "express";

import cors from "cors";
import { historyController } from "./historyRouter";
import { authController } from "./authRouter";
import { profileController } from "./profileRouter";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(authController);
app.use(historyController);
app.use(profileController);

app.listen(PORT, () => {
  console.log(`
  🚀 Server ready at: http://localhost:${PORT}
  `);
});
