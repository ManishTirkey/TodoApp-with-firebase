// jshint esversion: 6
const express = require("express");
const bodyparser = require("body-parser");
const { DATE } = require(__dirname + "/date.js");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://TodoApp:TodoApp@todoappcluster.31drs.mongodb.net/TodoDB"
);

const TodoListSchema = new mongoose.Schema({
  name: String,
});

const ListsModel = new mongoose.model("Lists", TodoListSchema);

const today = DATE();

const app = express();

//--------------------ejs

app.set("view engine", "ejs");

//---------------------body-parser middelware
app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.json);

// --------------------------public
app.use(express.static("public"));

// var items = ["bravo", "yup"];
// var work_list = ["manisha", "manish"];

app.get("/", (req, res) => {
  ListsModel.find((err, items) => {
    // console.log(items);
    if (err) throw err;
    else {
      res.render("index", {
        date: today,
        items: items,
        LM: ListsModel,
      });
    }
  });
});

app.post("/", (req, res) => {
  const item = req.body.element;

  if (item) {
    const Item = new ListsModel({
      name: item,
    });
    Item.save();
    // items.push(item);
    res.redirect("/");
  }
});

app.post("/delete", (req, res) => {
  const item = req.body.item;
  ListsModel.deleteOne(
    {
      _id: item,
    },
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  res.redirect("/");
});

// ---------------------listining
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app
  .listen(port, (error) => {
    if (error) throw error;
    console.log(`server is listining at port: ${port}`);
  })
  .on("error", (e) => {
    console.log(`error occurs in server ${e}`);
  });
