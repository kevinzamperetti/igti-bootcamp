import mongoose from 'mongoose';

(async () => {
  try {
    mongoose.connect(
      "mongodb+srv://admin:admin@bootcamp-igti.sry5e.mongodb.net/sample_airbnb?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (err) {
    console.log("Erro ao conectar ao Mongo DB Atlas" + err);

  }
})();

//criação do modelo
  const listingsAndReviewsSchema = mongoose.Schema({
  name: {
    type: String, 
    require: true
  },
  summary:  {
    type: String, 
    require: true
  },
  description: {
    type: String, 
    require: true
  },
  last_review: {
    type: Date, 
    default: Date.now()
  }
});

//definindo o modelo da coleção
mongoose.model('listingsAndReviews', listingsAndReviewsSchema, 'listingsAndReviews');

//criação do objeto da collection listingsAndReviews
const listingsAndReviews = mongoose.model('listingsAndReviews');

new listingsAndReviews({
  name: "teste name",
  summary: "test summary",
  description: "test description"
}).save().then( () => console.log("Documento inserdido!")).catch((err) => console.log("Falha"));

