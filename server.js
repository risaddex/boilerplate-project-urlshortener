require('dotenv').config();
const express = require('express');
const dns = require('dns');
const cors = require('cors');
const urlRouter = require('./routes/api');
const db = require('./models/mongodb');

db.once('open', () => {
  console.log('connected with DB');
  // Rotas
  const urlsRouter = require('./routes/api');

  const PORT = process.env.PORT || 3000;
  // App
  const app = express();

  app.use(express.json());
  app.use('/', urlRouter);

  // Basic Configuration

  app.use(cors());

  app.use('/api', (req, res, next) => {
    dns.lookup(req.ip, (err, address, family) => {
      console.log(address, family);
      next();
    });
  });

  app.use('/public', express.static(`${process.cwd()}/public`));

  app.use(express.urlencoded({ extended: true }));

  app.use('/api', urlsRouter);

  // Raiz
  app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
});
