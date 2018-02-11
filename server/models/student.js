var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
  
// set up a mongoose model
var StudentSchema = new Schema({
    
    account_id:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    carriera_id:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    bod:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    corso:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    cell:{
        type:String
    },
    email:{
        type:String
    },
    img:{
        filename:String,
        path:String
    }


});
 
module.exports = mongoose.model('Student', StudentSchema);    
