/**
 * New node file
 */
angular.module('searchCtrlModule', []).controller(
		'SearchController',
		function($scope, SearchService, ElementService, FoodService, 
		            DishService, PeriodService, FetusService) {
		    //
		    $scope.service = {'thuc_pham' : FoodService, 
		                        'chat': ElementService,
                                'tuan_thai': PeriodService,
                                'mon_an': DishService};
            
            // Search by keyword
            $scope.search = function () {
                $scope.result = [];
                
                SearchService.get($scope.keyword)
                    .success(function(data){
                        angular.forEach(data, function(item) {
                            if (item.list.length != 0) {
                                $scope.result.push(item);
                            }
                        })
                    })
                    .error(function (data){
                        console.log('Error in search');
                    });
            };
            
            //
            $scope.launchRefDialog = function (key, value) {
                $scope.refName = key;
                $scope.refs = [];
                
                $scope.service[key].get(value)
                    .success(function(data){
                        $scope.refs = data;    
                    })
                    .error(function(data){
                        console.log('Error in display refs');
                    })
            }
            
		});