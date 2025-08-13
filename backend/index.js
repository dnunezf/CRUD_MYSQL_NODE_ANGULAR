/*Instancias de cada dependencia*/
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

/*Inicializamos servidor*/
const app = express();
app.use(cors());
app.use(express.json());

/* Inicializamos conexión a la base de datos */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_usuarios",
});

/* Endpoints a consumir */

/* CREATE */
app.post("/usuarios", (req, res) => {
  const { nombre, email } = req.body;
  db.query(
    "INSERT INTO usuarios (nombre, email) VALUES (?, ?)",
    [nombre, email],
    (err, result) => {
      if (err) return res.json(err);
      res.json(result);
    }
  );
});

// READ
app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// UPDATE
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  db.query(
    "UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?",
    [nombre, email, id],
    (err, result) => {
      if (err) return res.json(err);
      res.json(result);
    }
  );
});

// DELETE
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

/*Mensaje de inicio*/
app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});