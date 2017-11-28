angular.module('app', [
  'ui.router',
  'ngAnimate',
  'ui.bootstrap',
  'chart.js',
  'angular-jwt',
])
.run(['$rootScope', '$state', '$stateParams', '$transitions', function($rootScope, $state, $stateParams, $transitions){
  $transitions.onFinish({}, function() {
    $rootScope.title = $state.current.title;
    if($state.current.name.indexOf("projectdetail") == -1){
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }else{
      document.body.scrollTop = document.documentElement.scrollTop = $('main').offset().top;
    }
  });
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
}]);