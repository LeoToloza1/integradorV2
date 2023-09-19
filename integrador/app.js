import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import createError from 'http-errors';
import router from "./rutas/rutas.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use(cors());
export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL
    : '/';

app.use(baseUrl, router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message }); // Enviar un mensaje de error JSON
});

export default app;
