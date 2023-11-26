const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret
  });

// module.exports = async (payload) => {
//   if(typeof payload.images !== "string"){
//     const imageLinks = [];
//     for(let i=0;i<payload.images.length;i++){
//       await cloudinary.uploader.upload(
//         payload.images[i], {
//           folder:payload.folder,          
//       }).then(link => imageLinks.push(link.secure_url));      
//     }
//     return imageLinks;
//   }
//   return (await cloudinary.uploader.upload(payload.images,{ folder: payload.folder, })).secure_url;
// };

module.exports=cloudinary;