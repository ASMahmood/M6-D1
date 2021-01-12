const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const articleRoute = require("./articles");

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());
server.use("/articles", articleRoute);

mongoose
  .connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("The server's power level is over ", port);
    })
  );
