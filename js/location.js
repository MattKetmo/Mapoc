window.Location = (function() {
    function Coordinates(geometry) {
        this.latitude = geometry.location.lat();
        this.longitude = geometry.location.lng();
    }
    Coordinates.prototype.toString = function() {
        return Number(this.latitude.toFixed(6)) + ',' + Number(this.longitude.toFixed(6));
    }

    function Types(types) {
        for (var i = 0; i < types.length; i++) {
            if (types[i] !== 'political') {
                this.push(types[i]);
            }
        }
    }
    Types.prototype = new Array();
    Types.prototype.toString = function() {
        return this.join(' ');
    }

    function Component(component) {
        //this.long_name = component.long_name;
        //this.short_name = component.short_name;
    }
    Component.prototype.fromData = function(component) {
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

    function City(component) {
        this.fromData(component);
    }
    City.prototype = new Component();

    function District(component) {
        this.fromData(component);
    }
    District.prototype = new Component();

    function StreetName(component) {
        this.fromData(component);
    }
    StreetName.prototype = new Component();

    function StreetNumber(component) {
        this.fromData(component);
    }
    StreetNumber.prototype = new Component();

    function Region(component) {
        this.fromData(component);
    }
    Region.prototype = new Component();

    function County(component) {
        this.fromData(component);
    }
    County.prototype = new Component();

    function Country(component) {
        this.fromData(component);
    }
    Country.prototype = new Component();

    function Zipcode(component) {
        this.fromData(component);
    }
    Zipcode.prototype = new Component();

    function Location(result) {
        this.formatted_address = result.formatted_address;
        this.coordinates = new Coordinates(result.geometry);
        this.types = new Types(result.types);

        for (var component in result.address_components) {
            var cmpt = result.address_components[component];
            for (var type in cmpt.types) {
                switch (cmpt.types[type]) {
                    case 'locality':
                        this.city = new City(cmpt);
                        break;
                    case 'sublocality':
                        this.district = new District(cmpt);
                        break;
                    case 'street_number':
                        this.street_number = new StreetNumber(cmpt);
                        break;
                    case 'route':
                        this.street_name = new StreetName(cmpt);
                        break;
                    case 'administrative_area_level_1':
                        this.region = new Region(cmpt);
                        break;
                    case 'administrative_area_level_2':
                        this.county = new County(cmpt);
                        break;
                    // case 'administrative_area_level_3':
                    //     this.something = new What(cmpt);
                    //     break;
                    case 'country':
                        this.country = new Country(cmpt);
                        break;
                    case 'postal_code':
                        this.zipcode = new Zipcode(cmpt);
                        break;
                }
            }
        }

        this.name = (this.city
            || this.district
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
