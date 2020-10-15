import express from "express";
import { promises as fs, read } from "fs";
import cors from "cors";

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        let account = req.body;

        if (!account.name || !account.balance == null) {
            throw new Error("Name e Balance são obrigatórios.");
        }

        const data = JSON.parse(await readFile(global.fileName));  //ler accounts.json com dados que já tenho
        
        account = { 
            id: data.nextId,
            name: account.name,
            balance: account.balance }
        data.nextId++;  //incremento o id

        data.accounts.push(account);  //incluo novo registro no accounts.json existente
        await writeFile(global.fileName, JSON.stringify(data, null, 2));  //escrevo novo accounts.json

        res.send(account);  //retorno o usuário salvo com o id gerado
        global.logger.info(`POST /account - ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
});

//router.get("/", cors(), async (req, res, next) => {  //cors liberando só este endpoint
router.get("/", async (req, res, next) => {  //cors liberando só este endpoint
    try {
        const data = JSON.parse(await readFile(global.fileName));  //ler accounts.json com dados que já tenho
        delete data.nextId;  //retira o atributo nextId do accounts.json
        res.send(data);
        global.logger.info(`GET /account`);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res,next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));  //ler accounts.json com dados que já tenho
        const account = data.accounts.find(account => account.id === parseInt(req.params.id));
        res.send(account);
        global.logger.info(`GET /account/:id (id: ${req.params.id})`);
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
        global.logger.info(`DELETE /account/:id (id: ${req.params.id})`);
    } catch (error) {
        next(err);
    }
});

router.put("/", async (req, res, next) => {
    try {
        let account = req.body;

        if (!account.id || !account.name || !account.balance == null) {
            throw new Error("Id, Name e Balance são obrigatórios.");
        }

        const data = JSON.parse(await readFile(global.fileName));  //ler accounts.json com dados que já tenho
        const index = data.accounts.findIndex(acc => acc.id === account.id);

        if (index === -1) {
            throw new Error("Id não encontrado.")
        }
        data.accounts[index].name = account.name;
        data.accounts[index].balance = account.balance;    
        
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);
        global.logger.info(`PUT /account - ${JSON.stringify(account)}`);
    } catch (error) {
        next(err);
    }
});

router.patch("/update-balance", async (req, res, next) => {
    try {
        let account = req.body;

        const data = JSON.parse(await readFile(global.fileName));  //ler accounts.json com dados que já tenho
        const index = data.accounts.findIndex(acc => acc.id === account.id);

        if (!account.id || account.balance == null) {
            throw new Error("Id e Balance são obrigatórios.");
        }

        if (index === -1) {
            throw new Error("Id não encontrado.")
        }

        data.accounts[index].balance = account.balance;
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(data.accounts[index]);
        global.logger.info(`PUT /account/update-balance - ${JSON.stringify(account)}`);
    } catch (error) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    global.logger.error(`Método: ${req.method} - BaseURL: ${req.baseUrl} - Erro: ${err.message} `);
    res.status(400).send({ error: err.message })
})

export default router;