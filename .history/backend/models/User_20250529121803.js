import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    name:{
        type:String,
        
    }
},{timestamps:true})