import Users from '../models/Users.js';
import dotenv from 'dotenv';
dotenv.config();

function addAdmin() {
   Users.insertMany([
      {
         "_id": `${process.env.ADMIN_ID}`,
         "username": `${process.env.ADMIN_USERNAME}`,
         "name": `${process.env.ADMIN_NAME}`,
         "last_name": `${process.env.ADMIN_LAST_NAME}`,
         "email": `${process.env.ADMIN_EMAIL}`,
         "password": `${process.env.ADMIN_PASSWORD}`,
         "rol": "Admin"
       }
   ]);
}

export default addAdmin