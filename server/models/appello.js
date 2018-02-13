var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppelloSchema = new Schema({
    
    prof_id:{
        type:String,
    },
    name_prof:{
        type:String
    },
    corso:{
        type:String,required:true
    },
    esame:{
        type:String,required:true
    },
    data:{
        type:String,required:true
    },
    ora:{
        type:String
    },
    number_iscritti:{
        type:Number,default:0
    },
    aperto:{
        type:Boolean,default:true
    },
     
    });

module.exports = mongoose.model('Appello', AppelloSchema);
