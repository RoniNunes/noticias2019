const express = require('express')
const { format, render, cancel, register } = require('timeago.js')
const router = express.Router()

const Noticia = require('../models/noticia')

router.use((req, res, next)=> {
    if(req.isAuthenticated()){
        if(req.user.roles.indexOf('restrito')>=0){
            return next()
        }else{
            res.redirect('/')
        }
    }
    res.redirect('/login')
})

router.get('/',(req, res)=>{
    res.send('restrito')
})
router.get('/noticias',async(req, res)=>{
    const ruteNoticiasPrivada = await Noticia.find({ category: 'private' })
    res.render('noticias/restrito', {ruteNoticiasPrivada})
})

module.exports = router