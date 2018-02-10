// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
 
.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
  
  .state('outsidelogin', {
    url: '/login',
    templateUrl: 'templates/outside/login.html',
    controller: 'LoginCtrl'
  })
  .state('outsideregister', {
    url: '/register',
    templateUrl: 'templates/outside/register.html',
    controller: 'RegisterCtrl'
  })
  .state('outsideregisterstudent', {
    url: '/registerstudet',
    templateUrl: 'templates/outside/registerstudent.html',
    controller: 'RegisterstudentCtrl'
  })
   .state('outsidehome', {
    url: '/outsidehome',
    templateUrl: 'templates/outside/home.html',
    controller: 'HomeCtrl'
   })
   .state('outsideinformatica', {
    url: '/informatica',
    templateUrl: 'templates/outside/informatica.html',
    controller: 'InformaticaCtrl'
   })
   .state('outsidefisica', {
    url: '/fisica',
    templateUrl: 'templates/outside/fisica.html',
    controller: 'FisicaCtrl'
   })
   .state('outsidechimica', {
    url: '/chimica',
    templateUrl: 'templates/outside/chimica.html',
    controller: 'ChimicaCtrl'
   })
   // INSIDE
   .state('home', {
    url: '/home',
    templateUrl: 'templates/insidehome.html',
    controller: 'HomeCtrl'
   })
   .state('student', {
    url: '/student',
    templateUrl: 'templates/menu/student.html',
    controller: 'StudentCtrl'
   })
   .state('prof', {
    url: '/prof',
    templateUrl: 'templates/menu/prof.html',
    controller: 'ProfCtrl'
   })
   .state('admin', {
    url: '/admin',
    templateUrl: 'templates/menu/admin.html',
    controller: 'AdminCtrl'
   })
   .state('profilouser', {
    url: '/profilouser',
    templateUrl: 'templates/profilo/profileuser.html',
    controller: 'profiloUserCtrl'
   })
   .state('insidefisica', {
    url: '/insidefisica',
    templateUrl: 'templates/insidefisica.html',
    controller: 'FisicaCtrl'
   })
   .state('insideinformatica', {
    url: '/insideinformatica',
    templateUrl: 'templates/insideinformatica.html',
    controller: 'InformaticaCtrl'
   })
   .state('insidechimica', {
    url: '/insidechimica',
    templateUrl: 'templates/insidechimica.html',
    controller: 'ChimicaCtrl'
   })
   .state('profileadmin', {
    url: '/profileadmin',
    templateUrl: 'templates/profilo/profileadmin.html',
    controller: 'profiloAdminCtrl'
   })
   

   // SOLO ADMIN
   .state('addprof', {
    url: '/addprof',
    templateUrl: 'templates/addprof.html',
    controller: 'addProfCtrl'
   })
  .state('verifyfeedback', {
    url: '/verifyfeedback',
    templateUrl: 'templates/feedback/verifyfeedback.html',
    controller: 'VerifyFeedbackCtrl'
   })


   // SOLO STUDENTI
   .state('profilostudent', {
    url: '/profiloStudent',
    templateUrl: 'templates/profilo/profilostudent.html',
    controller: 'ProfiloStudentCtrl'
   })
   
   .state('appellostudent', {
    url: '/appellostudent',
    templateUrl: 'templates/appello/appellostudent.html',
    controller: 'VediAppelloCtrl'
   })
   .state('appelloiscritto', {
    url: '/appelloiscritto',
    templateUrl: 'templates/appello/appelloiscritto.html',
    controller: 'AppelloIscrittoCtrl'
   })
   .state('risultatiappello', {
    url: '/risultati',
    templateUrl: 'templates/appello/risultatiappello.html',
    controller: 'RisultatiAppelloCtrl'
   })
   .state('feedback', {
    url: '/feedback',
    templateUrl: 'templates/feedback/feedback.html',
    controller: 'FeedbackCtrl'
   })
   
  // CARRIERE
    .state('carrierachimica', {
    url: '/carrierachimica',
    templateUrl: 'templates/carriera/carrierachimica.html',
    controller: 'CarrieraChimicaCtrl'
   })
   .state('carrierainformatica', {
    url: '/carrierainformatica',
    templateUrl: 'templates/carriera/carrierainformatica.html',
    controller: 'CarrieraInformaticaCtrl'
   })
   .state('carrierafisica', {
    url: '/carrierafisica',
    templateUrl: 'templates/carriera/carrierafisica.html',
    controller: 'CarrieraFisicaCtrl'
   })

   // SOLO PROF
   .state('newappello', {
    url: '/newappello',
    templateUrl: 'templates/appello/newappello.html',
    controller: 'AppelloCtrl'
   })
   .state('deleteappello', {
    url: '/deleteappello',
    templateUrl: 'templates/appello/deleteappello.html',
    controller: 'AppelloCtrl'
   })
   .state('editappello', {
    url: '/editappello',
    templateUrl: 'templates/appello/editappello.html',
    controller: 'AppelloCtrl'
   })
   .state('chiudiappello', {
    url: '/chiudiappello',
    templateUrl: 'templates/appello/chiudiappello.html',
    controller: 'AppelloCtrl'
   })
   .state('elencoappello', {
    url: '/elencoappello',
    templateUrl: 'templates/appello/elencoappello.html',
    controller: 'AppelloCtrl'
   })
   
   
   

  $urlRouterProvider.otherwise('/home');
})
 
.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'outsidehome' && next.name !== 'outsidelogin' && next.name !== 'outsideregister' && next.name !== 'outsideregisterstudent' && next.name !== 'outsideinformatica' && next.name !== 'outsidefisica' && next.name !== 'outsidechimica') {
        event.preventDefault();
        $state.go('outsidehome');
      }
    }
  });
});

