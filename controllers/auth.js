const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
const { token } = require('morgan');

exports.register = async (req, res) => {

    try {
        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({ message: 'email is required' })
        }
        if (!password) {
            return res.status(400).json({ message: 'password is required' })
        }
        // check email in db 
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(400).json({ message: "email already exit !! " })
        }
        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword)

        // register
        await prisma.user.create({
            data:{
                email : email,
                password: hashPassword
            }
        })

        res.send(' Register Success')
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password} = req.body
        console.log(email, password)

        //check email in db
        const user = await prisma.user.findFirst({
            where: {
                email : email
            }
        })
        if(!user || !user.enabled){
            return res.status(400).json({message: 'User not found or not Enabled'})
        }
        //check password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'password invalid'})
        }
        //create payload
        const payload ={
            id: user.id,
            email: user.email,
            role: user.role,
        }
        //generate Token
        jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "server Error" });
            }
            res.json({ payload, token });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" });
    }

}
exports.currentUser = async (req, res) => {
    try {
        res.send('current user')
    } catch (err) {
        res.status(500).json({ msg: 'server error' })
    }
}