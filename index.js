require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const http = require('http');

const HTTPSTATUSCODE = require('./utils/httpStatusCode');
const connectMongo = require('./utils/db');
connectMongo();

const app = express();
const server = http.createServer(app);

app.use(cors({
  methods: ['GET']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.set('secretKey', 'nodeRestApi');
app.use(mongoSanitize());
app.use(express.json());

/* ROUTES */
const countriesRouter = require('./src/routes/countries.routes');
app.use('/api/factmap', countriesRouter);




app.get('/api/factmap', (request, response) => {
  response.status(200).json({
    message: 'Bienvenidos al servidor',
    app: 'FactMap',
  });
});

//  MANEJO DE ERRORES
app.use((request, response, next) => {
  let error = new Error();
  error.status = 404;
  error.message = HTTPSTATUSCODE[404];
  next(error);
});

app.use((error, request, response, next) => {
  return response
    .status(error.status || 500)
    .json(error.message || 'Unexpected error');
});

app.disable('x-powered-by');




/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
server.listen(process.env.PORT, () => {
  console.log(`La app está corriendo en el servidor ${process.env.PORT}`);
});
