'use strict';

/* App Module */

angular.module('mapoc', ['GoogleServices']);
angular.module('ng').filter('s', function($filter){
    return function(value){
       return value.toString();
    }
});