require("dotenv").config();
const express = require("express");
const http = require("http");
const createSocket = require("./socket/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiRouter = require("./routes");
const dataBase = require("./db/index.js");
const errorMiddleware = require("./middlewares/error-middelware.js");

const app = express();
const httpServer = http.createServer(app);
global.io = createSocket(httpServer);

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use("/api", apiRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT ?? 4000;

const serverStart = async () => {
  try {
    await dataBase.sync({ alter: true });
    httpServer.listen(PORT, () =>
      console.log(`Сервер начал работу на порте ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

serverStart();
