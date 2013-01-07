window.StaticMap = (function() {
    function Coordinates(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    Coordinates.prototype.toString = function() {
        return this.latitude + ',' + this.longitude;
    }
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    Size.prototype.toString = function() {
        return this.width + 'x' + this.height;
    }

    function StaticMap() {
        this.markers = [];
        this.center = null;
        this.size = null;
        return this;
    }
    StaticMap.prototype.addMarker = function(latitude, longitude) {
        this.markers.push(new Coordinates(latitude, longitude));
        return this;
    }
    StaticMap.prototype.setCenter = function(latitude, longitude) {
        this.center = new Coordinates(latitude, longitude);
        return this;
    }
    StaticMap.prototype.setSize = function(width, height) {
        this.size = new Size(width, height);
        return this;
    }
    StaticMap.prototype.getUrl = function() {
        var params = [
            'sensor=false',
            'zoom=12',
        ];

        if (this.center) {
            params.push('center=' + this.center);
        }
        if (this.size) {
            params.push('size=' + this.size);
        }
        if (this.markers) {
            params.push('markers=' + this.markers.join('|'));
        }

        return 'http://maps.googleapis.com/maps/api/staticmap?' + params.join('&');
    }

    return StaticMap;
})();

window.Map = (function() {
    function Map(element) {
        this.element = element;
        this.markersArray = [];
    }

    Map.prototype.setCenter = function(latitude, longitude) {
        this.center = new google.maps.LatLng(latitude, longitude);

        return this;
    }

    Map.prototype.addMarker = function addMarker(latitude, longitude) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
        });

        this.markersArray.push(marker);

        return this;
    };

    Map.prototype.render = function() {
        var mapOptions = {
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false,
            mapTypeControl: false
        }

        if (this.center) {
            mapOptions.center = this.center;
        }

        this.map = new google.maps.Map(this.element, mapOptions);
        this.showOverlays();

        return this;
    }

    // Shows any overlays currently in the array
    Map.prototype.showOverlays = function() {
        if (this.markersArray) {
            for (i in this.markersArray) {
                this.markersArray[i].setMap(this.map);
            }
        }

        return this;
    }

    // Removes the overlays from the map, but keeps them in the array
    Map.prototype.clearOverlays = function() {
        if (this.markersArray) {
            for (i in markersArray) {
                this.markersArray[i].setMap(null);
            }
        }

        return this;
    };

    // Deletes all markers in the array by removing references to them
    Map.prototype.deleteOverlays = function() {
        if (this.markersArray) {
            for (i in this.markersArray) {
                this.markersArray[i].setMap(null);
            }
            this.markersArray.length = 0;
        }

        return this;
    }

    return Map;
})();
