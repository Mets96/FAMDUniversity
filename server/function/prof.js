///########################################################  TUTTE LE FUNZIONI DESTINATE AI DOTTORI
Account=require('../models/account');
Prof=require('../models/prof');
Profile=require('../models/profile');
Student=require('../models/student');
Appello=require('../models/appello');
Elenco=require('../models/elencostudenti');
///######################################################## IMPORT PACKAGE NODE
var jwt= require('jwt-simple');
var moment =require('moment-timezone');

///########################################################  VARIABILI UTILIZZATE NELLE FUNZIONI

///######################################################## Funzione per creare un appello
exports.addAppello = function(req,res) {
    var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, process.env.SECRET);
            Account.findOne({
                _id:decoded._id,
            }).exec(function (err,account){
                if (err) 
                    return res.json({success:false,msg:'token non valido'});
                if(!account)
                    return res.json({succes:false,msg:'account non trovato'});
                if(account) {
                    if (account.role=='prof'){
                        Prof.findOne({
                            account_id:decoded._id,
                        }).exec(function (err,prof){
                            if(err)
                                return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                            if(prof){
                                var timestamp=req.body.data;
                                var date=moment.tz(timestamp,"Europe/Amsterdam");
                                var date=date.format().toString();
                                var x = date.substr(0, 10);
                                var y = date.substring(11, 16);

                                Appello.findOne({
                                    esame:prof.insegnamenti,
                                    data:x,
                                    ora:y,
                                }).exec(function(err,verify){
                                    if(err) 
                                        return res.json({err});
                                    if(!verify){
                                            var newAppello =new Appello({
                                                prof_id:prof.account_id,
                                                name_prof:prof.firstname +' ' + prof.lastname,
                                                corso:prof.corso, 
                                                esame:prof.insegnamenti,
                                                data:x,
                                                ora:y,
                                            })
                                            newAppello.save(function(err,appello){
                                                if (err)
                                                    return res.json({success:false,msg:'errore druante la creazione dell\'appello'});
                                                if (appello)
                                                   return res.json({succes:true,msg:'appello creato'});
                                            })    
                                    }if(verify)
                                            return res.json({succes:false,msg:'appello già esistente'});
                                    })
                            }
                        })
                    }else{
                        return res.json({success:false,msg:'non sei un professore'});
                    }   
            }
        })
    }else{
        return res.json({succes:false,msg:'token non valido'});
    }
}

exports.deleteAppello = function (req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Account.findOne({   
                _id:decoded._id,
         }).exec(function (err,account){
            if (err) 
                return res.json({success:false,msg:'token non valido'});
             else {
                if (account.role=='prof'){
                    Prof.findOne({
                        account_id:decoded._id,
                    }).exec(function (err,prof){
                        if(err)
                            return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                        else{
                            Appello.findOne({
                                _id:req.body.id
                            }).exec(function(err,appello){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la riceca dell\'appello'});
                                if(!appello)
                                    return res.json({success:false,msg:'appello non esistente'});
                                if(appello){
                                    deleteAllElenco(appello._id);
                                    deleteAppello(appello._id);
                                    return res.json({success:true,msg:'appello cancellato'});
                                }    
                            })
                        }
                    }) 
                }else{
                    return res.json({success:false,msg:'non sei un professore'});
                }
            }                    
        })    
    }        
}

exports.editAppello = function (req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Account.findOne({   
                _id:decoded._id,
         }).exec(function (err,account){
            if (err) 
                return res.json({success:false,msg:'token non valido'});
             else {
                if (account.role=='prof'){
                    Prof.findOne({
                        account_id:decoded._id,
                    }).exec(function (err,prof){
                        if(err)
                           return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                        else{
                            var timestamp=req.body.data;
                            var date=moment.tz(timestamp,"Europe/Amsterdam");
                            var date=date.format().toString();
                            var x = date.substr(0, 10);
                            var y = date.substring(11, 16);
                            Appello.findOneAndUpdate({
                                _id:req.body.id,
                            },{
                                $set:{
                                    data:x,
                                    ora:y,
                                }
                            },{new: true},function(err,appello){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la riceca dell\'appello'});
                                if(!appello)
                                    return res.json({success:false,msg:'appello non esistente'});
                                if(appello){
                                    return res.json({success:true,msg:'appello modificato'});
                                }    
                            })
                        }
                    }) 
                }else{
                    return res.json({success:false,msg:'non sei un professore'});
                }
            }                    
        })    
    }        
}

exports.chiudiAppello = function (req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Account.findOne({   
                _id:decoded._id,
         }).exec(function (err,account){
            if (err) 
                return res.json({success:false,msg:'token non valido'});
             else {
                if (account.role=='prof'){
                    Prof.findOne({
                        account_id:decoded._id,
                    }).exec(function (err,prof){
                        if(err)
                            return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                        else{
                            Appello.findOneAndUpdate({
                                _id:req.body.id
                            },{
                                $set:{
                                    aperto:false,
                                }
                            },{new: true},function(err,appello){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la riceca dell\'appello'});
                                if(!appello)
                                    return res.json({success:false,msg:'appello non esistente'});
                                if(appello){
                                    return res.json({success:true,msg:'appello chiuso'});
                                }    
                            })
                        }
                    }) 
                }else{
                    return res.json({success:false,msg:'non sei un professore'});
                }
            }                    
        })    
    }        
}


exports.iscrittiAppello = function (req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Account.findOne({   
                _id:decoded._id,
         }).exec(function (err,account){
            if (err) 
                return res.json({success:false,msg:'token non valido'});
             else {
                if (account.role=='prof'){
                    Prof.findOne({
                        account_id:decoded._id,
                    }).exec(function (err,prof){
                        if(err)
                            return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                        else{
                            Appello.findOne({
                                _id:req.body.id
                            }).exec(function(err,appello){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la riceca dell\'appello'});
                                if(!appello)
                                    return res.json({success:false,msg:'appello non esistente'});
                                if(appello){
                                    Elenco.find({
                                        appello_id:appello._id
                                    }).exec(function(err,doc){
                                        if (err)
                                            return res.json({success:true,msg:'errore durante la ricerca degli iscritti'});
                                        if(!doc)
                                            return res.json({success:true,msg:'elenco non trovato'});
                                        if(doc)
                                            return res.json({success:true,msg:doc});
                                    })
                                    
                                }    
                            })
                        }
                    }) 
                }else{
                    return res.json({success:false,msg:'non sei un professore'});
                }
            }                    
        })    
    }        
}

exports.votiprovvisoriAppello = function (req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Account.findOne({   
                _id:decoded._id,
         }).exec(function (err,account){
            if (err) 
                return res.json({success:false,msg:'token non valido'});
             else {
                if (account.role=='prof'){
                    Prof.findOne({
                        account_id:decoded._id,
                    }).exec(function (err,prof){
                        if(err)
                            return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                        else{
                            Appello.findOne({
                                _id:req.body.id
                            }).exec(function(err,appello){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la riceca dell\'appello'});
                                if(!appello)
                                   return res.json({success:false,msg:'appello non esistente'});
                                if(appello){
                                    if(req.body.provvisorio<18 || req.body.provvisorio>32)
                                        return res.json({succes:false,msg:'il voto non può essere accettato'});
                                    Elenco.findOneAndUpdate({
                                        appello_id:req.body.id,
                                        account_id:req.body.account_id,
                                        conferma:true,
                                        accettato:false,
                                    },{
                                        $set:{
                                            voto_provvisorio:req.body.provvisorio,
                                            conferma:false,
                                        }
                                    },{new: true},function(err,doc){
                                        if (err)
                                           return res.json({success:true,msg:'errore durante la ricerca degli iscritti'});
                                        if(!doc)
                                            return res.json({success:true,msg:'iscrizione non trovata o voto già inserito'});
                                        
                                        if(doc)
                                            return res.json({success:true,msg:'voto provvisorio caricato'});
                                    })
                                    
                                }    
                            })
                        }
                    }) 
                }else{
                    return res.json({success:false,msg:'non sei un professore'});
                }
            }                    
        })    
    }        
}

exports.mostraAppelli = function (req,res){
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Account.findOne({   
                _id:decoded._id,
         }).exec(function (err,account){
            if (err) 
                return res.json({success:false,msg:'token non valido'});
             else {
                if (account.role=='prof'){
                    Prof.findOne({
                        account_id:decoded._id,
                    }).exec(function (err,prof){
                        if(err)
                           return res.json({success:false,msg:'non è stato possibile trovare il profilo del professore'});
                        else{                            
                            Appello.find({
                                esame:prof.insegnamenti,
                                corso:prof.corso,
                                prof_id:prof.account_id,
                            }).exec(function(err,appello){
                                if(err)
                                    return res.json({success:false,msg:'errore durante la riceca dell\'appello'});
                                if(!appello)
                                    return res.json({success:false,msg:'appello non esistente'});
                                if(appello){
                                    return res.json({success:true,msg:appello});
                                }    
                            })
                        }
                    })
            }else{
                    return res.json({success:false,msg:'non sei un professore'});
                }
            }                    
        })    
    }        
}



// ALTRE FUNZIONI UTILIZZATE 

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

deleteElenco = function (user) {
    Elenco.remove({
        _id : user
    }, function(err) {
        if (err)
            res.status(400).send({success:false,msg:'errore durante la cancellazione dell\'elenco, contattare un amministratore'});
	});
}

deleteAppello = function (user) {
    Appello.remove({
        _id : user
    }, function(err) {
        if (err)
            res.status(400).send({success:false,msg:'errore durante la cancellazione dell\'elenco, contattare un amministratore'});
	});
}

deleteAllElenco = function (user) {
    Elenco.remove({
        appello_id : user
    }, function(err) {
        if (err)
            res.status(400).send({success:false,msg:'errore durante la cancellazione dell\'elenco, contattare un amministratore'});
	});
}