require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const http = require("http");
const connectMongo = require("./utils/db");
const HTTPSTATUSCODE = require("./utils/httpStatusCode");
const countriesRouter = require("./src/routes/countries.routes");
const functions = require("firebase-functions");
const { Functions } = require("firebase-admin/functions");
const app = express();
const server = http.createServer(app);

connectMongo();

app.use(
  cors({
    origin: ["https://countryfacts365.netlify.app", "http://localhost:4200"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(mongoSanitize());

/* ROUTES */

app.use("/factmap", countriesRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bienvenidos al servidor",
    app: "FactMap",
  });
});

// Manejo de errores
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error("Error en la aplicación:", err);
  res.status(err.status || 500).json({
    message: err.message || "Unexpected error",
  });
});

app.disable("x-powered-by");

// const CUSTOM_PORT = process.env.CUSTOM_PORT || 3000;
// server.listen(CUSTOM_PORT, () => {
//   console.log(`La app está corriendo en el servidor ${CUSTOM_PORT}`);
// });

exports.api = functions.https.onRequest(app);
