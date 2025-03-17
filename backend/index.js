const express = require('express');

const webApp = express();

const PUERTO = 3000;

webApp.get('/', (req, res) => {
res.send('<h1>Servidor con express</h1>')
});

webApp.listen(PUERTO);
console.log(`El servidor esta levantando en el puerto ${PUERTO}`);