angular.module('app', [
  'ui.router'
])
.run(['$rootScope', '$state', '$stateParams', '$transitions', function($rootScope, $state, $stateParams, $transitions){
  $transitions.onSuccess({}, function() {
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