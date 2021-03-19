const express = require('express');
const { listUrls, deleteAllUrls } = require('../controllers/urlsController');
const UrlModel = require('../models/urlmodel');
const app = express();
// URLS ROUTES

// GET listar URLS criadas
app.get('/api/urls', ({ res, next }) => {
  listUrls(res, next);
});

app.delete('/api/urls', (req, res, next) => {
  deleteAllUrls(req, res, next)
})


module.exports = app;
