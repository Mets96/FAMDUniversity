var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
  
// set up a mongoose model
var FeedbackSchema = new Schema({

    student_id:{
        type:String
    },
    prof_id:{
        type:String,
        required:true,
        index:true
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    corso:{
        type:String
    },
    testo: {
        type: String,
        required: true
    },
    

});
 
module.exports = mongoose.model('Feedback', FeedbackSchema);    
