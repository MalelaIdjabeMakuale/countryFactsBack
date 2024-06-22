require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const http = require('http');
const connectMongo = require('./utils/db');
const HTTPSTATUSCODE = require('./utils/httpStatusCode');

const app = express();
const server = http.createServer(app);

connectMongo();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(mongoSanitize());

/* ROUTES */
const countriesRouter = require('./src/routes/countries.routes');
app.use('/api/factmap', countriesRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bienvenidos al servidor',
    app: 'FactMap',
  });
});

// Manejo de errores
app.use((req, res, next) => {
  const error = new Error();
  error.status = 404;
  error.message = HTTPSTATUSCODE[404];
  next(error);
});

app.use((error, req, res, next) => {
  return res.status(error.status || 500).json({
    message: error.message || 'Unexpected error',
  });
});

app.disable('x-powered-by');

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`La app está corriendo en el servidor ${PORT}`);
});
