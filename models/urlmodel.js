const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema definition
const UrlSchema = new Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: Number,
  },
});

// Validation
UrlSchema.pre('save', async function () {
  //? FCC's base demo did'nt allowed 0 index so... ¯\_(ツ)_/¯
  const currentIndex = (await this.collection.count({})) + 1;

  this.set({ short_url: currentIndex });
});

// Virtuals
UrlSchema.virtual('url')
  //? Necessário usar function para ter acesso ao THIS
  .get(function () {
    return `/api/urls/${this.short_url}`;
  });

// Define o NOME_DOCUMENTO, NOME_SCHEMA, NOME_COLECAO
module.exports = mongoose.model('Urls', UrlSchema, 'shortened_urls');

exports.UrlModel = UrlSchema;
