const router = require('express-promise-router')()
const BusinessController = require('../controllers/catBusinessController')
const ModelBusiness = require('../models/catBusiness')

const {
    allCategoryBusiness,
    newCategoryBusiness
} = require('../models/catBusiness')


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


router.get('/', BusinessController.allCategoryBusiness)
router.post('/',BusinessController.newCategoryBusiness)
router.get('/:catId',BusinessController.getCategoryBusiness)
router.delete('/:catId',BusinessController.deleteCategoryBusiness)


/*router.get('/', async (req, res) => {
    console.log("estas logueado")
    const BusinessCategory = await ModelBusiness.find()
    res.render('noticias/catbusiness', { BusinessCategory })
    //res.status(200).json(BusinessCategory)
    console.log('teste')
    console.log(BusinessCategory)//AQUI EU COLOQUEI ESSA FUNCAO PARA CONTROLLERS
    /*router.get('/noticia/categorias',CategoryController.allCategory)
    router.post('/',CategoryController.newCategory)
    router.get('/',CategoryController.getCategory)*
    console.log('ESTOY EN RUTE CATERGORY BUSINESS')*
})*/

module.exports = router