const express = require('express')
//const router = express.Router()
var bodyParser = require('body-parser')
const router = require('express-promise-router')()
const UserController = require('../controllers/controller.usuario')
Usuario = require('../models/model.usuario')

router.route('/')
    .get(UserController.index)
    .post(UserController.novoUsuario)

module.exports = router
