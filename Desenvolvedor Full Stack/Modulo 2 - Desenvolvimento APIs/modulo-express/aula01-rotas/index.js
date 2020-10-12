import express from "express";

const app = express();
app.use(express.json());

app.all("/testAll", (req, res) => {
    res.send(req.method);
});

//all
app.get("/teste?", (_req, res) => { //aceita o endpoint "/teste" e o "/test"
    res.send("/teste?");
});

//caracteres especiais
app.get("/buzz+", (_req, res) => { //aceita o endpoint "/buzz" ou "buzzz", quantos "z" quiser
    res.send("/buzz+");
});

app.get("/one*Blue", (_req, res) => { //aceita o endpoint com qualquer conteúdo no lugar do "*"
    res.send("/one*Blue");
});

app.post("/test(ing)?", (_req, res) => { //aceita o endpoint com "/test" ou "testing"
    res.send("/test(ing)?");
});

app.post("/test(ing)+", (_req, res) => { //aceita o endpoint com "/test" ou "testing" ou quantos "ing" quiser
    res.send("/test(ing)+");
});

app.get(/.*Red$/, (_req, res) => { //com expressão regula, qualquer coisa com Red vai aceitar
    res.send("/.*Red$/");
});

//parâmetros na rota
app.get("/testParam/:id", (req, res) => {
    res.send(req.params.id);
});

//parâmetros via query
app.get("/testQuery", (req, res) => {
    res.send(req.query);
});

//utilizando next
app.get("/testMultipleHandlers", (req, res, next) => {
    console.log("Callback 1");
    next();
}, (req, res) => {
    console.log("Callback 2");
    
    // pode retornar algo ou só finalizar
    // res.send("teste ok") 
    res.end();
});

//utilizando next com array
const callback1 = (req, res, next) => {
    console.log("Callback 1");
    next();
};

function callback2(req, res, next) {
    console.log("Callback 2");
    next();
}

const callback3 = (req, res) => {
    console.log("Callback 3");
    res.end();
};

app.get("/testMultipleHandlersArray", [callback1, callback2, callback3]);

//route
app.route("/testRoute")
    .get((req, res) => {
        res.send("Teste Route GET");
    })
    .post((req, res) => {
        res.send("Teste Route POST");
    })
    .put((req, res) => {
        res.send("Teste Route PUT");
    })
    .delete((req, res) => {
        res.send("Teste Route DELETE");
    })

//start api
app.listen(3000, () => {
    console.log("API iniciada.")
});