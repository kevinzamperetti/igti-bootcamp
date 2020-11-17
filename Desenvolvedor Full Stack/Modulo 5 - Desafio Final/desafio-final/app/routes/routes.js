import express from 'express';
import transactionService from '../services/transactionService.js';

const app = express();

app.post('/api/transaction', transactionService.create);
app.get('/api/transaction', transactionService.findAll);

app.get('/api/transaction/:id', transactionService.findById);
app.put('/api/transaction/:id', transactionService.update);
app.delete('/api/transaction/:id', transactionService.remove);

export { app as transactionRouter };
