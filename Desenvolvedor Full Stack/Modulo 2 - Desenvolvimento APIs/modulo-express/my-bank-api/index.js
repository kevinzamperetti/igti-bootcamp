import express from "express";
import accountRouter from "./routes/account.js";
import {promises as fs} from "fs";

const {readFile, writeFile} = fs;
global.fileName = "accounts.json";

const app = express();
app.use(express.json());
app.use("/account", accountRouter);

//start api
app.listen(3000, async () => {
    try {
        await readFile(global.fileName);
        console.log("API iniciada.");
    } catch (error) {
        const initialJson = {
            nextId: 1,
            accounts: []
        };
        writeFile(global.fileName, JSON.stringify(initialJson))
        .then(() => console.log("API iniciada and File Created."))
        .catch(err => console.log(err))
    }
});