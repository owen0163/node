

exports.listUser = async (req, res) => {
    try{
        res.send('hello users')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}