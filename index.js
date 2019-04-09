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
//const mongo = 'mongodb://localhost/fullstackmaster-noticias'
//const mongo = 'mongodb://usernoticias:passnoticias@89.129.121.66:17027/fullstackmaster-noticias'
//    mongodb://myUser:pass@x.x.x.x:puerto/myDatabase

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
    //await noticiaPrivada.save()
    let local = 'Tapas y Raciones'
    let catPai = 'Comer y Beber'


    const LasCategorias = new Categorybusiness({
        title: local,//+new Date().getTime(),
        content: 'Aqui un conteudo qualquer',
        date: new Date(),
        urlimage: '../img/categorias/' + local.replace(/ /g, "_") + '.jpg',
        catMaster: catPai/*,
         subcat: [{
             type: Schema.Types.ObjectId,
             ref: 'subcategorias'
         }]*/


    })

    //await LasCategorias.save()
    //console.log(LasCategorias)
    //VOU CRIAR A CATEGORIA MASTER "Principal categoria"
    const MasterCategories = new CategoryMaster({
        title: 'Coches',
        content: Date(),
        category: 'Creada por Admin',
        description: 'Subscribe'

        //all categorias Master
        /*origen:['Comer y Beber',
     'Deportes', 'Compras', 
     'Servicios Profesionales', 'Hogar',
     'Trasnporte Publico', 'Servicio 24 Horas',
     'Qué Visitar', 'Ideas y Consejos', 'Alojamiento', 
     'Salud', 'Belleza', 'Formacion Escuelas', 
     'Turismo Rural', 'Ocio', 'Motor', 'Niños', 'Coches']*/

    })
    //await MasterCategories.save()
    //console.log('CREATED ' +MasterCategories)
    //FIM DA PRINCIPAL CATEGORIA
    const subcategoriaInsert = 'Restautantes'
    const Proprietario = 'Admin'
    const title = 'Vila Brasil'
    const modelBusiness = new Business({
        title: title,
        content: "Descprition corta",
        category: subcategoriaInsert,
        Proprietario: Proprietario,
        apellidos: 'Santos Nunes',
        Direccion: 'calle maqueda 145',
        telefono: '620047118',
        paginaweb: 'www.fullstackbr.dev',
        provincia: 'Madrid',
        ciudad: 'Madrid',
        barrio: 'Lucero',
        codigoPostal: '28047',
        email: 'fullstackbr@dev.com',
        urlimage: '../img/' + title + '/.jpg',
        config: [{
            gps: [{
                statusGps: 'Activo',
                long: '14588454566',
                lat: '8765895451'
            }],
            sendpush: [{
                statusPush: 'On',
                titlePush: 'Hola aqui é o titulo push en ' + title,
                contentPush: 'Descripcion da empresa relacionada a ' + subcategoriaInsert
            }],
            chat: [{
                statusChat: 'On'
            }],
        }],
        servicios: [{
            reservas: 'Reservas en desarrollo',
            demanda: [{
                title: 'Camareras',
                content: 'Busco trabajo de camareras para trabajar fines de semana',
                contact: 'Ronny',
                tel: '620047118',
                email: 'fullstackbr@gmail.com',
                img: '../img/demanda/' + title + '/selecion-' + new Date().getTime(),
                precio: '1200€'

            }],
            empleo: [{
                title: 'Camareras',
                content: 'Selecionamos camareras para trabajar fines de semana',
                contact: 'Ronny',
                tel: '620047118',
                email: 'fullstackbr@gmail.com',
                img: '../img/demanda/' + title + '/selecion-' + new Date().getTime(),
                precio: '1200€'

            }]
        }]/*,
        subcat: [{
            type: Schema.Types.ObjectId,
            ref: 'Business'
        }]*/
    })
    //await modelBusiness.save()


    let BusinessNegocio = 'Donde llevar Los '//FALTA COMPRAS, OCIO , MOTOR TODOS TEM SUB-SUB-CATEGORIAS
    const valor = 1
    let LinkBusines = 'Ocio'
    let BusinessTitle = 'Titulo ' + BusinessNegocio
    let BusinessContent = 'Descripcion del ' + BusinessNegocio
    const CatBusinessModel = new Categorybusiness({
        negocio: BusinessNegocio,
        link: LinkBusines,
        title: BusinessTitle,
        content: BusinessContent,
        imgurl: '../img/business/' + BusinessNegocio.replace(/ /g, "_") + '.jpg',
    })
    console.log('     ')
    if (valor === 1) {
        console.log('------------------------------------------------------------------')
        console.log('                                                                   ')
        console.log('GRABANDO NUEVO TIPO DE NEGOCIO ' + BusinessNegocio)
        console.log(' ')
        console.log('RELACIONADO A ' + LinkBusines)
        console.log('                                                                   ')
        await CatBusinessModel.save()
        console.log('------------------------------------------------------------------')
    }













    const Rcreate = 12
    const CriarUsuarios = new UsuarioModel({
        firstName: "Roni",
        lastName: "Nunes",
        email: "ronny@etc.com"
    })

    if (Rcreate === 1) {

        await CriarUsuarios.save()
        console.log(CriarUsuarios)
    }


















    //await ModelBusiness.save()

    let Negocio = 'Tapas y Raciones'

    let Origen = 'Comer y Beber'
    let Propietario = ''
    const ModelCategoryBusiness = new Categorybusiness({
        title: Negocio,
        content: Origen,
        catMaster: Origen,
        categoryMaestra: [{
            type: Schema.Types.ObjectId,
            ref: 'catMaster'
        }],
        Propietario: Propietario,
        urlimage: '../img/categorias/' + Negocio.replace(/ /g, "_") + '.jpg',
        /*subcat: [{
            type : Schema.Types.ObjectId,
            ref: 'Business'
        }]*/
    })//final modelCategoryBusiness
    //oo
    //await ModelCategoryBusiness.save()
    //console.log(ModelCategoryBusiness)




}






mongoose
    .connect(mongo, { useNewUrlParser: true })
    .then(() => {
        createInitialUser()

        app.listen(port, () => console.log('Listening... On Port:', port))
    })
    .catch(e => console.log('ERRO AO CONECTAR CON MONGO => ', e))


