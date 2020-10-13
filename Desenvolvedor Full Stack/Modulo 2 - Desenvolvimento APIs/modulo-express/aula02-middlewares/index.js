import express from "express";
import carrosRouter from "./carrosRouter.js";

const app = express();
app.use(express.json());

app.use("/carros", carrosRouter);

app.use((_req, _res, next) => {
    console.log(new Date());
    next();
})

app.get("/teste", (req, res) => {
    res.send(req.method + " no /teste");
});


//start api
app.listen(3000, () => {
    console.log("API iniciada.")
});