require('dotenv').config();
const Shipper= require('../../models/Shipper');


const addShipper =async (req,res) => {
    try{
        const {shipperName,
            shipperPhone,
            shipperStatus} = req.body;
    
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

const getShippers=async (req,res) =>{
  try {
    const shippers = await Shipper.find();
    if (!shippers) {
      res.send("no shipper found");
    } else {
      res.send({
        message: "successfully fetched data",
        data: { shippers },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const updateStatus=async (req,res)=>{
  try{
    const {shipperID,shipperStatus}=req.body;
        const shipperupdate = await Shipper.findOneAndUpdate({_id:shipperID},{shipperStatus:shipperStatus},{ new: true }      
      );      
        res.send(shipperupdate); 
  } catch(error){
    res.status(400).send(error);
  }
}

const removeShipper =async (req,res) => {

};

module.exports = {
    addShipper,
    removeShipper,
    getShippers,
    updateStatus
};