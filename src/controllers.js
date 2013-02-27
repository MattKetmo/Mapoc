'use strict';

/* Controllers */

function LocationSearchCtrl($scope, Geocoder) {
    $scope.locations = [];

    $scope.clear = function() {
        $scope.locations = [];
        $scope.searchTxt = '';
    }

    $scope.search = function() {
        $scope.locations = [];

        if (undefined === $scope.searchTxt) {
            return;
        }

        Geocoder.geocode({'address': $scope.searchTxt}, function(results, status) {
            if (status !== google.maps.GeocoderStatus.OK) {
                console.log('Geocode was not successful: ' + status);
                return;
            }

            for (var i = 0; i < results.length; i++) {
                $scope.locations.push(new Location(results[i]));
            }

            $scope.$apply();
        });
    }
}