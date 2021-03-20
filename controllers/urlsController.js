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
    original_url: req.body.url,
  };
  // Insert Model into DB
  Url.create(url)
    .then(({ original_url, short_url, ...data }) => {
      console.log(data._doc);
      res.json({
        original_url,
        short_url,
      });
    })
    .catch((err) => {
      res.json({
        error: 'invalid url',
      });
    });
}
// removeAll(drop)
function deleteAllUrls(req, res, next) {
  db.dropCollection('shortened_urls');
  return console.log('All urls were deleted!');
}

async function redirectByUrlId(req, res) {
  await Url.findOne({ short_url: req.params.id })
    .then((data) => {
      res.redirect(data.original_url);
    })
    .catch((err) => {
      return console.error(err);
    });
}

exports.listUrls = listUrls;
exports.createAndSaveUrl = createAndSaveUrl;
exports.deleteAllUrls = deleteAllUrls;
exports.redirectByUrlId = redirectByUrlId;
