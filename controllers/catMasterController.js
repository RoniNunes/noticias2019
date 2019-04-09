const CategoryMaster = require('../models/catMaster')


exports.sayHelloInEnglish = function() {
    return "HI HELLO"
    }
exports.sayHelloInSpanish = function() {
    return "Hola"
    }
exports.allCategoryMaster = async (req, res, next)=>{
    console.log("ESTAS LISTANDO CATEGORIAS PRINCIPAL")
    const categoriesMaster = await CategoryMaster.find()
    res.render('noticias/categoriasmaster', {categoriesMaster})
    //res.status(200).json(categories)
    console.log(categoriesMaster)
}

exports.newCategoryMaster = async (req, res, next)=>{
    console.log("ESTAS CREANDO NUEVA CATEGORIA")
    const newCategoryMaster = new Category(req.body)
    const categoryMaster = await newCategoryMaster.save()
    res.status(200).json(category)
}

exports.getCategoryMaster = async (req, res, next)=>{
    console.log("ESTAS REALIZANDO UM REQUISIÇAO A CATEGORIA")
    const catId = req.params
    const cat = await CategoryMaster.findById(catId)
    res.status(200).json(cat)
}

exports.replaceCategoryMaster = async (req, res, next)=>{
    console.log("ESTAS REPLAZANDO UNA CATEGORIA")
    const catId = req.params
    const newCategoryMaster = req.body
    const oldCategory = await CategoryMaster.findByIdAndUpdate(catId, newCategoryMaster)
    res.status(200).json({success: true})
}

exports.updateCategoryMaster = async (req, res, next)=>{
    console.log("ESTAS EDITANDO UNA CATEGORIA")
    const catId = req.params
    const newCategoryMaster = req.body
    const oldCategory = await CategoryMaster.findByIdAndUpdate(catId, newCategoryMaster)
    res.status(200).json({success: true})
}

exports.deleteCategoryMaster = async (req, res, next)=>{
    console.log("ESTAS DELETANDO UNA CATEGORIA")
    const catId = req.params
    await CategoryMaster.findByIdAndRemove(catIdy)
    res.status(200).json({success: true})
}
