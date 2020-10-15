import express from "express";
import { promises as fs } from "fs";
import gradeRouter from "./routes/grade.js";

const { readFile, writeFile } = fs;
global.fileName = "./data/grades.json";

//app use
const app = express();
app.use(express.json());
app.use("/grade", gradeRouter);


app.listen(3001, async () => {
    try {
        await readFile(global.fileName);  //leio o grades.js
        console.log("API iniciada!");
    } catch (error) {
        const initialJson = {
            nextId: 1,
            grades: []
        };
        writeFile(global.fileName, JSON.stringify(initialJson))
    }
})