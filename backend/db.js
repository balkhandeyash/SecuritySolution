const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://Yash:Yash@123@cluster0.mdcnw2v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    return client.db("UserData"); // Replace <dbname> with your database name
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
}

module.exports = connectDatabase;
