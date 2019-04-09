const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CarroSchema = new Schema [{
    modelo: String,
    ano: String


}]

module.exports = module.mongoose('carro',CarroSchema)