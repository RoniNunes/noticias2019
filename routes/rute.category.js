const router = require('express-promise-router')()
const CategoryController = require('../controllers/categoryController')
//const Category = require('../models/category')


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

router.route('/')
	.get(CategoryController.allCatBusiness)
	.post(CategoryController.newCatBusiness)
/*router.get('/', async (req, res) => {
    console.log("estas logueado")
    const categories = await CategoryController.find()
    res.render('noticias/categorias', { categories })
    //res.status(200).json(categorias)
    console.log('teste')
    console.log(categories)//AQUI EU COLOQUEI ESSA FUNCAO PARA CONTROLLERS
    /*router.get('/noticia/categorias',CategoryController.allCategory)
    router.post('/',CategoryController.newCategory)
    router.get('/',CategoryController.getCategory)**
})*/

module.exports = router