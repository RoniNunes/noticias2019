const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NegociosCategoriasSchema = new mongoose.Schema({
    negocio: String,
    link : String,
    title: String,
    content: String,
    imgurl: String,
    relationship: [{
        type : Schema.Types.ObjectId,
        ref: 'categoryMaster'
    }]
    
})

const CategoryNegocios = mongoose.model('catbusiness', NegociosCategoriasSchema)
module.exports = CategoryNegocios