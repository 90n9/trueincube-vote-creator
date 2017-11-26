angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'app/views/common/layouts/full.html',
    controller: function($scope){
      $('body').removeClass().addClass('nav-on-header smart-nav bg-alt');
    }
  })
  .state('app.main', {
    url: '/dashboard',
    title: 'Dashboard',
    templateUrl: 'app/views/main.html',
    controller: function(){
      //
    }
  })
  .state('app.projectlist',{
    url: '/project',
    title: 'Project List',
    templateUrl: 'app/views/projectlist.html',
    controller: function(){
      console.log('call project list');
    }
  })
  .state('app.projectdetail',{
    url: '/project/:projectId',
    title: 'Project Detail',
    params: {projectId:''},
    templateUrl: 'app/views/projectdetail.html',
    controller: function($scope, $stateParams, $state){
      $scope.projectId = $stateParams.projectId;
      //$state.go('app.projectdetail.overview', {projectId:$scope.projectId}, {reload:true});
    },
  })
  .state('app.projectdetail.overview',{
    url: '/overview',
    title: 'Project Detail Overview',
    params: {projectId:''},
    templateUrl: 'app/views/projectdetail/overview.html',
    controller: function($scope, $stateParams){
      $scope.projectId = $stateParams.projectId;
      console.log('overview');
      console.log($scope.projectId);
    }
  })
  .state('app.projectdetail.design',{
    url: '/design',
    title: 'Project Detail Design',
    params: {projectId:''},
    templateUrl: 'app/views/projectdetail/design.html',
    controller: function($scope, $stateParams){
      $scope.projectId = $stateParams.projectId;
      console.log('design');
      console.log($scope.projectId);
    }
  })
  .state('app.projectdetail.distribute',{
    url: '/distribute',
    title: 'Project Detail Distribute',
    params: {projectId:''},
    templateUrl: 'app/views/projectdetail/distribute.html',
    controller: function($scope, $stateParams){
      $scope.projectId = $stateParams.projectId;
      console.log('distribute');
      console.log($scope.projectId);
    }
  })
  .state('app.projectdetail.result',{
    url: '/result',
    title: 'Project Detail Result',
    params: {projectId:''},
    templateUrl: 'app/views/projectdetail/result.html',
    controller: function($scope, $stateParams){
      $scope.projectId = $stateParams.projectId;
      console.log('result');
      console.log($scope.projectId);
    }
  })
  .state('appSimple', {
    abstract: true,
    templateUrl: 'app/views/common/layouts/simple.html',
    controller: function($scope){
      $('body').removeClass().addClass('login-page');
    }
  })
  // Additional Pages
  .state('appSimple.login', {
    url: '/login',
    title: 'Login',
    templateUrl: 'app/views/pages/login.html',
    controller: function($scope, $state){
      $scope.login = function(user) {
        console.log(user);
        $state.go('app.projectlist', null, {reload:true});
      };    
    }
  })
  .state('appSimple.register', {
    url: '/register',
    title: 'Register',
    templateUrl: 'app/views/pages/register.html',
    controller: function($scope, $state){
      $scope.register = function(user) {
        console.log(user);
        $state.go('app.projectlist', null, {reload:true});
      };    
    }
  })
  .state('appSimple.forgotpassword', {
    url: '/forgotpassword',
    title: 'Forgot Password',
    templateUrl: 'app/views/pages/forgotpassword.html'
  })
}]);