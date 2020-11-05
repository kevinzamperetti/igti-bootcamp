import express from 'express';
import mongoose from 'mongoose';
import {accountRouter} from './routes/accountRouter.js'

//Conectar no Mongo DB Atlas pelo mongoose
(async () => {
  try {
    mongoose.connect(
      "mongodb+srv://admin:admin@bootcamp-igti.sry5e.mongodb.net/my-bank-db?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true })
      console.log("Conectado ao Banco de Dados com sucesso!");
  } catch (err) {
    console.log("Erro ao conectar ao Banco de Dados" + err);
  }
})();

const app = express();
app.use(express.json());
app.use(accountRouter);
app.listen(3000);
console.log('API Iniciada.')
