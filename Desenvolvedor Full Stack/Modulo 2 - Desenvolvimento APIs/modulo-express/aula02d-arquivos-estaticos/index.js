import express from "express";

const app = express();
app.use(express.json());

app.use(express.static("public"));  //localhost:300/logo.png
app.use("/images", express.static("public"));  //http://localhost:3000/images/logo.png

//start api
app.listen(3000, () => {
    console.log("API iniciada.")
});