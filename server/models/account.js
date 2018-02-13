var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var SchemaTypes = mongoose.Schema.Types;
  
// set up a mongoose model
var accountSchema = new Schema({
    username: {
        type: String, 
        index:true,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    register_date:{ 
      type: String 
    },
    role: {
        type: String,
        enum: ['student','admin','prof','user'],
        default: 'user'
    },
    email: {
        type: String,
        unique:true,
        required:true,
        index:true,
        validate: function(email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
  }


});
 
accountSchema.pre('save', function (next) {
    var Account = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(Account.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                Account.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
accountSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
accountSchema.path('email').validate = function(email) {
  return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
};

module.exports = mongoose.model('Account', accountSchema);