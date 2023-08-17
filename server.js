// const app = require('./app')

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });

const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

// console.log(process.env.DB_HOST);

mongoose.set("strictQuery", true);
// const PORT = 3000;
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
