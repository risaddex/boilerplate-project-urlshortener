const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  original_url: String,
  short_url: Number,
});

// Virtuals
UrlSchema
  .virtual('url')
  //? Necessário usar function para ter acesso ao THIS
  .get(function (){
    return `/api/urls/${this.short_url}`
  })

// Define o NOME_DOCUMENTO, NOME_SCHEMA, NOME_COLECAO
module.exports =  mongoose.model('Urls', UrlSchema, 'shortened_urls');

exports.UrlModel = UrlSchema