/**
 * New node file
 */
angular.module('cuccung', ['elementCtrlModule', 'elementServModule',
                           'foodCtrlModule', 'foodServModule',
                           'dishCtrlModule', 'dishServModule',
                           'fetusCtrlModule', 'fetusServModule',
                           'periodCtrlModule', 'periodServModule',
                           'questionCtrlModule', 'questionServModule',
                           'searchCtrlModule', 'searchServModule']);
                           
angular.module('cuccung').directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });

angular.module('cuccung').directive('ngFocus', function() {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            _element[0].focus();
        }
    };
});

angular.module('cuccung').filter('nl2br', function ($sce) {
    return function (text) {
        return text ? $sce.trustAsHtml(text.replace(/\n/g, '<br/>')) : '';
    };
});

angular.module('cuccung').config(function ($httpProvider) {
  $httpProvider.responseInterceptors.push('myHttpInterceptor');

  var spinnerFunction = function spinnerFunction(data, headersGetter) {
    $("#spinner").show();
    return data;
  };

  $httpProvider.defaults.transformRequest.push(spinnerFunction);
});

angular.module('cuccung').factory('myHttpInterceptor', function ($q, $window) {
  return function (promise) {
    return promise.then(function (response) {
      $("#spinner").hide();
      return response;
    }, function (response) {
      $("#spinner").hide();
      return $q.reject(response);
    });
  };
});
