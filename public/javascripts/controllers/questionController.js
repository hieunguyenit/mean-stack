/**
 * New node file
 */
angular.module('questionCtrlModule', []).controller(
		'QuestionController',
		function($scope, QuestionService) {
		    $scope.question = {};
			$scope.questions = [];
			
			$scope.completed = 0;
			$scope.approved  = 0;

			//
			QuestionService.get().success(function(data) {
				$scope.questions = data;
				angular.forEach(data, function(item){
				    if (item.completed)
				        $scope.completed ++;
				    
				    if (item.approved)
				        $scope.approved ++;
				});
			}).error(function(data) {
				console.log('Error to question list');
			});

			//
			$scope.save = function() {
				if (!$.isEmptyObject($scope.question)) {
					QuestionService.create($scope.question).success(
							function(data) {
								$scope.question = {};
								window.location.href = "/question";
							});
				}
			};

			//
			$scope.editQuestion = function(question) {
				if (question === 'new') {
					$scope.newQuestion = true;
					$scope.question = {
						id : '',
						text : ''
					};
				} else {
					$scope.newQuestion = false;
					$scope.question = question;
				}
			};

		});