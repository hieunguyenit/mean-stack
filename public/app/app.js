'use strict';

var app = angular.module('babau', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {templateUrl: '/partials/main', controller: 'mainCtrl'})
});

app.controller('mainCtrl', function($scope, $http) {
    $scope.value = 'Scan';

    $scope.scan = function () {
        $http.post('/scan.json', {}).success(function(data) {
            console.log("scan successfully." + data)
        }).error(function(err){
            console.error("failed " + err)
        });
    }
});