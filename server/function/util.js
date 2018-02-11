var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


/* ====================================
  VALIDATORS
====================================*/

emailValidator = 
//        [function(v) {return /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/.test(v);}, 
        [function(v) {return /^[a-zA-Z]+[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$/.test(v);}, 
         "{VALUE} is not a valid email address!"
        ];



/* ====================================
  SCHEMA
====================================*/

    
dateSchema = new Schema(
     {
       dd   : { type: String, required:true},
       mm   : { type: String, required:true},
       yyyy : { type: String, required:true}
      });

dateSchema.pre('save', function(next) 
 { 
  if (!this.dd || !this.mm || !this.yyyy)
    {next(new Error('date should be {dd:"xx", mm:"xx", yyyy:"xxxx"}'));}
  else {next();}
 });

