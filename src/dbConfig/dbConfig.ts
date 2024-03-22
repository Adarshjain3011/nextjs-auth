
// import { connection } from "mongoose";

const mongoose = require("mongoose");

// import dotenv from 'dotenv';
// dotenv.config();


export  async function connect(){

    try{

        // console.log("database usrl ","mongodb://localhost:27017/auth-database")

        // let database_url = "mongodb+srv://adarshjain3011:gY5lhuXs6y7ZPMch@cluster0.7fxa6wx.mongodb.net/";

        console.log("database usrl ",process.env.DATABASE_URL);

        await mongoose.connect(process.env.DATABASE_URL!);
        
        const connection = mongoose.connection;
        
        connection.on("connected",()=>  {
            
            console.log("connected to the database ");

        })
        
        connection.on("error",(err :any)=>{

            console.log("connection error",err);
            

        }) 

    }
    
    catch(error){

        console.log("error ocuur whil connectin to the db ",error)

    }


}







