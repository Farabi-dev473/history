import dotenv from "dotenv";
import express from "express";
import randomNumberController from "./controllers/randomNumberController.js";
import userController from "./controllers/userController.js";

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;

app.get("/randomNumber", randomNumberController);
app.post("/fakeUser", userController);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
