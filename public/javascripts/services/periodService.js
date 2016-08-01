/**
 * New node file
 */
angular.module('periodServModule', []).factory('PeriodService', function($http) {
	return {
		get : function(idList) {
		    var query = '/api/period';
		    if (idList) query += '?idList=' + idList;
			return $http.get(query);
		},
		create : function(data) {
			return $http.post('/api/period', data);
		}
	}
});