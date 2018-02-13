var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ElencoSchema = new Schema({
   
   account_id:{
       type:String,required:true
   },
   appello_id:{
       type:String,required:true
   },
   esame:{
       type:String
   },
   nome:{
       type:String,
   },
   cognome:{
       type:String,
   },
   voto_provvisorio:{
       type:Number,min:18,max:31,default:null,
   },
   conferma:{
       type:Boolean,default:true
   },
   accettato:{
       type:Boolean,default:false,
   },
   voto_definitivo:{
       type:Number,min:18,max:31,default:null,
   },
   data:{
       type:String
   },
   ora:{
       type:String
   },
   
    });

module.exports = mongoose.model('Elenco', ElencoSchema);
