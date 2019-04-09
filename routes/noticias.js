const express = require('express')

const router = express.Router()
const Noticia = require('../models/noticia')
CatMaster = require('../models/catMaster')

router.get('/', async (req, res)=> {
    /**TIPO DE AUTORAZACION */
    /*let conditions  = {}
    if (!('user' in req.session)){
        conditions = { category: 'public' }
    }*/

    /* ANTES DE MODIFICAR DE NOTICIAS PARA CATEGORIAS
    conditions = {category: 'public'}
    const noticias = await Noticia.find( conditions )
    res.render('noticias/index', { noticias })*/

    /*const categorias = await Categoria.find({ category: 'Restaurantes' })*/
    const noticiasPublica = await Noticia.find({category: 'public'})    
    res.render('noticias/noticias-index', {noticiasPublica})
    res.status(200)//.json(noticiasPublica)
    console.log(noticiasPublica)
    
    
})

module.exports = router