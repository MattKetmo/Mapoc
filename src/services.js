'use strict';

/* Services */

angular.module('GoogleServices', [])
    .factory('Geocoder', function() {
        return new google.maps.Geocoder();
    })
;