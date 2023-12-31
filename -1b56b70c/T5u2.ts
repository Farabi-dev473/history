import express from "express";
import randomNumberController from "./controllers/randomNumberController.js";

const app = express();
app.use(express.json());

app.get("/randomNumber", randomNumberController);

app.listen(4000, () => console.log("Server is listening on port 4000"));
