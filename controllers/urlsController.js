const db = require('../models/mongodb');
const Url = require('../models/urlmodel');

//? As queries do mongoose possuem métodos de Promessas (Promise-like)

// list
const listUrls = (res, next) => {
  Url.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
};

const createAndSaveUrl = (req, res, next) => {
  let url = {
    original_url: 'https://google.com',
    short_url: 1,
  };

  Url.create(url)
    .then((data) => {
      console.log('sucess: %s', data);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteAllUrls = (req, res, next) => {
  db.dropCollection('shortened_urls');
  res.send('All urls were deleted!')
};

exports.listUrls = listUrls;
exports.createAndSaveUrl = createAndSaveUrl;
exports.deleteAllUrls = deleteAllUrls;
