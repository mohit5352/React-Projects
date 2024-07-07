// server.js
import jsonServer from 'json-server';
// const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Middleware to reload data after every delete or post request
server.use((req, res, next) => {
  if (req.method === 'DELETE' || req.method === 'POST') {
    router.db.setState(require('./data/db.json')); // Reload data from db.json
  }
  next();
});

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
