/**
 * New node file
 */
angular.module('fetusServModule', []).factory('FetusService', function($http) {
	return {
		get : function(idList) {
		    var query = '/api/fetus';
		    if (idList) query += '?idList=' + idList;
			return $http.get(query);
		},
		create : function(data) {
			return $http.post('/api/fetus', data);
		}
	}
});