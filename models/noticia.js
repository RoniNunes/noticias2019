const mongoose = require('mongoose')

const NoticiasSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String
})

const Noticia = mongoose.model('Noticia', NoticiasSchema)
module.exports = Noticia