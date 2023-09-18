import { Router } from "express";
import { generarPreguntas } from '../../scripts/index.mjs';

const router = Router();

router.get('/preguntas', async (req, res) => {
    try {
      const preguntas = await generarPreguntas();
      res.json({ preguntas }); // Devuelve las preguntas como JSON
      console.log("ruta de preguntas -  rutas.js linea 26")
    } catch (error) {
      console.error('Error al generar las preguntas:', error);
      res.status(500).json({ error: 'Error al obtener las preguntas' });
    }
});

export default router;

  
  
  
  //https://web2-integrador.onrender.com