const CategoryBusiness = require('../models/catBusiness')


module.exports ={
    allCategoryBusiness: async (req, res, next)=>{
        console.log("ESTAS LISTANDO TIPOS DE NEGOCIOS EN catBusinessController.js")
        const categoriesBusiness = await CategoryBusiness.find()
        //res.render('noticias/catbusiness', {categoriesBusiness})
        res.status(200).json(categoriesBusiness)
        //console.log(categoriesBusiness)
    },
    newCategoryBusiness: async (req, res, next)=>{
       
        const  newCategoryBusiness = new CategoryBusiness(req.body)
        const categoryBusiness = await newCategoryBusiness.save()        
        res.status(200).json(categoryBusiness)
        console.log(categoryBusiness)
        console.log("ESTAS CREANDO NUEVA CATEGORIA")
    },
    getCategoryBusiness: async (req, res, next)=>{
        console.log("ESTAS REALIZANDO UM REQUISIÇAO A CATEGORIA")
        const { catId } = req.params
        const cat = await CategoryBusiness.findById(catId)
        res.status(200).json(cat)
    },
    replaceCategoryBusiness: async (req, res, next)=>{
        console.log("ESTAS REPLAZANDO UNA CATEGORIA")
        const { catId } = req.params
        const newCategoryBusiness = req.body
        const oldCategory = await CategoryBusiness.findByIdAndUpdate(catId, newCategoryBusiness)
        res.status(200).json({success: true})
    },
    
    updateCategoryBusiness: async (req, res, next)=>{
        console.log("ESTAS EDITANDO UNA CATEGORIA")
        const { catId }= req.params
        const newCategoryBusiness = req.body
        const oldCategory = await CategoryBusiness.findByIdAndUpdate(catId, newCategoryBusiness)
        res.status(200).json({success: true})
    },
    
    deleteCategoryBusiness: async (req, res, next)=>{
        console.log("ESTAS DELETANDO UNA CATEGORIA")
        const { catId } = req.params
        await CategoryBusiness.findByIdAndRemove(catId)
        res.status(200).json({success: true})
    }
}

/*
exports.sayHelloInEnglish = function() {
    return "HI HELLO"
    }
exports.sayHelloInSpanish = function() {
    return "Hola"
    }
exports.allCategoryBusiness = async (req, res, next)=>{
    console.log("ESTAS LISTANDO Tipos de negocios")
    const categoriesBusiness = await CategoryBusiness.find()
    res.render('noticias/catbusiness', {categoriesBusiness})
    //res.status(200).json(categories)
    console.log(categoriesBusiness)
}

exports.newCategoryBusiness = async (req, res, next)=>{
    console.log("ESTAS CREANDO NUEVA CATEGORIA")
    const newCategoryBusiness = new CategoryBusiness(req.body)
    const categoryBusiness = await newCategoryBusiness.save()
    console.log(categoryBusiness)
    res.status(200).json(categoryBusiness)
}

exports.getCategoryBusiness = async (req, res, next)=>{
    console.log("ESTAS REALIZANDO UM REQUISIÇAO A CATEGORIA")
    const catId = req.params
    const cat = await CategoryBusiness.findById(catId)
    res.status(200).json(cat)
}

exports.replaceCategoryBusiness = async (req, res, next)=>{
    console.log("ESTAS REPLAZANDO UNA CATEGORIA")
    const catId = req.params
    const newCategoryBusiness = req.body
    const oldCategory = await CategoryBusiness.findByIdAndUpdate(catId, newCategoryBusiness)
    res.status(200).json({success: true})
}

exports.updateCategoryBusiness = async (req, res, next)=>{
    console.log("ESTAS EDITANDO UNA CATEGORIA")
    const catId = req.params
    const newCategoryBusiness = req.body
    const oldCategory = await CategoryBusiness.findByIdAndUpdate(catId, newCategoryBusiness)
    res.status(200).json({success: true})
}

exports.deleteCategoryBusiness = async (req, res, next)=>{
    console.log("ESTAS DELETANDO UNA CATEGORIA")
    const catId = req.params
    await CategoryBusiness.findByIdAndRemove(catIdy)
    res.status(200).json({success: true})
}
*/