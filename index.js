import app from './app.js';
import cloudinary from 'cloudinary';
import dotenv from "dotenv"


cloudinary.v2.config({

    cloud_name:process.env.c_name,
    api_key:process.env.c_api , 
    api_secret:process.env.c_secret

})
 
const port  = process.env.PORT||8000;
app.listen(port , ()=> {
      console.log(`Server listening on port ${port}`);
})
