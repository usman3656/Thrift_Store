require('dotenv').config();
const cloudinary=require('../../utils/cloudinary');
const Product = require("../../models/Product");

const addProduct = async (req,res,next) =>{
    try {        
        const results = await Promise.all(
            req.files.map((file) => cloudinary.uploader.upload(file.path))
          );
        const imageUrls = results.map((result) => result.secure_url);
        const productData = {
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productCategory: req.body.productCategory,
            availableQuantity: req.body.availableQuantity,
            sellerID: req.body.sellerID,
            productStatus: req.body.productStatus,
            productImage: imageUrls
          };

          const product = await Product.create(productData);

    res.status(200).send({"message":"product added!",success:true,product});
    
    } catch (error) {
        console.log(error)
    }
};

const updateProduct = async (req,res) =>{
    try {
        const {productID,productName,productDescription, productPrice,productImage,productCategory,availableQuantity,productStatus}=req.body;
        const updatedProduct=await Product.findOneAndUpdate({_id:productID},{productName,productDescription,productPrice,productImage,productCategory,availableQuantity,productStatus});
        res.send({"message":"update successful",updatedProduct});
    } catch (error) {
        console.log(error)
    }
};

const deleteProduct= async (req,res) => {
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

const getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }
      
      res.send({ message: 'Success!', product });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

const getByCateg =async (req,res)=>{
    try {
        const {productCategory}=req.params;
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

const getBySellerID=async(req,res)=>{
    try{
        const {sellerID}=req.params;
        const product=await Product.find({sellerID:sellerID});
        if(!product){
            res.send("No product has been added to sale by this user.");
        }
        else{
            res.status(200).send({"message":"Successfuly fetched!",product});
        }
    } catch (error) {
        console.log(error);
    }
}

const searchProduct=async(req,res)=>{
    try {
        const { query } = req.query;
        const product = await Product.find({
          $or: [
            { productName: { $regex: query, $options: 'i' } },
            { productDescription: { $regex: query, $options: 'i' } }
          ]
        });
    
        res.json({ product });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getByCateg,
    getProductById,
    getBySellerID,
    searchProduct
};
