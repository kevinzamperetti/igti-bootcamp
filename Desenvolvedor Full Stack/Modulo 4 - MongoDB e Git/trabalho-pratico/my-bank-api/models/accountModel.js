import mongoose from 'mongoose';

//criação do modelo
const accountSchema = mongoose.Schema({
  agencia: {
    type: Number, 
    require: true
  },
  conta:  {
    type: Number, 
    require: true
  },
  name: {
    type: String, 
    require: true
  },
  balance: {
    type: Number, 
    require: true,
    validate(value){
      if (value <= 0){
        throw new Error('Valor informado inválido!')
      }
    }
  }
});

//definindo o modelo da coleção
const accountModel = mongoose.model('account', accountSchema, 'account');

export {accountModel};