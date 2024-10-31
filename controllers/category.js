


exports.create = async(req, res) =>{
    try {
        res.send('create category in controllers')
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