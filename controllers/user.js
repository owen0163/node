const { text } = require("express")
const prisma = require("../config/prisma")


exports.listUser = async (req, res) => {
    try{
        const user = await prisma.user.findMany({
            select:{
                id:true,
                email:true,
                role:true,
                enabled:true,
                address:true
            }
        })
        res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}


exports.changeStatus = async (req, res) => {
    try{
        const { id, enabled } = req.body
        const user = await prisma.user.update({
            where : { id:Number(id)},
            data:{ enabled: enabled}
        })
        res.send('update status success')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}


exports.changeRole = async (req, res) => {
    try{
        const { id, role } = req.body

        const user = await prisma.user.update({
            where : { id:Number(id)},
            data:{ role: role}
        })
        res.send('update Role success')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}


exports.userCart = async (req, res) => {
    try{
        const { cart } = req.body


        const user = await prisma.user.findFirst({
            where: { id: Number(req.user.id) },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        await prisma.productOnCart.deleteMany({
            where: {
                cart: {
                    orderedBy: user.id,
                },
            },
        });
        await prisma.cart.deleteMany({
            where: { orderedBy: user.id },
        });
        let products = cart.map((item) => ({
            productId: item.id,
            count: item.count,
            price: item.price,
        }));
        

        let cartTotal = products.reduce((sum, item)=> 
            sum+item.price * item.count, 0)

        console.log(products)
        console.log(cartTotal)

        const newCart = await prisma.cart.create({
            data:{
                products: {
                    create : products
                },
                cartTotal : cartTotal,
                orderedBy: user.id
            }
        })
        console.log(newCart)
        res.send('add Cart ok')
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}



exports.getUserCart = async (req, res) => {
    try{
        const cart = await prisma.cart.findFirst({
            where: { 
                orderedBy : Number(req.user.id)
             },
             include:{
                products:{
                     include:{
                        product:true
                     }
                }
             }
        });
    
       
        res.json({
            products : cart.products,
            cartTotal: cart.cartTotal
        })
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}


exports.emptyCart = async (req, res) => {
    try{
        const cart = await prisma.cart.findFirst({
            where: { orderedBy: Number(req.user.id)}
        })
        if (!cart) {
            return res.status(404).json({ message: " no cart" });
        }
        await prisma.productOnCart.deleteMany({
            where: { cartId: cart.id }
        })
        const result = await prisma.cart.deleteMany({
            where:{ orderedBy: Number(req.user.id)}
        })
        console.log(result)
        res.json({message: 'cart empty success', deleteCount: result.count})
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
        
    }
}


exports.saveAddress = async (req, res) => {
    try{
        const { address } = req.body
        console.log(address)

        const addressUser = await prisma.user.update({
            where: {
                id: Number(req.user.id)

            },
            data:{
                address: address
            }
        })


        res.json({ok : true, message: 'Address update success'})
    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}



exports.saveOrder = async (req, res) => {
    try{
        const userCart = await prisma.cart.findFirst({
            where: { orderedBy: Number(req.user.id)},
            include:{   products:true }
        })

        //check cart empty
        if(!userCart || userCart.products.length === 0) {
           return res.status(400).json({ok : false, message: 'cart is empty'})
        }
        //check quantity
        for(const item of userCart.products){
            console.log(item)
            const product = await prisma.product.findUnique({
                where : { id : item.productId},  
                select: { quantity : true, title: true}
            })
            // console.log(item)
            // console.log(product)
            if(!product || item.count > product.quantity){
                return res.status(400).json({
                    ok: false,
                    message: `stock dont have Product ${product?.title || 'product'} `
                })
            }
        }
        const order = await prisma.order.create({
            data: {
                products: {
                    create: userCart.products.map((item) => ({
                        productId: item.productId,
                        count: item.count,
                        price: item.price
                    }))
                },
                user:{
                    connect: { id: req.user.id}
                },
                cartTotal: userCart.cartTotal
            }
        })
        console.log(order),
        res.send(order)
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