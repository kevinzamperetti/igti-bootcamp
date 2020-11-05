
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:admin@bootcamp-igti.sry5e.mongodb.net/<dbname>?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
  const collection = client.db("sample_airbnb").collection("listingsAndReviews");
  
  // const result = await collection.find().limit(2).toArray();
  // console.log(result);

  const databaseList = await client.db().admin().listDatabases();
  databaseList.databases.forEach(db => {
    console.log(`database_name: ${db.name}`);

  });

  client.close();
});
