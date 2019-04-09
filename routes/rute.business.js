const router = require('express-promise-router')()
const BusinessController = require('../controllers/businessController')
const ModelBusiness = require('../models/business')


router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.roles.indexOf('restrito') >= 0) {
            return next()
        } else {
            /*res.redirect('/')*/
            res.send('No estas autorizado! faill #350')
        }
    }
    res.redirect('/login')
    /*res.send('No estas autorizado!')*/
})
router.get('/', async (req, res) => {
    console.log("estas logueado")
    const Businesses= await ModelBusiness.find()
    res.render('noticias/business', { Businesses })
    //res.status(200).json(BusinessCategory)
    console.log('teste')
    console.log(Businesses)//AQUI EU COLOQUEI ESSA FUNCAO PARA CONTROLLERS
    /*router.get('/noticia/categorias',CategoryController.allCategory)
    router.post('/',CategoryController.newCategory)
    router.get('/',CategoryController.getCategory)*/
    console.log('ESTOY EN NEGOCIOS')
})

module.exports = router