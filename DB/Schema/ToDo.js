const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var ToDoSchema = new Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
    },
    Owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    } 
 
},{ timestamps: true });







const ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;