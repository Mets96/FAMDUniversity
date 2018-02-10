//create a new express router
const   express= require('express'),
        router=express.Router(),
        userController=require('./function/user');
        studentController=require('./function/student');
        profController=require('./function/prof');
        adminController=require('./function/admin');
var     passport= require('passport');



require('./config/passport')(passport);

module.exports = router;

//define routes

// ROUTE FOR USER

//router for account 
router.post('/addStudent',      userController.addStudent); //ok
router.post('/addUser',         userController.addUser);        //ok
router.post('/login',           userController.login);  //ok    
router.post('/uploadPhoto',     userController.uploadPhoto);
router.get('/pullProfileUser',          passport.authenticate('jwt', { session: false}),        userController.pullProfileUser);    
router.get('/verifyRole',               passport.authenticate('jwt', { session: false}),        userController.verifyRole);     //ok



//ROUTE FOR STUDENT

//route for profile  
router.get('/pullProfileStudent',       passport.authenticate('jwt', { session: false}),        studentController.pullProfileStudent); //ok
router.put('/pushProfile',              passport.authenticate('jwt', { session: false}),        studentController.pushProfile); //ok

//route for Pull Carriera
router.get('/pullCarriera',             passport.authenticate('jwt',{session:false}),           studentController.pullCarriera);        //ok
//route for verifica carriera
router.get('/verifycarriera',               passport.authenticate('jwt', { session: false}),           studentController.verifyCarriera); //ok


//route for appello
router.post('/iscrizioneAppello',       passport.authenticate('jwt',{session:false}),           studentController.iscrizioneAppello);//ok
router.post('/deleteIscrizione',        passport.authenticate('jwt',{session:false}),           studentController.deleteIscrizione);//ok
router.post('/confermaVoto',            passport.authenticate('jwt',{session:false}),           studentController.confermaVoto);
router.post('/inserisciFeedback',       passport.authenticate('jwt',{session:false}),           studentController.inserisciFeedback);
router.get('/vediappello',             passport.authenticate('jwt',{session:false}),           studentController.vediAppello);//ok
router.get('/vediiscrizione',             passport.authenticate('jwt',{session:false}),           studentController.vediIscrizione);//ok
router.get('/mostraRisultati',             passport.authenticate('jwt',{session:false}),           studentController.mostraRisultati);//ok
router.get('/vediProf',             passport.authenticate('jwt',{session:false}),           studentController.vediProf);//ok

// ROUTE FOR PROF
router.post('/addAppello',              passport.authenticate('jwt',{session:false}),           profController.addAppello);//ok
router.post('/deleteAppello',           passport.authenticate('jwt',{session:false}),           profController.deleteAppello);//ok
router.post('/editAppello',             passport.authenticate('jwt',{session:false}),           profController.editAppello);//ok
router.post('/chiudiAppello',           passport.authenticate('jwt',{session:false}),           profController.chiudiAppello);//ok
router.post('/iscrittiAppello',         passport.authenticate('jwt',{session:false}),           profController.iscrittiAppello);//ok
router.post('/votiprovvisoriAppello',    passport.authenticate('jwt',{session:false}),           profController.votiprovvisoriAppello);//ok
router.get('/mostraappelli',              passport.authenticate('jwt',{session:false}),           profController.mostraAppelli);//ok

//Route for Admin
router.post('/addProf',                 passport.authenticate('jwt',{session:false}),           adminController.addProf);//ok
router.post('/verifyFeedback',          passport.authenticate('jwt',{session:false}),           adminController.verifyFeedback);
router.get('/showprof',          passport.authenticate('jwt',{session:false}),           adminController.ShowProf);



// ALTRE ROUTE 
