/**
 * New node file
 */

angular.module('dishCtrlModule', []).controller('DishController',
		function($scope, DishService, FoodService) {
			$scope.dish = {};
			$scope.dishes = [];
			$scope.foods = [];
			$scope.selectedFood = [];
			
			$scope.completed = 0;
			$scope.approved  = 0;
			//
			DishService.get().success(function(data) {
				$scope.dishes = data;
				angular.forEach(data, function(item){
				    if (item.completed)
				        $scope.completed ++;
				    
				    if (item.approve)
				        $scope.approved ++;
				});
			}).error(function(data) {
				console.log('Error to dish list');
			});

			//
			FoodService.get().success(function(data) {
				var foodList = [];

				angular.forEach(data, function(item) {
					var food = {};
					food.id = item.id;
					food.ten = item.ten;
					food.selected = false;

					foodList.push(food);
				});

				$scope.foods = foodList;
				
			}).error(function(data) {
				console.log('Error to get food list');
			});

			//
			$scope.save = function() {
				if (!$.isEmptyObject($scope.dish)) {
					DishService.create($scope.dish).success(
							function(data) {
								$scope.dish = {};
								window.location.href = "/dish";
							});
				}
			};
			
			//
			$scope.editDish = function(dish) {
				if (dish === 'new') {
					$scope.newDish = true;
					$scope.dish = {
						id : '',
						ten : ''
					};
				} else {
					$scope.newDish = false;
					$scope.dish = dish;
				}
			};

			//
			$scope.launchFoodDialog = function() {
				if ($scope.dish.thuc_pham == null)
					 $scope.dish.thuc_pham = "";
				
				var selected = $scope.dish.thuc_pham.split(',');
				for (var i = 0; i < $scope.foods.length; i++) {
				    $scope.foods[i].selected = false;
					for (var j = 0; j < selected.length; j++) {
						if ($scope.foods[i].id === selected[j]) {
							$scope.foods[i].selected = true;
						}
					}
				}
				
			};
			
			// Add selected food
			$scope.addSelectedFood = function() {
				var tmp = "";
				angular.forEach($scope.selectedFood, function(item){
					tmp += item.id + ",";
				});
				$scope.dish.thuc_pham = tmp;
			};
			
			// Update selected food list
			$scope.updateSelectedFood = function(foodList) {
				var has = [];

				angular.forEach(foodList, function(item) {
					if (item.selected === true) {
						has.push(item);
					}
				});

				$scope.selectedFood = has;
			};
			
		});