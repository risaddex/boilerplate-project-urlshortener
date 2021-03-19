const express = require('express');
const {
  listUrls,
  deleteAllUrls,
  createAndSaveUrl,
} = require('../controllers/urlsController');
const router = express.Router();
// API ROUTES

// GET listar URLS criadas
router.get('/urls', ({ res, next }) => {
  listUrls(res, next);
});
// delete ALL
router.delete('/urls', (req, res, next) => {
  deleteAllUrls(req, res, next);
});
// post new URL
router.post('/urls', (req, res, next) => {
  createAndSaveUrl(req, res, next);
});

// Usa um regexp para aceitar apenas redirects baseados em números
router.get('/shorturl/:id(\\d+)', (req, res, next) => {
  res.redirect('/');
});

// todo: Gerar um número e armazenar o endpoint p/ fazer o redirect
router.post('/shorturl/new', (req, res) => {
  console.log(req.body);
  // devolve a url
  res.json({
    original_url: req.body.url,
  });
});

// Your first API endpoint
router.get('/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});


module.exports = router;
