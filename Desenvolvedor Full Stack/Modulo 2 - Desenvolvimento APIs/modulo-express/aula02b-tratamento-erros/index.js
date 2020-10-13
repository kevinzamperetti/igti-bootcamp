import express from "express";

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    throw new Error("error...");
});

app.post("/", async (re, res, next) => {
    try {
        throw new Error("error async");
    } catch (err) {
        next(err);        
    }
});

app.use((err, req, res, next) => {
    console.log("Erro 1");
    next(err);
});

app.use((err, req, res, next) => {
    console.log("Erro 2");
    res.status(500).send("Ocorreu um erro. Tente novamente");
});

//start api
app.listen(3000, () => {
    console.log("API iniciada.")
});