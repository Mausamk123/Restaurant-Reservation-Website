import mongoose from "mongoose";
export const dbConnection=()=>{
     console.log("MONGO_URI from env:", process.env.MONGO_URI); 
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"restaurant",
          useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Database connected successfully");
    }).catch((error)=>{
        console.log(`Error connecting to db ${error}`);

    });
    
};