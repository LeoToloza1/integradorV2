import express from 'express';
import { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import createError from 'http-errors'; // Importa createError

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
import * as pkg from '../scripts/index.mjs'; // Importa la función generarPreguntas
const { generarPreguntas } = pkg;
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.get('/preguntas', async (req, res) => {
  try {
    const preguntas = await generarPreguntas();
    res.json({ preguntas }); // Devuelve las preguntas como JSON
  } catch (error) {
    console.error('Error al generar las preguntas:', error);
    res.status(500).json({ error: 'Error al obtener las preguntas' });
  }
});

app.use('/', async (req, res) => {
  try {
    console.log("Hola mundo - app.js linea 36")
  } catch (error) {
    console.error('Error al generar las preguntas:', error);
    res.render('error');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export default app;
