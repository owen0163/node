

exports.listUser = async (req, res) => {
    try{
        res.send('hello users')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}


exports.changeStatus = async (req, res) => {
    try{
        res.send('hello changeStatus')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}


exports.changeRole = async (req, res) => {
    try{
        res.send('hello changeRole')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}


exports.userCart = async (req, res) => {
    try{
        res.send('hello userCart')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}



exports.getUserCart = async (req, res) => {
    try{
        res.send('hello getUserCart')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}


exports.emptyCart = async (req, res) => {
    try{
        res.send('hello emptyCart')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}


exports.saveAddress = async (req, res) => {
    try{
        res.send('hello saveAddress')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}



exports.saveOrder = async (req, res) => {
    try{
        res.send('hello saveOrder')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}



exports.getOrder = async (req, res) => {
    try{
        res.send('hello getOrder')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}