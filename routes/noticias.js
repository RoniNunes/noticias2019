const express = require('express')

const router = express.Router()
const Noticia = require('../models/noticia')
CatMaster = require('../models/catMaster')

router.get('/', async (req, res)=> {
    const noticiasPublica = await Noticia.find({category: 'public'})    
    res.render('noticias/noticias-index', {noticiasPublica})
    res.status(200)//.json(noticiasPublica)
    console.log(noticiasPublica)
    
})

module.exports = router
