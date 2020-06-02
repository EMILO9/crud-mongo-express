const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const bodyParser = require("body-parser");
const cors = require("cors");
var morgan = require("morgan");

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  // res.sendFile(__dirname (this directory) + '/index.html')
  res.send("Here we can serve the index.html later.");
});

MongoClient.connect(
  "mongodb+srv://admin:idontknow123@crud-mongo-express-bcorw.mongodb.net/test?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("database");
    const postsCollection = db.collection("posts");

    app.post("/posts", (req, res) => {
      try {
        postsCollection.insertOne(req.body);
        res.send(req.body);
      } catch (err) {
        console.error(error);
      }
    });
    app.get("/posts", (req, res) => {
      try {
        postsCollection
          .find()
          .toArray()
          .then((result) => {
            res.send(result);
          });
      } catch (err) {
        console.error(err);
      }
    });
    app.put("/posts", (req, res) => {
      try {
        postsCollection.updateOne(
          { _id: req.body._id },
          { $set: { title: req.body.title, _id: req.body._id } }
        );
        res.send(req.body);
      } catch (err) {
        console.error(err);
      }
    });

    app.delete("/posts", (req, res) => {
      try {
        postsCollection.deleteOne(
          {"_id": objectId(req.body.id)}
       )
        res.send(req.body);
      } catch (err) {
        console.error(err);
      }
    });
  })
  .catch((error) => console.error(error));
