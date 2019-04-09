const CatBusiness = require('../models/catBusiness')


exports.sayHelloInEnglish = function() {
    return "HI HELLO"
    }
exports.sayHelloInSpanish = function() {
    return "Hola"
    }
exports.allCatBusiness = async (req, res, next)=>{
    console.log("ESTAS LISTANDO CATEGORIAS")
    const categories = await CatBusiness.find()
    res.render('noticias/categorias', {categories})
    //res.status(200).json(categories)
    console.log(categories)
}

exports.newCatBusiness = async (req, res, next)=>{
    console.log("ESTAS CREANDO NUEVA CATEGORIA")
    const newCatBusiness = new CatBusiness(req.body)
    const CatBusiness = await newCatBusiness.save()
    res.status(200).json(CatBusiness)
}

exports.getCatBusiness = async (req, res, next)=>{
    console.log("ESTAS REALIZANDO UM REQUISIÇAO A CATEGORIA")
    const catId = req.params
    const cat = await CatBusiness.findById(catId)
    res.status(200).json(cat)
}

exports.replaceCatBusiness = async (req, res, next)=>{
    console.log("ESTAS REPLAZANDO UNA CATEGORIA")
    const catId = req.params
    const newCatBusiness = req.body
    const oldCatBusiness = await CatBusiness.findByIdAndUpdate(catId, newCatBusiness)
    res.status(200).json({success: true})
}

exports.updateCatBusiness = async (req, res, next)=>{
    console.log("ESTAS EDITANDO UNA CATEGORIA")
    const catId = req.params
    const newCatBusiness = req.body
    const oldCatBusiness = await CatBusiness.findByIdAndUpdate(catId, newCatBusiness)
    res.status(200).json({success: true})
}

exports.deleteCatBusiness = async (req, res, next)=>{
    console.log("ESTAS DELETANDO UNA CATEGORIA")
    const catId = req.params
    await CatBusiness.findByIdAndRemove(catIdy)
    res.status(200).json({success: true})
}
