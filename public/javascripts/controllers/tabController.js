angular.module('cuccung', ['ui.bootstrap']);
var TabsController = function ($scope) {
  $scope.tabs = [
    { title:"Dynamic Title 1", url:'/element' },
    { title:"Dynamic Title 2", url:"Dynamic content 2" }
  ];

  $scope.currentTab = '/element';

  $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.url;
  }
  
 
  //$scope.navType = 'pills';
};