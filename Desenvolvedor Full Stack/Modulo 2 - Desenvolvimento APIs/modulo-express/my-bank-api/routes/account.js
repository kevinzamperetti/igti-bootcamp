import express from "express";
import { promises as fs, read } from "fs";

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        let account = req.body;
        const data = JSON.parse(await readFile(global.fileName));  //ler accounts.json com dados que já tenho
        
        account = { id: data.nextId, ...account } //coloca id como primeiro e pego demais atributos
        data.nextId++;  //incremento o id

        data.accounts.push(account);  //incluo novo registro no accounts.json existente
        await writeFile(global.fileName, JSON.stringify(data, null, 2));  //escrevo novo accounts.json

        res.send(account);  //retorno o usuário salvo com o id gerado
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));  //ler accounts.json com dados que já tenho
        delete data.nextId;  //retira o atributo nextId do accounts.json
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res,next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));  //ler accounts.json com dados que já tenho
        const account = data.accounts.find(account => account.id === parseInt(req.params.id));
        res.send(account);
    } catch (error) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));  //ler accounts.json com dados que já tenho
        data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id)); //retorna array sem o que eu quero remover
        writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.end();
    } catch (error) {
        next(err);
    }
});

router.put("/", async (req, res, next) => {
    try {
        let account = req.body;

        const data = JSON.parse(await readFile(global.fileName));  //ler accounts.json com dados que já tenho
        const index = data.accounts.findIndex(acc => acc.id === account.id);

        data.accounts[index] = account;
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);
    } catch (error) {
        next(err);
    }
});

router.patch("/update-balance", async (req, res, next) => {
    try {
        let account = req.body;

        const data = JSON.parse(await readFile(global.fileName));  //ler accounts.json com dados que já tenho
        const index = data.accounts.findIndex(acc => acc.id === account.id);

        data.accounts[index].balance = account.balance;
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(data.accounts[index]);
    } catch (error) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    console.log(err);
    res.status(400).send({ error: err.message })
})

export default router;