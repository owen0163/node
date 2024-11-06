const prisma = require("../config/prisma");


//////////////////////////////////////////////////////////////////////////////////////
// product create
exports.create = async (req, res) => {
    try {
        const { title, description, price, quantity,categoryId, images } = req.body
       //image
        const imagesData = typeof images === 'string'
            ? [{ url: images }] // Convert single URL string to array of one object
            : Array.isArray(images)
                ? images.map((item) => ({
                    asset_id: item.asset_id,
                    public_id: item.public_id,
                    url: item.url,
                    secure_url: item.secure_url,
                }))
                : [];
        const product = await prisma.product.create({
            data: {
                title,
                description,
                price: parseFloat(price), 
                quantity: parseInt(quantity), 
                categoryId: parseInt(categoryId),
                images: {
                    create: imagesData
                
                }
            }
        });

        res.json({ message: 'Product created successfully', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

//////////////////////////////////////////////////////////////////////////////////////
// product list

exports.list = async (req, res) => {
    try {
        const { count } = req.params
        const product = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: { createdAt : "desc"},
            include: {
                category: true,
                images: true
            }
        })
        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

//////////////////////////////////////////////////////////////////////////////////////
// get 1 product 

exports.read = async (req, res) => {
    try {
        const { id } = req.params
        const product = await prisma.product.findFirst({
            where:{
                id : Number(id)
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}


//////////////////////////////////////////////////////////////////////////////////////
// product update

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, price, quantity,categoryId, images } = req.body
       //image
        const imagesData = typeof images === 'string'
            ? [{ url: images }] 
            : Array.isArray(images)
                ? images.map((item) => ({
                    asset_id: item.asset_id,
                    public_id: item.public_id,
                    url: item.url,
                    secure_url: item.secure_url,
                }))
                : [];
        const product = await prisma.product.update({
            where: {
                id: parseInt(id) 
            },
            data: {
                title,
                description,
                price: parseFloat(price), 
                quantity: parseInt(quantity), 
                categoryId: categoryId ? parseInt(categoryId) : null,
                images: {
                    deleteMany: {}, 
                    create: imagesData 
                }
            }
        });

        res.json({ message: 'Product update successfully', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
//////////////////////////////////////////////////////////////////////////////////////
// product remove

exports.remove = async (req, res) => {
    try {
        const { id } = req.params
        await prisma.product.delete({
            where :{
                id: Number(id)
            }
        })
        res.send('remove product success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

//////////////////////////////////////////////////////////////////////////////////////
// productby

exports.listby = async (req, res) => {
    try {
        res.send('product BY')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

//////////////////////////////////////////////////////////////////////////////////////
// searchFilters

exports.searchFilters = async (req, res) => {
    try {
        res.send('product search/filters')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}