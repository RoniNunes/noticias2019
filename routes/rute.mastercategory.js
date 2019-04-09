const router = require('express-promise-router')()
const CategoryMasterController = require('../controllers/catMasterController')
const ModuleCategory = require('../models/catMaster')


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
    const categoriesMaster = await ModuleCategory.find()
    res.render('noticias/categoriasmaster', { categoriesMaster })
    //res.status(200).json(categorias)
    console.log('teste')
    console.log(categoriesMaster)//AQUI EU COLOQUEI ESSA FUNCAO PARA CONTROLLERS
    /*router.get('/noticia/categorias',CategoryController.allCategory)
    router.post('/',CategoryController.newCategory)
    router.get('/',CategoryController.getCategory)*/
    console.log('ESTOY EN MASTER CATEGORIAS')
})

module.exports = router