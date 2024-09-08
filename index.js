import app from './app.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.c_name,
    api_key: process.env.c_api,
    api_secret: process.env.c_secret,
});

const port = process.env.PORT || 8000;
app.listen(port, (err) => {
    if (err) {
        console.error(`Error starting server: ${err}`);
    } else {
        console.log(`Server listening on port ${port}`);
    }
});
