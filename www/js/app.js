(function(){
    var app=angular.module('starter', ['ionic'])
    app.config(function($stateProvider,$urlRouterProvider){
        $stateProvider.state('list',{
            url:'/list',
            controller:'ListController',
            templateUrl:'templates/list.html'
        });
        $stateProvider.state('edit',{
            url:'/edit/:id',
            controller:'EditController',
            templateUrl:'templates/edit.html'
        });
        $stateProvider.state('create',{
            url:'/create',
            controller:'CreateController',
            templateUrl:'templates/edit.html'
        });
        $urlRouterProvider.otherwise('/list');
    });
    app.controller('ListController',function($scope,NoteResource){
        $scope.notas=NoteResource.list();
        $scope.remove=function(id){
            NoteResource.remove(id);
        }
    });
    app.controller('EditController',function($scope,$state,NoteResource){
        $scope.viewTitle='Editar';
        $scope.id=$state.params.id;
        $scope.nota=angular.copy(NoteResource.get($scope.id));
        $scope.save=function(){
            NoteResource.update($scope.nota);
            $state.go('list');
        }
    });
    app.controller('CreateController',function($scope,$state,NoteResource){
        $scope.viewTitle='Crear';
        $scope.nota={
            id:new Date().getTime().toString(),
            title:'',description:''
        };
        $scope.save=function(){
            NoteResource.create($scope.nota);
            $state.go('list');
        }
    });
    app.run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })

    
}());
