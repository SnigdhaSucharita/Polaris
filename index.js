import express from "express";
import fs from "fs";
import { fileRouter } from "./src/router/fileRouter.js";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use(cors());

app.use(express.json());

app.use("/", (req, res) => {
    res.send("Welcome to file/image upload");
});

app.use("/files", fileRouter);

app.use("/src/uploads", express.static("src/uploads"));

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});