const express = require('express')
const { format, render, cancel, register } = require('timeago.js')
const router = express.Router()

const Noticia = require('../models/noticia')

router.use((req, res, next)=> {
    if(req.isAuthenticated()){
        if(req.user.roles.indexOf('superadmin')>=0){
            return next()
        }else{
            res.redirect('/')
        }
    }
    res.redirect('/login')
})

router.get('/',(req, res)=>{
    res.send('superadmin')
})
router.get('/noticias',async(req, res)=>{
    const noticias = await Noticia.find({ })
    res.render('noticias/superadmin', {noticias})
})

module.exports = router