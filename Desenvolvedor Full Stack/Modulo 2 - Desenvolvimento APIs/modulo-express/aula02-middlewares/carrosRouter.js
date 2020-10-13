import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
    console.log("GET /carros");
    res.send("GET /carros");
});

router.get("/preco", (_req, res) => {
    console.log("GET /carros/preco");
    res.send("GET /carros/preco");
});


export default router;