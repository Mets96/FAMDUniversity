// TUTTE LE FUNZIONI DESTINATE ALL UTENTE
    
///########################################################  SCHEMI MONGOOSE
Account=require('../models/account');
Prof=require('../models/prof');
Profile=require('../models/profile');
Student=require('../models/student');
Informatica=require('../models/carriera/informatica');
Chimica=require('../models/carriera/chimica');
Fisica=require('../models/carriera/fisica');
///######################################################## IMPORT PACKAGE NODE
var jwt= require('jwt-simple');
var multer	=	require('multer');
var fs= require('fs');
var moment =require('moment-timezone');
var time = require('time');

///########################################################  VARIABILI UTILIZZATE NELLE FUNZIONI

///########################################################  Funzioni per la gestione della registrazione

exports.addStudent = function(req,res,next) {
     
    if (!req.body.password || !req.body.username) {
        return  res.json({success: false, msg: 'username e password richiesti'});
    }
    if (!req.body.email) {
        return  res.json({success: false, msg: 'email non valida.'});
    }
    if (!req.body.firstname || !req.body.lastname) {
        return  res.json({success: false, msg: 'nome e cognome necessari'});
    }else{
        var timestamp=new Date();
        var date=moment.tz(timestamp,"Europe/Amsterdam");
        var date=date.format().toString();
        var newAccount= new Account({
            username: req.body.username, 
            password: req.body.password,
            email:req.body.email,
            role:'student',
            register_date:date,
        });
        newAccount.save(function(err,user){
            if(err){
                if(err.code==11000){
                    Account.findOne({
                        username:req.body.username,
                    }).exec(function(err1,success){
                        if (err1){
                            return res.json({success:false,msg:'Errore durante il controllo del username'});
                        }
                        if(success){
                            return res.json({success:false,msg:'Username già usato'});
                        }
                        if(!success){
                            return res.json({success:false,msg:'Email già usata'});
                        }
                    })
                }
                else
                    return res.json({success:true,msg:'errore durante la creazione dell\'account'});
            }if(user){
                // Se l'account è stato creato allora creiamo il corso personale dell'utente in base all'corso che lui ha inserito.
                if(req.body.corso!=="informatica" && req.body.corso!=="fisica" && req.body.corso!=="chimica"){
                    deleteAccount(user._id);
                    return  res.json({success: false, msg: 'corso non corretto.'});
                }
                var timestamp=req.body.bod;
                var date=moment.tz(timestamp,"Europe/Amsterdam");
                var date=date.format().toString();
                var x = date.substr(0, 10);
                if(req.body.corso=='informatica'){
                    var newInformatica = new Informatica({
                        account_id:user._id,
                    });
                    newInformatica.save(function(err,informatica){
                        if (err){
                            if(err.code==11000){
                                return res.json({success:false,masg:'carriera già esistente per questo utente'});
                            }else{
                                deleteAccount(user._id);
                                return res.json({success:false,msg:'impossibile creare il corso'});
                            }
                        }else{
                            
                            var newStudent = new Student({
                                account_id:user._id,
                                carriera_id:informatica._id,
                                firstname:req.body.firstname,
                                lastname:req.body.lastname,
                                bod:x,
                                gender:req.body.gender,
                                corso:req.body.corso,
                                email:user.email,
                                address:req.body.address,
                                cell:req.body.cell
                            });
                            if(req.body.gender!=="maschio" && req.body.gender!=="femmina"){
                                deleteAccount(user_id);
                                deleteInformatica(informatica._id);
                                return  res.json({success: false, msg: 'genere non corretto'});
                            }
                            newStudent.save(function(err){
                                if (err){
                                    if(err.code==11000){
                                        return res.json({success:false,masg:'studente già esistente per questo utente'});
                                    }
                                    if(err.errors.bod.path=='bod'){
                                        deleteAccount(user._id);
                                        deleteInformatica(informatica._id);
                                        return res.json({success:false,msg:'la data di nascità inserità non è corretta.'});
                                    }else{
                                        deleteAccount(user._id);
                                        deleteInformatica(informatica._id);
                                        return res.json({success:false,msg:'impossibile creare il profilo studente'});
                                    }
                                }else{
                                    return res.json({success:true,msg:'profilo creato'});
                                }
                            })
                        }
                    })
                }
                if(req.body.corso=='fisica'){
                    var newFisica= new Fisica({
                        account_id:user._id,
                    });
                    newFisica.save(function(err,mate){
                        if (err){
                            if(err.code==11000)
                                return res.json({success:false,masg:'carriera già esistente per questo utente'});     
                            else{
                                deleteAccount(user._id)
                                return res.json({success:false,msg:'impossibile creare il corso'});
                            }
                        }else{
                            var newStudent = new Student({
                                account_id:user._id,
                                carriera_id:mate._id,
                                firstname:req.body.firstname,
                                lastname:req.body.lastname,
                                bod:x,
                                gender:req.body.gender,
                                corso:req.body.corso,
                                email:user.email,
                                address:req.body.address,
                                cell:req.body.cell,
                            });
                            if(req.body.gender!=="maschio" && req.body.gender!=="femmina"){
                                deleteAccount(user._id);
                                deleteFisica(mate._id);
                                return  res.json({success: false, msg: 'genere non corretto'});
                            }
                            newStudent.save(function(err){
                                if (err){
                                    if(err.code==11000){
                                        return res.json({success:false,masg:'studente già esistente per questo utente'});
                                    }
                                    if(err.errors.bod.path=='bod'){
                                        deleteAccount(user._id);
                                        deleteFisica(mate._id);
                                        return res.json({success:false,msg:'la data di nascità inserità non è corretta.'});
                                    }else{
                                        deleteAccount(user._id);
                                        deleteFisica(mate._id);
                                        return res.json({success:false,msg:'impossibile creare il profilo studente'});
                                    }
                                }else{
                                    return res.json({success:true,msg:'profilo creato'});
                                }
                            })
                        }
                    })
                }
                if(req.body.corso=='fisica'){
                    var newChimica = new Chimica({
                        account_id:user._id,
                    });
                    newChimica.save(function(err,bio){
                        if (err){
                            if(err.code==11000)
                                return res.json({success:false,masg:'carriera già esistente per questo utente'});     
                            else{
                                deleteAccount(user._id);
                                return res.json({success:false,msg:'impossibile creare il corso'});
                            }
                        }else{
                            var newStudent = new Student({
                                account_id:user._id,
                                carriera_id:bio._id,
                                firstname:req.body.firstname,
                                lastname:req.body.lastname,
                                bod:x,
                                gender:req.body.gender,
                                corso:req.body.corso,
                                email:user.email,
                                address:req.body.address,
                                cell:req.body.cell,
                            });
                            if(req.body.gender!=="maschio" && req.body.gender!=="femmina"){
                                deleteAccount(user._id);
                                deleteChimica(bio._id);
                                return  res.json({success: false, msg: 'genere non corretto'});
                            }
                            newStudent.save(function(err){
                                if (err){
                                    if(err.code==11000){
                                        return res.json({success:false,masg:'studente già esistente per questo utente'});
                                    }
                                    if(err.errors.bod.path=='bod'){
                                        deleteAccount(user._id);
                                        deleteChimica(bio._id);
                                        return res.json({success:false,msg:'la data di nascità inserità non è corretta.'});
                                    }else{
                                        deleteAccount(user._id);
                                        deleteChimica(bio._id);
                                        return res.json({success:false,msg:'impossibile creare il profilo studente'});
                                    }
                                }else{
                                    return res.json({success:true,msg:'profilo creato'});
                                }
                            })
                        }
                    })
                } 
            }
        })
    }
}

///########################################################  Funzioni per la gestione della registrazione di account comune
exports.addUser = function(req,res,next) {
    if (!req.body.password  || !req.body.username ) {
       return res.json({success: false, msg: 'username,password richiesti.'});
    }
    if(!req.body.email)
        return res.json({success: false, msg: 'email non valida.'});
    else{
        var timestamp=new Date();
        var date=moment.tz(timestamp,"Europe/Amsterdam");
        var date=date.format().toString()
        var newAccount= new Account({
            username: req.body.username, 
            password: req.body.password,
            email:req.body.email,
            register_date:date,
        });
        newAccount.save(function(err,user){
            if(err){
                if(err.code==11000){
                    Account.findOne({
                        username:req.body.username,
                    }).exec(function(err1,success){
                        if (err1){
                            return res.json({success:false,msg:'Errore durante il controllo del username'});
                        }
                        if(success){
                            return res.json({success:false,msg:'Username già usato'});
                        }
                        if(!success){
                            return res.json({success:false,msg:'Email già usata'});
                        }
                    })
                }else
                    return res.json({success:false,msg:'Errore durante la creazione dell\'account'});
            }if(user){
                if(!req.body.firstname || !req.body.lastname || !req.body.bod || !req.body.gender){
                    return  res.json({success:false,msg:'capi profilo richiesti'});
                }else{
                    var timestamp=req.body.bod;
                    var date=moment.tz(timestamp,"Europe/Amsterdam");
                    var date=date.format().toString();
                    var x = date.substr(0, 10);
                    var newProfile = new Profile({
                        account_id:user._id,
                        firstname:req.body.firstname,
                        lastname:req.body.lastname,
                        bod:x,
                        gender:req.body.gender,
                        email:user.email, 
                    });
                    if(req.body.gender!=="maschio" && req.body.gender!=="femmina"){
                        deleteAccount(user_id);
                        return  res.json({success: false, msg: 'genere non corretto'});
                    }               
                    newProfile.save(function(err){
                        if (err){   
                            if(err.code==11000)
                                return res.json({success:false,msg:'studente già esistente per questo utente'});
                            if(err.errors.bod.path=='bod'){
                                deleteAccount(user._id);
                                return res.json({success:false,msg:'la data di nascità inserità non è corretta.'}); 
                            }else{
                                deleteAccount(user._id);
                                return res.json({success:false,msg:'impossibile creare l\'account'});
                            }
                        }else{
                        return res.json({success:true,msg:'account creato'});
                        }
                    })
                }
            }
        })
    }
};

///########################################################  Funzioni per la gestione del login
exports.login = function(req,res) {
    Account.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) 
            return res.json({success: false, msg: 'errore durante il login,riprovare'}); 
        if (!user) {
            return res.json({success: false, msg: 'Autenticazione fallita,account non trovato'});
        }else{
        // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, process.env.SECRET);
                    // return the information including token as JSON
                 
                    return res.json({success: true, token:'JWT ' + token});
                }else{
                    return  res.json({success: false, msg: 'Autenticazione fallita,password errata.'});
                }
            });
        }
    });
};

exports.uploadPhoto=function(req,res){
    var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, process.env.SECRET);
            User.findOne({
                name:decoded.name,
            }).exec(function (err, currentaccount){
                if (err) 
                    return res.json({success:false,msg:'token non valido'});
                if (!currentaccount)
                   return res.json({success:false,msg:'non hai i permessi per questa operazione'});
                var storage	=	multer.diskStorage({
                    destination: function (req, file, callback) {
                        callback(null, './uploads');
                    },
                    filename: function (req, file, callback) {
                        callback(null, file.fieldname + '-' + Date.now());
                    }
                });
                var upload = multer({ storage : storage}).single('photoProfile');
	                upload(req,res,function(err) {
		        if(err) {
                   return  res.json({success:false,msg:'errore durante l\'upload del file'});
		        }
                    foto=req.file;
                   return  res.json({success:true,msg:'file salvato'});

                })   
	        });
        };
}


exports.pullProfileUser = function(req,res) {
    var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, process.env.SECRET);
            Profile.findOne({
                account_id:decoded._id
            }).exec(function (err, currentaccount){
                if (err) {
                    return res.json({success:false,msg:'non sei autorizzato'});
                }
                if (!currentaccount) {
                    return  res.json({success:false,msg:'profilo di ' + decoded.name + 'non trovato.'});
                }
                return res.status(200).send(currentaccount);
            });
		}else{
            return  res.json({success:false,msg:'Autorizzazione non valida'});
        }
};


exports.verifyRole =function(req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
            Account.findOne({
                _id:decoded._id,
                role:'student'
            }).exec(function (err, student){
                if (err) 
                    return res.json({success:false,msg:'non sei loggato'});
                if(student)
                    return res.json({success:true,msg:'student'});
                if (!student){
                    Account.findOne({
                        _id:decoded._id,
                        role:'prof'
                    }).exec(function (err, prof){
                        if (err) 
                            return res.json({success:false,msg:'non sei loggato'});
                        if (prof)
                            return res.json({success:true,msg:'prof'});
                        if (!prof){
                            Account.findOne({
                                _id:decoded._id,
                                role:'admin'
                            }).exec(function (err, admin){
                                if (err) 
                                    return res.json({success:false,msg:'non sei loggato'});
                                if (!admin) 
                                    return  res.json({success:false,msg:'user'});
                                if (admin)
                                    return res.json({success:true,msg:'admin'});
                            });
                        }
                    });
                }
            });                    
		}else{
            return  res.json({success:false,msg:'Autorizzazione non valida'});
        }
}

///######################################################## ALTRE FUNZIONI UTILIZZATE
getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }else{
            return null;
        }
    }else{
        return null;
    }
}

deleteAccount = function (user) {
    Account.remove({
        _id : user
    }, function(err) {
        if (err)
            return res.json({success:false,msg:'errore durante la cancellazione dell\'account, contattare un amministratore'});
	});
}
deleteInformatica = function (user) {
    Informatica.remove({
        _id : user
    }, function(err) {
        if (err)
            return res.json({success:false,msg:'errore durante la cancellazione di informatica, contattare un amministratore'});
	});
}
deleteChimica = function (user) {
    Chimica.remove({
        _id : user
    }, function(err) {
        if (err)
            return res.json({success:false,msg:'errore durante la cancellazione di chimica, contattare un amministratore'});
	});
}
deleteFisica = function (user) {
    Fisica.remove({
        _id : user
    }, function(err) {
        if (err)
            return res.json({success:false,msg:'errore durante la cancellazione di fisica, contattare un amministratore'});
	});
}