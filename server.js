require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');
const cors = require('cors');
const urlRouter = require('./routes/urls');
const db = require('./models/mongodb');

// Rotas
const urlsRouter = require('./routes/urls');

// App
const app = express();

app.use(express.json());
app.use(urlRouter);

// Basic Configuration
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.urlencoded({ extended: true }));

app.use('/api', urlsRouter);

app.use('/api/shorturl/new', (req, res, next) => {
  dns.lookup('127.0.0.1', (err, address, family) => {
    console.log(address);
    next();
  });
});
// Raiz
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// todo: Gerar um número e armazenar o endpoint p/ fazer o redirect
app.post('/api/shorturl/new', (req, res) => {
  console.log(req.body);
  // devolve a url
  res.json({
    original_url: req.body.url,
  });
});
// Usa um regexp para aceitar apenas redirects baseados em números
app.get('/api/shorturl/:id(\\d+)', (req, res, next) => {
  res.redirect('/');
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
