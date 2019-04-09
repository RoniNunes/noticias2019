const express = require('express')
//const router = express.Router()
var bodyParser = require('body-parser')
const router = require('express-promise-router')()
const UserController = require('../controllers/controller.usuario')
Usuario = require('../models/model.usuario')
/*const {
    index,
    novoUsuario,
    getUsuario
}=require('../controllers/controller.usuario')
*/

router.route('/')
    .get(UserController.index)
    .post(UserController.novoUsuario)

/*router.post('/', async (req, res, next)=>{
        const novoUsuario = new Usuario(req.body)
        const dados = req.params.email
        console.log('START Parametros =>'+ dados +'<= END Parametros')
        const usuario= await novoUsuario.save()
        res.status(200).json(usuario)
        console.log(novoUsuario)
})*/

/*router.get('/', function(req, res) {
    res.send('user ' + req.params[1]);
  })*/
/*router.get('/',index)
router.post('/',novoUsuario)*/


module.exports = router