const prisma = require("../config/prisma");



exports.create = async(req, res) =>{
    try { 
        const { name } = req.body
        const category = await prisma.category.create({
            data:{
                name: name
            }
        });

        res.json({ message: 'Category creation successful', category });
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
   
}

exports.list = async(req, res) =>{
    try {
        res.send('list category in controllers')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
   
}
exports.remove = async(req, res) =>{
    try {
        res.send('remove category in controllers')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
   
}