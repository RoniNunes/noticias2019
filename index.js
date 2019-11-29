const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8000
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const morgan = require('morgan')




mongoose.Promise = global.Promise
const UsuarioRoute = require('./routes/route.usuarios')
const UsuarioModel = require ('./models/model.usuario')

/*TODAS AS RUTAS QUE   FOR PRECISO AGREGAR NO PROJETO DEVO EXPPORTARAS E LOGO USARLA APP.USE('/URLX',URLX) */
const Noticia = require('./models/noticia')
//const Category = require('./models/category')
const Business = require('./models/business')
const CategoryMaster = require('./models/catMaster')
const Categorybusiness = require('./models/catBusiness')
//const Subcat = require('./models/subcategorias')
const User = require('./models/user')
const noticias = require('./routes/noticias')
const restrito = require('./routes/restrito')
const auth = require('./routes/auth')
const pages = require('./routes/pages')
const admin = require('./routes/admin')
const SuperAdmin = require('./routes/superadmin')

/**Lincando Minhas routas */
const ruteBusiness = require('./routes/rute.business')
const ruteCategoriesBusiness = require('./routes/rute.catbusiness')
const ruteCategoriesMaster = require('./routes/rute.mastercategory')
const session = require('express-session')
const bodyParser = require('body-parser')

const mongo = 'mongodb+srv://first-crud:passwd2019@cluster0-cem25.mongodb.net/test?retryWrites=true'

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(session({ secret: 'fullstack-master' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

/* 21-02-2019 */
/*MIDWARE APLICADO EN TODO LUGAR */
app.use(morgan('dev'))
/*Meus testes tirar duvida por que nao esta gravando desde Postman*/
app.use('/usuarios', UsuarioRoute)

app.use('/', auth)
app.use('/', pages)
app.use('/restrito', restrito)
app.use('/noticias', noticias)
app.use('/admin', admin)
app.use('/super', SuperAdmin)
/**minhas routas */
app.use('/catbusiness', ruteCategoriesBusiness)
app.use('/categoriasmaster', ruteCategoriesMaster)
app.use('/business', ruteBusiness)


const createInitialUser = async () => {
    const totaluser = await User.count({})
    if (totaluser === 0) {
        const userR = new User({
            username: 'usuario',
            password: '1234',
            roles: ['restrito']
        })
        await userR.save()
        // console.log('User Created Jao!! ', userR)

        const userAdmin = new User({
            username: 'admin',
            password: '1234',
            roles: ['restrito', 'admin']
        })
        await userAdmin.save()
        console.log('User Administrator Empresarial Created Jao!! ', userAdmin)

        const userSuper = new User({
            username: 'superadmin',
            password: '1234',
            roles: ['restrito', 'admin', 'superadmin']
        })
        await userSuper.save()
        console.log('Super Administrator Created Jao!! ', userSuper)

    } else {
        console.log('User created skipped Jao!!')
    }

    const noticia = new Noticia({
        title: 'Notícia Pública ' + new Date().getTime(),
        content: 'content',
        category: 'public'
    })
    //await noticia.save()

    const noticiaPrivada = new Noticia({
        title: 'Notícia Privada ' + new Date().getTime(),
        content: 'content',
        category: 'private'
    })
   
   
    const Rcreate = 12
    const CriarUsuarios = new UsuarioModel({
        firstName: "Roni",
        lastName: "yo",
        email: "ronny@etc.com"
    })

    if (Rcreate === 1) {

        await CriarUsuarios.save()
        console.log(CriarUsuarios)
    }
}



mongoose
    .connect(mongo, { useNewUrlParser: true })
    .then(() => {
        createInitialUser()

        app.listen(port, () => console.log('Listening... On Port:', port))
    })
    .catch(e => console.log('ERRO AO CONECTAR CON MONGO => ', e))


