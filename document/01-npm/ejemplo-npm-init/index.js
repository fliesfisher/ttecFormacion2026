// index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
