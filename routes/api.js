const express = require('express');
const {
  listUrls,
  deleteAllUrls,
  createAndSaveUrl,
  redirectByUrlId,
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

// Usa um regexp para aceitar apenas redirects baseados em números
router.get('/shorturl/:id(\\d+)', async (req, res) => {
  redirectByUrlId(req, res);
});

// todo: Gerar um número e armazenar o endpoint p/ fazer o redirect
router.post('/shorturl/new', (req, res, next) => {
  console.log(req.body);
  // post new URL
  createAndSaveUrl(req, res, next);
});

// Your first API endpoint
router.get('/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

module.exports = router;
