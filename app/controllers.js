//controllers.js
angular.module('app').controller('ModalInstanceCtrl', function ($scope, $state, $uibModalInstance) {
  $scope.new_project = function (project) {
    console.log('click ok');
    console.log(project);
    $uibModalInstance.close();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $state.go('app.projectdetail.design', {projectId:2}, {reload:true});
  };

  $scope.close_new_project = function () {
    console.log('click cancel');
    $uibModalInstance.close();
  };
});