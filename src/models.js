//
// Location
//
window.Location = (function() {
    //
    // Coordinates
    //
    function Coordinates(geometry) {
        this.latitude = geometry.location.lat();
        this.longitude = geometry.location.lng();
    }
    Coordinates.prototype.toString = function() {
        return Number(this.latitude.toFixed(6)) + ',' + Number(this.longitude.toFixed(6));
    }

    //
    // Types
    //
    function Types(types) {
        for (var i = 0; i < types.length; i++) {
            // don't care about 'political' type
            if (types[i] !== 'political') {
                this.push(types[i]);
            }
        }
    }
    Types.prototype = new Array();
    Types.prototype.toString = function() {
        return this.join(' ');
    }

    //
    // Component
    //
    function Component(component) {
        this.long_name = component.long_name;
        this.short_name = component.short_name;
        this.types = new Types(component.types);
    }
    Component.prototype.toString = function() {
        var str = this.long_name;

        if ('' !== this.short_name && this.long_name !== this.short_name) {
            str += ' (' + this.short_name + ')';
        }

        return str;
    }

    //
    // Location
    //
    function Location(result) {
        this.formatted_address = result.formatted_address;
        this.coordinates = new Coordinates(result.geometry);
        this.types = new Types(result.types);

        for (var component in result.address_components) {
            var cmpt = result.address_components[component];
            for (var type in cmpt.types) {
                switch (cmpt.types[type]) {
                    case 'locality':
                        this.city = new Component(cmpt);
                        break;
                    case 'sublocality':
                        this.district = new Component(cmpt);
                        break;
                    case 'street_number':
                        this.street_number = new Component(cmpt);
                        break;
                    case 'route':
                        this.street_name = new Component(cmpt);
                        break;
                    case 'administrative_area_level_1':
                        this.region = new Component(cmpt);
                        break;
                    case 'administrative_area_level_2':
                        this.county = new Component(cmpt);
                        break;
                    case 'administrative_area_level_3':
                        this.town = new Component(cmpt);
                        break;
                    case 'country':
                        this.country = new Component(cmpt);
                        break;
                    case 'postal_code':
                        this.zipcode = new Component(cmpt);
                        break;
                }
            }
        }

        this.name = (this.city
            || this.district
            || this.town
            || this.county
            || this.region
            || this.country
        ).long_name;
    }
    Location.prototype.toString = function() {
        return this.formatted_address;
    }

    return Location;
})();
