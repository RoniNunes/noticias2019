const Usuario = require('../models/model.usuario')
const bodyParser = require('body-parser')


module.exports = {

    index: async  (req, res, next) =>{
        const Usuarios = await Usuario.find({})
        res.status(200).json(Usuarios)
    },
    
    novoUsuario: async (req, res, next)=>{
        const novoUsuario = new Usuario(req.body)
        const usuario= await novoUsuario.save()
        res.status(200).json(usuario)
        email = req.body
        console.log(usuario)
        console.log('START Parametros =>'+ email +'<= END Parametros')
    },
    //PARA OBTER APENAS 1 USUARIO obetem o Id do usuaio
    getUsuario: async (req, res, next)=>{
        //obter o Id no usuario atraves dos parametros
        const { usuarioId } =req.params
        const usuario = await Usuario.findById(usuarioId)
        res.status(200).json(usuario)

    }

    
}


