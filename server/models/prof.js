var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfSchema = new Schema({
    
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
    corso:{
        type:String
    },
    insegnamenti:{
        type:String,
        index:true,
    },
    cell:{
        type:String
    },
    email:{
        type:String
    }
     
    });

module.exports = mongoose.model('Prof', ProfSchema);
