import express from "express";
import winston from "winston";
import accountRouter from "./routes/account.js";
import {promises as fs} from "fs";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc.js"

const {readFile, writeFile} = fs;
global.fileName = "accounts.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
   level: "silly" ,
   transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "my-bank-api.log" }),
   ],
   format: combine(
       label({ label: "my-bank-api" }),
       timestamp(),
       myFormat
    )
});

const app = express();
app.use(express.json());
app.use(cors());  //global, libera todas rotas
app.use(cors());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/account", accountRouter);

//start api
app.listen(3000, async () => {
    try {
        await readFile(global.fileName);
        global.logger.info("API iniciada.");
    } catch (error) {
        const initialJson = {
            nextId: 1,
            accounts: []
        };
        writeFile(global.fileName, JSON.stringify(initialJson))
        .then(() => global.logger.info("API iniciada and File Created."))
        .catch(err => global.logger.error(err))
    }
});