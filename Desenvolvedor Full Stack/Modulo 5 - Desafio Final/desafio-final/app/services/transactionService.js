import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
import TransactionModel from '../models/TransactionModel.js';

const create = async (req, res) => {
  const transaction = new TransactionModel({
    description: req.body.description,
    value: req.body.value,
    category: req.body.category,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    yearMonth: req.body.yearMonth,
    yearMonthDay: req.body.yearMonthDay,
    type: req.body.type
  });

  try {
    await transaction.save(transaction);

    res.send({ message: 'Transaction inserido com sucesso' });
    logger.info(`POST /api/transaction - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /api/transaction - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const description = req.query.description;

  //condicao para o filtro no findAll
  var condition = description
    ? { description: { $regex: new RegExp(description), $options: 'i' } }
    : {};

  try {
    const data = await TransactionModel.find(condition);

    res.send(data);
    logger.info(`GET /api/transaction`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /api/transaction - ${JSON.stringify(error.message)}`);
  }
};

const findById = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await TransactionModel.findById(id);

    if (data.length < 1) {
      res.status(404).send({ message: `Transaction do id ${id} não encontrado` });
    } else {
      res.send(data);
    }

    logger.info(`GET /api/transaction - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Transaction id: ' + id });
    logger.error(`GET /api/transaction - ${JSON.stringify(error.message)}`);
  }
}

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({message: 'Dados de atualização vazios!'});
  }

  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: `Transaction do id ${id} não encontrado para atualizar` });
    } else {
      res.send({ message: 'Transaction atualizado com sucesso' });
    }

    logger.info(`PUT /api/transaction - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Transaction id: ' + id });
    logger.error(`PUT /api/transaction - ${JSON.stringify(error.message)}`);
  }
}

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndRemove(id);

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: `Transaction do id ${id} não encontrado para exclusão` });
    } else {
      res.send({ message: 'Transaction excluído com sucesso' });
    }

    logger.info(`DELETE /api/transaction - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Não foi possível deletar o Transaction id: ' + id });
    logger.error(`DELETE /api/transaction - ${JSON.stringify(error.message)}`);
  }
}

export default {
  create,
  findAll,
  findById,
  update,
  remove
};