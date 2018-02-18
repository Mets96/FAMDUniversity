angular.module("starter")

//############################################## CONTROLLER PER LA VERIFICA DEL LOGIN.
.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('outside.login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sessione scaduta rifare il login'
    });
  });
})

//############################################## CONTROLLER PER LA HOME PAGE 
 .controller('HomeCtrl', function($scope, AuthService, $ionicPopup, $state,$http) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };

  $scope.inside=function(){
    $http.get('/verifyrole').then(success, error);
    function success(currentaccount){
      if(currentaccount.data.msg=='student'){
        $state.go('student')
      }
      if(currentaccount.data.msg=='admin'){
        $state.go('admin')
      }
      if(currentaccount.data.msg=='prof'){
        $state.go('prof')
      }
      if(currentaccount.data.msg=='user'){
        $state.go('profilouser')
      }
    }
    function error(currentaccount){
      var alertPopup = $ionicPopup.alert({
        title:'success ' + currentaccount.data.success,
        template: currentaccount.data.msg
      });
    }
  };
})

//############################################## CONTROLLER PER IL LOGIN
.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state,$http) {
  $scope.user = {
    username: '',
    password: ''
  };
 
  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $http.get('/verifyrole').then(success, error);
      function success(currentaccount){
        if(currentaccount.data.msg=='student'){
          $state.go('student')
        }
        if(currentaccount.data.msg=='admin'){
          $state.go('admin')
        }
        if(currentaccount.data.msg=='prof'){
          $state.go('prof')
        }
        if(currentaccount.data.msg=='user'){
          $state.go('home')
        }
      }
      function error(currentaccount){
        var alertPopup = $ionicPopup.alert({
          title:'success ' + currentaccount.data.success,
          template: currentaccount.data.msg
        });
      }
    },function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})

//############################################## CONTROLLER PER LA REGISTRAZIONE DI UN UTENTE  
.controller('RegisterCtrl', function($scope, AuthService, $ionicPopup, $state,$http) {
  $scope.user = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    bod: '',
    gender: '',
 };

  $scope.addUser = function() {    
    AuthService.register($scope.user).then(function(msg) {
      AuthService.login($scope.user).then(function(msg) {
        $http.get('/verifyrole').then(success, error);
        function success(currentaccount){
          if(currentaccount.data.msg=='student'){
            $state.go('student')
          }
          if(currentaccount.data.msg=='admin'){
            $state.go('admin')
          }
          if(currentaccount.data.msg=='prof'){
            $state.go('prof')
          }
          if(currentaccount.data.msg=='user'){
            $state.go('home')
          }        
        }
        function error(currentaccount){
          var alertPopup = $ionicPopup.alert({
            title:'success ' + currentaccount.data.success,
            template: currentaccount.data.msg
          });
        }
      })
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    },function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg 
      })
    })
  }




})

//############################################## CONTROLLER PER LA REGISTRAZIONE STUDENTE
.controller('RegisterstudentCtrl', function($scope, AuthService, $ionicPopup, $state,$http) {
  $scope.user = {
    username:'',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    bod: '',
    gender: '',
    address: '',
    corso: '',
    cell: '',
    
 };


  $scope.addStudent = function() {    
    AuthService.registerstudent($scope.user).then(function(msg) {
      AuthService.login($scope.user).then(function(msg) {
        $http.get('/verifyrole').then(success, error);
        function success(currentaccount){
          if(currentaccount.data.msg=='student'){
            $state.go('student')
          }
          if(currentaccount.data.msg=='admin'){
            $state.go('admin')
          }
          if(currentaccount.data.msg=='prof'){
            $state.go('prof')
          }
          if(currentaccount.data.msg=='user'){
            $state.go('home')
          }         
        }
        function error(currentaccount){
          var alertPopup = $ionicPopup.alert({
            title:'success ' + currentaccount.data.success,
            template: currentaccount.data.msg
          });
        }
      })
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    },function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg 
      })
    })
  }


})

//############################################## CONTROLLER PER LA PAGINA D'INFORMATICA
.controller('InformaticaCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };

})

//############################################## CONTROLLER PER LA PAGINA DI FISICA
.controller('FisicaCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };
})

//############################################## CONTROLLER PER LA PAGINE DI CHIMICA
.controller('ChimicaCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };
})

//################################################################################################### INSIDE
//############################################## CONTROLLER PER il Profilo di un Utente
.controller('profiloUserCtrl',function($scope, AuthService, API_ENDPOINT, $http, $state, $ionicPopup) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outside.login');
  };
 

  $http.get('/pullProfileUser').then(success, error);
  function success(currentaccount){
    $scope.currentaccount = currentaccount.data;
  }
  function error(currentaccount){
    var alertPopup = $ionicPopup.alert({
      title: 'Register failed!',
      template: 'errore durante la ricerca del profilo'
    });
  }

  function Main($scope) {
    $scope.currentaccount.email;
    $scope.currentaccount.firstname;
    $scope.currentaccount.lastname;
    $scope.currentaccount.bod;
    $scope.currentaccount.gender;
    $scope.currentaccount.corso;
    $scope.currentaccount.address;
    $scope.currentaccount.cell;
  }
})

//############################################## CONTROLLER PER LE FUNZIONE ADMIN

.controller('AdminCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };
})

//############################################## CONTROLLER PER LA REGISTRAZIONE DI UN PROFESSORE 
.controller('addProfCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };
  

  $scope.user = {
      username:'',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      bod: '',
      gender: '',
      insegnamenti: '',
      corso: '',
      cell: '',
      
  };

  $scope.addProf = function() {    
    AuthService.registerprof($scope.user).then(function(msg) {
      $state.go('admin');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    },function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
})

//############################################## CONTROLLER PER LA VERIFICA DI UN FEEDBACK
.controller('VerifyFeedbackCtrl', function($scope, AuthService, $ionicPopup, $state,$http) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };

   $http.get("/showprof")
    .success(function(result) {
          $scope.prof = result.msg      
    }) 
    .error(function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: error.msg
      })
    }); 

   $scope.verifyFeedback = function (appello){
    $http.post("/verifyFeedback",appello)
    .success(function(result) {
      $scope.feedback = result.msg
      if($scope.feedback==0){
        var alertPopup = $ionicPopup.alert({
          title: 'success',
          template: 'non ci sono feedback per questo professore'
        }) 
      }    
    }) 
    .error(function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: error.msg
      })
    }); 
  };

})

//############################################## CONTROLLER PER LE FUNZIONI DI UNO STUDENTE
.controller('StudentCtrl', function($scope, AuthService, $ionicPopup, $state,$http) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };

})


//############################################## CONTROLLER PER IL PROFILO DI UNO STUDENTE
.controller('ProfiloStudentCtrl',function($scope, AuthService, API_ENDPOINT, $http, $state, $ionicPopup) {
  // visualizza il profilo dello studente
  $http.get('/pullProfileStudent').then(success, error);
  function success(currentaccount){
    $scope.currentaccount = currentaccount.data;
  }
  function error(currentaccount){
    var alertPopup = $ionicPopup.alert({
      title: 'Register failed!',
      template: 'errore durante la ricerca del profilo'
    });
  }

  function Main($scope) {
    $scope.currentaccount.email;
    $scope.currentaccount.firstname;
    $scope.currentaccount.lastname;
    $scope.currentaccount.bod;
    $scope.currentaccount.gender;
    $scope.currentaccount.corso;
    $scope.currentaccount.address;
    $scope.currentaccount.cell;
  }
 // aggiorna profilo dello studente
  $scope.update = function () {
    $http.put('/pushProfile', {
      address:($scope.currentaccount.address),
      cell:($scope.currentaccount.cell),
    })
    .success(function (data, status, headers, config) {
      $state.go('profilostudent');
      var alertPopup = $ionicPopup.alert({
        title: 'Update success!',
        template: 'update success'
      });
    })
    .error(function (data, status) {
      var alertPopup = $ionicPopup.alert({
        title: 'Update error!',
        template: 'errore nei campi'
      });
    });
 }                                      
 

  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };
  
// Mostra carrriera dello studente
  $scope.ShowCarriera = function() {
    $http.get('/verifyCarriera').then(success, error);
    function success(currentaccount){
      if(currentaccount.data.msg=='informatica'){
        $state.go('carrierainformatica')
      }if(currentaccount.data.msg=='fisica'){
        $state.go('carrierafisica')
      }if(currentaccount.data.msg=='chimica'){
        $state.go('carrierachimica')
      }
    }
    function error(currentaccount){
      var alertPopup = $ionicPopup.alert({
        title:'success ' + currentaccount.data.success,
        template: currentaccount.data.msg
      });
    }
  }
  
})


//############################################## CONTROLLER PER ISCRIVERE LO STUDENTE ALL'APPELLO
.controller('VediAppelloCtrl',function($scope, AuthService, $http, $state, $ionicPopup) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };
  
 
    $http.get('/vediappello').then(success, error);
    function success(doc){
      $scope.doc = doc.data.msg;
    }
    function error(doc){
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: 'errore durante la ricerca del profilo'
      });
    }
    
   $scope.iscrizioneAppello = function (appello){
    $http.post("/iscrizioneAppello",appello)
    .success(function(result) {
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: result.msg
      })
    }) 
    .error(function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: error.msg
      })
    }); 
  }; 

})

//############################################## CONTROLLER PER  VEDERE LE ISCRIZIONI E CANCELLARE

.controller('AppelloIscrittoCtrl',function($scope, AuthService, $http, $state, $ionicPopup) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };
  $http.get('/vediiscrizione').then(success, error);
    function success(elenco){
      $scope.elenco = elenco.data.msg;
    }
    function error(elenco){
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: 'errore durante la ricerca del profilo'
      });
    }
    
  
    $scope.deleteIscrizione = function (appello){
    $http.post("/deleteIscrizione",appello)
    .success(function(result) {
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: result.msg
      })
    }) 
    .error(function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: error.msg
      })
    }); 
  }; 

})
//############################################## CONTROLLER PER  VEDERE I RISULTATI E CONFERMARE IL VOTO

.controller('RisultatiAppelloCtrl',function($scope, AuthService, $http, $state, $ionicPopup) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };
  $scope.ShowMenu = function() {
      $state.go('student')
  }

  $http.get('/mostraRisultati').then(success, error);
    function success(elenco){
      $scope.elenco = elenco.data.msg;

    }
    function error(elenco){
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: 'errore durante la ricerca del profilo'
      });
    }

    $scope.confermaVoto = function (appello){
    $http.post("/confermaVoto",appello)
    .success(function(result) {
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: result.msg
      })
    }) 
    .error(function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: error.msg
      })
    }); 
  }; 


})

.controller('FeedbackCtrl',function($scope, AuthService, $http, $state, $ionicPopup) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };
  $scope.ShowMenu = function() {
      $state.go('student')
  }

  $http.get('/vediProf').then(success, error);
    function success(prof){
      $scope.prof = prof.data.msg;
    }
    function error(carriera){
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: 'errore durante la ricerca del profilo'
      });
    }

   $scope.addfeedback = function (appello){
    $http.post("/inserisciFeedback",appello)
    .success(function(result) {
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: result.msg
      })
    }) 
    .error(function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: error.msg
      })
    }); 
  }; 
})

//############################################## CONTROLLER PER LA CARRIERA DI CHIMICA
.controller('CarrieraChimicaCtrl', function($scope, AuthService, $ionicPopup, $state,$http) {
  $http.get('/pullCarriera').then(success, error);
    function success(carriera){
      $scope.carriera = carriera.data;
    }
    function error(carriera){
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: 'errore durante la ricerca del profilo'
      });
    }

  function Main($scope) {
    $scope.carriera.carriera;
    $scope.carriera.msg.computer_science;
    $scope.carriera.msg.fisica;
    $scope.carriera.msg.analisi;
    $scope.carriera.msg.biochimica;
    $scope.carriera.msg.inglese;
  }

  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };

})

//############################################## CONTROLLER PER LA CARRIERA DI INFORMATICA
.controller('CarrieraInformaticaCtrl', function($scope, AuthService, $ionicPopup, $state,$http) {
  $http.get('/pullCarriera').then(success, error);
    function success(carriera){
      $scope.carriera = carriera.data;
    }
    function error(carriera){
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: 'errore durante la ricerca del profilo'
      });
    }
  
  function Main($scope) {
    $scope.carriera.carriera;
    $scope.carriera.msg.logica;
    $scope.carriera.msg.programmazione;
    $scope.carriera.msg.algoritimi;
    $scope.carriera.msg.sistemi_operativi;
    $scope.carriera.msg.analisi;
  }
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };


})

//############################################## CONTROLLER PER LA CARRIERA DI FISICA
.controller('CarrieraFisicaCtrl', function($scope, AuthService, $ionicPopup, $state,$http) {
  $http.get('/pullCarriera').then(success, error);
  function success(carriera){
    $scope.carriera = carriera.data;
  }
  function error(carriera){
    var alertPopup = $ionicPopup.alert({
      title: 'Register failed!',
      template: 'errore durante la ricerca del profilo'
    });
  }

  function Main($scope) {
    $scope.carriera.carriera;
    $scope.carriera.msg.logica;
    $scope.carriera.msg.geometria;
    $scope.carriera.msg.fisica;
    $scope.carriera.msg.elettromagnetismo;
    $scope.carriera.msg.analisi;
  }
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };
  
})

//############################################## CONTROLLER PER LE FUNZIONI DI UN PROFESSORE
.controller('ProfCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };

})
//############################################## CONTROLLER PER LA CREAZIONE DI UN NUOVO APPELLO

.controller('AppelloCtrl', function($scope, AuthService, $ionicPopup, $state,$http) {

  $scope.logout = function() {
    AuthService.logout();
    $state.go('outsidehome');
  };
 
  

  $scope.addAppello = function (appello){
    $http.post("/addAppello",appello)
    .success(function(result) {
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: result.msg
      })
    }) 
    .error(function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: error.msg
      })
    }); 
  }; 

  $scope.deleteAppello = function (appello){
    $http.post("/deleteappello",appello)
    .success(function(result) {
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: result.msg
      })
    }) 
    .error(function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: error.msg
      })
    }); 
  }; 

  $scope.editAppello = function (appello){
    $http.post("/editappello",appello)
    .success(function(result) {
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: result.msg
      })
    }) 
    .error(function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: error.msg
      })
    }); 
  }; 

  $http.get('/mostraappelli').then(success, error);
  function success(doc){
    $scope.doc = doc.data.msg;
  }
  function error(doc){
    var alertPopup = $ionicPopup.alert({
      title: 'Register failed!',
      template: 'errore durante la ricerca del profilo'
    });
  }
  
$scope.chiudiAppello = function (appello){
    $http.post("/chiudiappello",appello)
    .success(function(result) {
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: result.msg
      })
    }) 
    .error(function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: error.msg
      })
    }); 
  }; 

  

  $scope.iscrittiAppello = function (appello){
    $http.post("/iscrittiAppello",appello)
    .success(function(result){
      $scope.iscritti = result.msg
      console.log($scope.iscritti)
      if($scope.iscritti==0){
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: 'non ci sono iscritti'
      })  
      }
    })
    .error(function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: error.msg
      })
    }); 
  }; 


  $scope.caricavoto = function (appello){
    $http.post("/votiprovvisoriAppello",appello)
    .success(function(result){
      if($scope.iscritti==0){
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: 'non ci sono studenti iscritti senza voto'
      })  
      }
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: result.msg
      })
    })
    .error(function(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: error.msg
      })
    }); 
  }; 

})
