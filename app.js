const express = require("express"); // запуск бекенда
const logger = require("morgan"); // мидлвар который выводит в консоль инфо про запрос
const cors = require("cors"); // для коннекта фронта и бека
require("dotenv").config();


const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts"); // вставляем импорт из routs/api/contacts.js

const app = express(); // app - веб-сервер

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors()); // сокращенно Мидлвар(правило)
app.use(express.json()); // смотрит какой тип Контент-тайп (в Постмане) и если json,
// то строку переделывает на обьект
app.use(express.static("public")); //
app.use("/users", usersRouter);
app.use("/api/contacts", contactsRouter); 

// мидлвар, подходит любому адресу:
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  // res.status(500).json({ message: err.message })
  // заменяем на:
  console.log(status,message)
  res.status(status).json({ message, stack: err.stack });
});

module.exports = app;
