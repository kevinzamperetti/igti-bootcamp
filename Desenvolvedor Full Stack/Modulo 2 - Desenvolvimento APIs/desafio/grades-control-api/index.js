import express from "express";
import winston from "winston";
import { promises as fs } from "fs";
import gradeRouter from "./routes/grade.js";

const { readFile, writeFile } = fs;
global.fileName = "./data/grades.json";

//app use
const app = express();
app.use(express.json());
app.use("/grade", gradeRouter);

//logger
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
   level: "silly" ,
   transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "grades-control-api.log" }),
   ],
   format: combine(
       label({ label: "grades-control-api" }),
       timestamp(),
       myFormat
    )
});

app.listen(3001, async () => {
    try {
        await readFile(global.fileName);
        global.logger.info("API iniciada.");
    } catch (error) {
        const initialJson = {
            nextId: 1,
            grades: []
        };
        writeFile(global.fileName, JSON.stringify(initialJson))
    }
})