import mongoose from "mongoose";
import validator from "validator";

const reservationSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name must be at least 3 characters"],
        maxlength:[30,"First name must be at most 30 characters"],
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name must be at least 3 characters"],
        maxlength:[30,"Last name must be at most 30 characters"],
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Provide a valid email"],
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone number must contain only 10 digits"],
        maxlength:[10,"Phone number must contain only 10 digits"],
    },
    time:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
});

export const Reservation=mongoose.model("Reservation",reservationSchema);
