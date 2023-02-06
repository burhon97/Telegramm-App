const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const postgres = require("pg");



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 4001;
const { Client } = postgres;

const messages = [];
const contactsList = [];
const registList = [];

const filePath = path.resolve("file", "message.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const oldMessages = data ? JSON.parse(data) : [];
  messages.push(...oldMessages);

});

app.get("/message-list", async (req, res) => {
  res.send(messages);
});

app.post("/message-save", async (req, res) => {
 
  messages.push({
    id: uuidv4(),
    text: req.body.text,
    sender: 1000,
    receiver: req.body.receiver,
  });

  fs.writeFile(filePath, JSON.stringify(messages), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send("Message saved!");
});

app.get("/messages/:idReceiver", (req, res) => {
  console.log(req.params.idReceiver);
  res.send();
});

/////////////////////////////---Contacts---/////////////////////////////////////////

fs.readFile("contacts.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const oldContacts = data ? JSON.parse(data) : [];
  contactsList.push(...oldContacts);

});

app.get("/contacts-save", async (req, res) => {
  contactsList.push({
    id: contactsList.length + 1,
    name: req.query.name,
    surname: req.query.surname,
    phoneNumber: req.query.phoneNumber,
  });
  fs.writeFile("contacts.txt", JSON.stringify(contactsList), (err, data) => {
    if (err) {
      console.log(err);
    }
  });
  res.send("contacts saved");
});

app.get("/contacts-list", async (req, res) => {
  res.send(contactsList);
});

///////////////REGISTRATION///////////////////////////////////////////////

fs.readFile("regist.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const oldRegists = data ? JSON.parse(data) : [];
  registList.push(...oldRegists);

});

app.post("/regist-save", async (req, res) => {
  // const client = new Client({
  //   host: "localhost",
  //   port: 5432,
  //   user: "postgres",
  //   password: "postgres1",
  //   database: "chatapp",
  // });
  // await client.connect();
  // await client.query(
  //   "INSERT INTO registration(name, password) VALUES($1, $2)",
  //   [req.body.name, req.body.password]
  // );
  // await client.end();

  registList.push({
    id: uuidv4(),
    name: req.body.name,
    password: req.body.password
  });
 
  fs.writeFile("regist.txt", JSON.stringify(registList), (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send("regist saved");
});

app.get("/regist-list", async (req, res) => {
  res.send(registList)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
