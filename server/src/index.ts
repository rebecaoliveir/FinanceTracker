import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();
const port = 3100;

app.use(express.json());
app.use(cors());

const mongoURI: string =
"mongodb+srv://beca:701864@finances.rewpt.mongodb.net/"

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server Running on Port ${port}`);
});
