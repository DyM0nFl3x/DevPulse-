import cors from "cors";
import express, { type Application } from "express";
import { authRoute } from "./modules/auth/auth.route";
import { issueRoute } from "./modules/issues/issue.route";
import { sendResponse } from "./utility/response";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  sendResponse(res, 200, {
    message: "Welcome to DevPulse",
  });

   sendResponse(res, 200, {
    message: "Welcome to DevPulse😎",
    });
});


app.use("/api/auth", authRoute);
app.use("/api/issues", issueRoute);


export default app;
