require('dotenv').config();
const Shipper= require('../../models/Shipper');


const addShipper =async (req,res) => {
    try{
        const {shipperName,
            shipperPhone,
            shipperStatus} = req.body;
        console.log(req.body);
    
        const newShipper = await Shipper.findOne({shipperPhone});
        if(!newShipper){
          const result = await Shipper.create({
            shipperName,
            shipperPhone,
            shipperStatus
          }); 
          res.send(result);
        }
        else{
          res.send("shipper already exists");
        }
      }
        catch (error){
        console.log(error)
          
        }
};

const removeShipper =async (req,res) => {

};

module.exports = {
    addShipper,
    removeShipper
};