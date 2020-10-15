import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

//criação
router.post("/", async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err);
    }
});

//atualização
router.put("/", async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err);
    }
});

//exclusão
router.delete("/", async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err);
    }
});

//consulta de notas
router.get("/", async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    res.status(400).send({ error: err.message })
})

export default router;