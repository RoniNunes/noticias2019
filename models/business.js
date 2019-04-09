const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BusinessSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    Proprietario: String,
    apellidos: String,
    Direccion: String,
    telefono: String,
    paginaweb: String,
    provincia: String,
    ciudad: String,
    barrio: String,
    codigoPostal: String,
    email: String,
    urlimage: String,
    config:[{
        gps: [{
            statusGps: String,
            long: String,
            lat: String
        }],
        sendpush: [{
            statusPush: String,
            titlePush: String,
            contentPush: String
        }],
        chat: [{
            statusChat: String
        }],
    }],
    servicios:[{
        reservas: String,
        demanda: [{
            title: String,
            content: String,
            contact: String,
            tel: String,
            email: String,
            img: String,
            precio: String,

        }],
        empleo: [{
            title: String,
            content: String,
            contact: String,
            tel: String,
            email: String,
            img: String,
            precio: String,

        }]
    }],
    subcat: [{
        type : Schema.Types.ObjectId,
        ref: 'user'
    }]
})

const Business = mongoose.model('business', BusinessSchema)
module.exports = Business