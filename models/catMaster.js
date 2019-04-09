const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategoryMasterSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    description: String,
    imgurl: String,
    relationship: [{
        type : Schema.Types.ObjectId,
        ref: 'catBusiness'
    }]
    /*origen:['comer y beber',
     'deportes', 'compras', 
     'servicios profesionales', 'hogar',
     'trasnporte publico', 'servicio 24 horas',
     'que visitar', 'ideas y consejos', 'alojamiento', 
     'salud', 'belleza', 'formacion escuelas', 
     'turismo rural', 'ocio', 'motor', 'niños', 'coches']*/
})
const CategoryMaster = mongoose.model('categoryMaster',CategoryMasterSchema)
module.exports = CategoryMaster