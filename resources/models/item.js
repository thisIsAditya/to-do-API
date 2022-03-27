import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    status : {
        type : String,
        default : "incomplete",
        enum : ["incomplete", "completed"]
    }
},
{
    timestamps : true
});

export const Item = mongoose.model("item", ItemSchema);