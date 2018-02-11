var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
  
// set up a mongoose model
var ProfileSchema = new Schema({
    
    account_id:{
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
    email:{
        type:String,
    }
});
 
module.exports = mongoose.model('Profile', ProfileSchema);
