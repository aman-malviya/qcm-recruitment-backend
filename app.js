const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//App
const app = express();

//View Engine
app.set("view engine", "ejs");

//Static Directory
app.use(express.static(__dirname + "/public"));

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));

//MongoDB setup
mongoose.connect(
  "mongodb+srv://aman-task-assign:qcmtask@cluster0.onajj.mongodb.net/qcm-backend-task?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model("User", userSchema);

const taskSchema = new mongoose.Schema({
  userName: String,
  task: String,
  taskStatus: String,
});
const Task = mongoose.model("Task", taskSchema);

app.get("/", function (req, res) {
  res.render("signup");
});
app.get("/tasks", function (req, res) {
  User.find({}, function (err, foundUsers) {
    if (err) {
      console.log(err);
    } else {
      res.render("task", { foundUsers: foundUsers });
    }
  });
});
app.post("/", function (req, res) {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  });
  newUser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.render("success");
    }
  });
});
app.post("/tasks", function (req, res) {
  const newTask = new Task({
    userName: req.body.username,
    task: req.body.task,
    taskStatus: req.body.taskStatus,
  });

  newTask.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.render("success");
    }
  });
});

//Listening to port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server has started");
});
