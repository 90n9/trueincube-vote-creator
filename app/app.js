angular.module('app', [
  'ui.router'
])
.run(['$rootScope', '$state', '$stateParams', '$transitions', function($rootScope, $state, $stateParams, $transitions){
  $transitions.onSuccess({}, function(transition) {
    $rootScope.title = $state.current.title;
    console.log('transition');
    console.log(transition.params('form'));
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
}]);