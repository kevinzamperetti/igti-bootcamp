import mongoose from 'mongoose';

//criação do modelo
const studentSchema = mongoose.Schema({
  name: {
    type: String, 
    require: true
  },
  subject:  {
    type: String, 
    require: true
  },
  type: {
    type: String, 
    require: true
  },
  value: {
    type: Number, 
    require: true,
    validate(value){
      if (value === 0){
        throw new Error('Faltou informar o atributo name!')
      }
    }
  },
  last_updated: {
    type: Date, 
    default: Date.now()
  }
});

//definindo o modelo da coleção
const studentModel = mongoose.model('student', studentSchema, 'student');

export {studentModel};