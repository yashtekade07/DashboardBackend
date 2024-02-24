import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    calls:{
        type:Number,
        default:0,
    },
    minutes:{
        type:Number,
        default:0,
    },
    category:[
        {
            name:{
                type:String,
                default:"",
            },
            calls:{
                type:Number,
                default:0,
            },
            minutes:{
                type:Number,
                default:0,
            }
        }
    ],
    status:[
        {
            name:{
                type:String,
                default:"",
            },
            calls:{
                type:Number,
                default:0,
            },
            minutes:{
                type:Number,
                default:0,
            }
        }
    ],
    campaignId:[
        {
            name:{
                type:String,
                default:"",
            },
            calls:{
                type:Number,
                default:0,
            },
            minutes:{
                type:Number,
                default:0,
            }
        }
    ],

},{
    timestamps:true,

});

export const Stats = mongoose.model('Stats',Schema); // Stats is the name of the collection in the database