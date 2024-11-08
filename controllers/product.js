const { query } = require("express");
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
        const { sort, order, limit } = req.body
        console.log(sort, order, limit)
        const products = await prisma.product.findMany({
            take: limit,
            orderBy:{[sort]:order },
            include:{ category: true }
        })

        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

//////////////////////////////////////////////////////////////////////////////////////
// searchFilters

//query
const handleQuery = async (req, res, query) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: query,
                    mode: 'insensitive', // Makes the search case-insensitive
                }
            },
            include:{
                category:true,
                images:true
            }
        });
        return res.send(products); // Use return to prevent further execution
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Search error" });
    }
};
//price
const handlePrice = async (req, res, priceRange) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: priceRange[0],
                    lte: priceRange[1]     
                }
            },
            include:{
                category: true,
                images:true
            }
        });
        return res.send(products); // Use return to prevent further execution
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Search error" });
    }
};
//category
const handleCategory = async (req, res, categoryId) => {
    try {    
        const products = await prisma.product.findMany({
            where: {
                categoryId: {
                    in: categoryId.map((id) => Number(id)) 
                }
            },
            include: {
                category: true,
                images: true
            }
        });
        return res.send(products); // Return to prevent further execution
    } catch (err) {
        console.error("Error in handleCategory:", err);
        return res.status(500).json({ message: "Search error" });
    }
};


exports.searchFilters = async (req, res) => {
    try {
        const { query, category, price } = req.body

        if(query){
            console.log('query-->',query)
            await handleQuery(req, res, query)
        }
        if(category){
            console.log('category-->', category)
             await handleCategory(req, res, category)
        }
        if(price){
            console.log('price-->', price)
            await handlePrice(req, res, price)
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}