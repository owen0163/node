

exports.register = async(req, res) =>{

    try {
        const {email, password} = req.body
        if(!email){
            return res.status(400).json({message: 'email is required' })
        }
        if(!password){
            return res.status(400).json({message: 'password is required' })
        }
     console.log(email, password)
    }catch(err){
        res.status(500).json({message: "server error"})
    }
   
}

exports.login = async(req, res) =>{
    try {
        res.send('login in controller')
    }catch(err){
        res.status(500).json({message: "server error"})
    }
  
}
exports.currentUser = async(req, res) =>{
    try {
        res.send('current user')
    }catch(err){
        res.status(500).json({ msg: 'server error'})
    }
}