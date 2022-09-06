const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const postgres = require("pg");
const { connect } = require("http2");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
type Query {
  quoteOfTheDay: String
  random: Float!
  rollThreeDice: [Int]
}
`);
const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6));
  },
};

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
const port = 3001;
const { Client } = postgres;

const messages = [];
const contactsList = [];

const filePath = path.resolve("file", "message.txt");



app.get("/message-list", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres1",
    database: "chatapp",
  });
  await client.connect();
  const result = await client.query("SELECT * FROM message");
  await client.end();

  res.send(result.rows);
});

app.post("/message-save", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres1",
    database: "chatapp",
  });
  await client.connect();
  await client.query(
    "INSERT INTO message(text, sender, receiver) VALUES($1, $2, $3)",
    [req.body.text, req.body.sender, req.body.receiver]
  );
  await client.end();
  // messages.push({
  //   id: uuidv4(),
  //   text: req.body.text,
  //   sender: 1000,
  //   receiver: req.body.receiver,
  // });
  // // console.log(req.body);
  // // res.send(req.bady);
  // fs.writeFile(filePath, JSON.stringify(messages), (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });

  res.send("Message saved!");
});

app.get("/messages/:idReceiver", (req, res) => {
  console.log(req.params.idReceiver);
  res.send();
});

/////////////////////////////---Contacts---/////////////////////////////////////////

// fs.readFile("contacts.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   const oldContacts = data ? JSON.parse(data) : [];
//   contactsList.push(...oldContacts);

// });

app.get("/contacts-save", async (req, res) => {
  // contactsList.push({
  //   id: contactsList.length + 1,
  //   name: req.query.name,
  //   surname: req.query.surname,
  //   phoneNumber: req.query.phoneNumber,
  // });
  // fs.writeFile("contacts.txt", JSON.stringify(contactsList), (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });

  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres1",
    database: "chatapp",
  });
  await client.connect();
  await client.query(
    "INSERT INTO contact(name, surname, phonenumber)VALUES($1, $2, $3)",
    [req.query.name, req.query.surname, req.query.phonenumber]
  );
  await client.end();
  res.send("contacts saved");
});

app.get("/contacts-list", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres1",
    database: "chatapp",
  });
  await client.connect();
  const result = await client.query("SELECT * FROM contact");
  await client.end();

  res.send(result.rows);
});

///////////////REGISTRATION///////////////////////////////////////////////

app.post("/regist-save", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres1",
    database: "chatapp",
  });
  await client.connect();
  await client.query(
    "INSERT INTO registration(name, password) VALUES($1, $2)",
    [req.body.name, req.body.password]
  );
  await client.end();

  res.send("regist saved");
});

app.get("/regist-list", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres1",
    database: "chatapp",
  });
  await client.connect();
  const result = await client.query("SELECT * FROM registration");
  await client.end();

  res.send(result.rows);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
