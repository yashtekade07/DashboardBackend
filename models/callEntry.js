import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    campaignId:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
},{

        timestamps:true,
    }
)

export const callEntry = mongoose.model('callEntry',Schema); // callEntry is the name of the collection in the database