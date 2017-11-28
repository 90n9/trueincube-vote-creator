angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'ChartJsProvider', function($stateProvider, $urlRouterProvider, $httpProvider, ChartJsProvider) {

  ChartJsProvider.setOptions({
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    }
  });
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
    controller: function($scope, $uibModal, $http, APIPath){
      $ctrl = this;
      $http.get(APIPath.path+'project')
      .then(function(response){
        $scope.responseData = response;
        $scope.projectList = [{
          _id: '1',
          subject: 'The Mask Singer 3',
          point: '20'
        },{
          _id: '2',
          subject: 'The Voice Season 6',
          point: '20'
        }]
        console.log(response);
      }, function(error){
        $scope.responseData = error;
        console.log(error);
      });
      console.log('call project list');
      $scope.open_new_project = function(){
        console.log('open project modal');
        var modalInstance = $uibModal.open({
          animation: $ctrl.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/views/projectlist/modal_new_project.html',
          controller: 'ModalInstanceCtrl',
          controllerAs: '$ctrl',
        });
      }
    }
  })
  .state('app.projectdetail',{
    url: '/project/:projectId',
    title: 'Project Detail',
    params: {projectId:''},
    templateUrl: 'app/views/projectdetail.html',
    controller: function($scope, $stateParams, $state){
      $scope.projectId = $stateParams.projectId;
    },
  })
  .state('app.projectdetail.overview',{
    url: '/overview',
    title: 'Project Detail Overview',
    params: {projectId:''},
    templateUrl: 'app/views/projectdetail/overview.html',
    controller: function($scope, $stateParams){
      $scope.projectId = $stateParams.projectId;
      $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
      $scope.series = ['Each', 'Total'];
      $scope.data = [
        [28, 48, 40, 19, 86, 27, 90],
        [28, 76, 116, 135, 221, 248, 338],
      ];
    }
  })
  .state('app.projectdetail.design',{
    url: '/design',
    title: 'Project Detail Design',
    params: {projectId:''},
    templateUrl: 'app/views/projectdetail/design.html',
    controller: function($scope, $stateParams){
      $scope.projectId = $stateParams.projectId;
      $scope.project = {
        subject : 'The Mask Singer 3',
        questionList : [{
          question: 'โหวตหน้ากากที่คุณอยากให้ไปต่อ',
          choiceType: 'single_image',
          answerList: [
            {answer:'หน้ากากหมาป่า'},
            {answer:'หน้ากากไก่ชน'},
          ]
        },{
          question: 'โหวตหน้ากากที่คุณอยากให้ไปต่อ',
          choiceType: 'single_text',
          answerList: [
            {answer:'หน้ากากไอยรา'},
            {answer:'หน้ากากเตียงนอน'},
          ]
        }]
      };
      $scope.addAnswer = function(question){
        question.answerList.push({answer:''});
      };
      $scope.addQuestion = function(){
        $scope.project.questionList.push({
          question: '',
          choiceType: 'single_image',
          answerList: [
            {answer:''},
            {answer:''},
          ]
        });
      };
      $scope.removeAnswer = function(question, answer){
        question.answerList = question.answerList.filter(function(el) {
          return el !== answer;
        });
      }
      $scope.removeQuestion = function(question){
        $scope.project.questionList = $scope.project.questionList.filter(function(el) {
          return el !== question;
        });
      }
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
      $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };  
      $scope.popup2 = {
        opened: false
      };
      $scope.openDatePicker = function(){
        $scope.popup2.opened = true;
      }
    }
  })
  .state('app.projectdetail.result',{
    url: '/result',
    title: 'Project Detail Result',
    params: {projectId:''},
    templateUrl: 'app/views/projectdetail/result.html',
    controller: function($scope, $stateParams){
      $scope.projectId = $stateParams.projectId;
      $scope.report = {
        questionList : [{
          question: 'Question 1',
          labels : ['answer 1', 'answer 2', 'answer 3', 'answer 4'],
          series : ['Male', 'Female'],
          data : [
            [30,105,52,89],
            [50,72,95,17]
          ],
        },{
          question: 'Question 2',
          labels : ['answer 1', 'answer 2', 'answer 3', 'answer 4'],
          series : ['Voter'],
          data : [
            [75, 64, 33, 22],
            [42, 56, 84, 42]
          ],
        }]
      };
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
    controller: function($scope, $state, $http, APIPath){
      console.log(APIPath);
      $scope.login = function(user) {
        console.log(user);
        $scope.loading = true;
        $state.go('app.projectlist', null, {reload:true});
        /*
        AuthenticationService.Login(user.email, user.password, function (result) {
          if (result === true) {
          } else {
            $scope.error = 'Email or password is incorrect';
            $scope.loading = false;
          }
        });
        */
      };
    }
  })
  .state('appSimple.register', {
    url: '/register',
    title: 'Register',
    templateUrl: 'app/views/pages/register.html',
    controller: function($scope, $state, $http, APIPath){
      $scope.error = '';
      $scope.loading = false;
      $scope.register = function(user) {
        $state.go('app.projectlist', null, {reload:true});
        /*
        $scope.loading = true;
        AuthenticationService.Login(user.email, user.password, function (result) {
          if (result === true) {
          } else {
            $scope.error = 'Email or password is incorrect';
            $scope.loading = false;
          }
        });
        */
      };    
    }
  })
  .state('appSimple.forgotpassword', {
    url: '/forgotpassword',
    title: 'Forgot Password',
    templateUrl: 'app/views/pages/forgotpassword.html'
  })
}]);