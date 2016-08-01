/**
 * New node file
 */
angular.module('questionServModule', []).factory('QuestionService', function($http) {
	return {
		get : function(idList) {
		    var query = '/api/question';
		    if (idList) query += '?idList=' + idList;
			return $http.get(query);
		},
		create : function(data) {
			return $http.post('/api/question', data);
		}
	}
});