const express = require('express');
const cors = require('cors');
const { sql, conectarDB } = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'API de Tickets de Soporte funcionando'
  });
});

// 1. get: obtener todos los tickets

app.get('/api/tickets', async (req, res) => {
  try {
    let pool = await conectarDB();
    let resultado = await pool.request().query('SELECT * FROM tickets ORDER BY id DESC');
    res.status(200).json(resultado.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: 'Error al consultar los tickets'
    });
  }
});

// 2. post: registrar un nuevo ticket

app.post('/api/tickets', async (req, res) => {
  const { asunto, solicitante, descripcion, categoria, prioridad, estado, fechaRegistro } = req.body;

  if (!asunto || !solicitante || !descripcion || !categoria || !prioridad || !estado || !fechaRegistro) {
    return res.status(400).json({
      mensaje: 'Complete todos los campos obligatorios del ticket'
    });
  }

  try {
    let pool = await conectarDB();
    await pool.request()
      .input('asunto', sql.VarChar, asunto.trim())
      .input('solicitante', sql.VarChar, solicitante.trim())
      .input('descripcion', sql.VarChar, descripcion.trim())
      .input('categoria', sql.VarChar, categoria.trim())
      .input('prioridad', sql.VarChar, prioridad.trim())
      .input('estado', sql.VarChar, estado.trim())
      .input('fechaRegistro', sql.Date, fechaRegistro)
      .query(`
        INSERT INTO tickets (asunto, solicitante, descripcion, categoria, prioridad, estado, fechaRegistro)
        VALUES (@asunto, @solicitante, @descripcion, @categoria, @prioridad, @estado, @fechaRegistro)
      `);

    res.status(201).json({
      mensaje: 'Ticket registrado exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: 'Error al registrar el ticket en la base de datos'
    });
  }
});

// iniciar el servidor
app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});