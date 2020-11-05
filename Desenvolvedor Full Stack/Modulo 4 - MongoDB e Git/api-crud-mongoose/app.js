import express from 'express';
import mongoose from 'mongoose';
import {studentRouter} from './routes/studentRouter.js'

//Conectar no Mongo DB Atlas pelo mongoose
(async () => {
  try {
    mongoose.connect(
      "mongodb+srv://admin:admin@bootcamp-igti.sry5e.mongodb.net/grades?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true })
      console.log("Conectado ao Banco de Dados com sucesso!");
  } catch (err) {
    console.log("Erro ao conectar ao Banco de Dados" + err);
  }
})();

const app = express();
app.use(express.json());
app.use(studentRouter);
app.listen(3000);
console.log('API Iniciada.')

