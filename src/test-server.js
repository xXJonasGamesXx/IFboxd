// src/test-server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message: 'O servidor de teste SIMPLES está funcionando!',
    }),
  );
});

// A porta aqui deve ser 3001
server.listen(3001, () => {
  console.log('Servidor de teste SIMPLES rodando na porta 3001!');
});
