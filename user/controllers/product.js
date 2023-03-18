require('dotenv').config();
const Product = require("../../models/Product");

const addProduct = async(req,res) =>{
    try {
        const {productName,productDescription, productPrice,productImage,productCategory,availableQuantity,sellerID} = req.body;

    const product=await Product.create([
        {productName,productDescription, productPrice,productImage,productCategory,availableQuantity,sellerID}
    ]);

    res.status(200).send({"message":"product added!",product});

    } catch (error) {
        console.log(error)
    }
};

const updateProduct = async(req,res) =>{
    try {
        const {productID,productName,productDescription, productPrice,productImage,productCategory,availableQuantity}=req.body;
        const updatedProduct=await Product.findOneAndUpdate({_id:productID},{productName,productDescription,productPrice,productImage,productCategory,availableQuantity});
        res.send({"message":"update successful",updatedProduct});
    } catch (error) {
        console.log(error)
    }
};

const deleteProduct= async(req,res) => {
    try {
        const{productID}=req.body;
        const deletedProduct=await Product.deleteOne({_id:productID});
        res.send({"message":"delete successful",deletedProduct});
    } catch (error) {
        console.log(error);
    }
};

const getProducts = async (req,res)=>{
    try {
        const product=await Product.find();
        res.send({"message":"Success!",product});
    } catch (error) {
        console.log(error);
    }
};

const getByCateg =async(req,res)=>{
    try {
        const {productCategory}=req.body;
        const product=await Product.find({productCategory:productCategory});
        if(!product){        
            res.send("There is no product in this category");        
        }
        else{
            res.status(200).send({"message":"Successfuly fetched!",product});
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getByCateg
};
