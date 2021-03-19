const db = require('../models/mongodb');
const Url = require('../models/urlmodel');

//? As queries do mongoose possuem métodos de Promessas (Promise-like)

// list
function listUrls(res, next) {

  Url.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}
// createOne(insert)
function createAndSaveUrl(req, res, next) {

  let url = {
    original_url: 'https://google.com',
  };

  Url.create(url)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
}
// removeAll(drop)
function deleteAllUrls(req, res, next) {
  db.dropCollection('shortened_urls');
  console.log('All urls were deleted!');
  res.end();
}


exports.listUrls = listUrls;
exports.createAndSaveUrl = createAndSaveUrl;
exports.deleteAllUrls = deleteAllUrls;
