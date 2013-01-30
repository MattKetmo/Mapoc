//
// Vars
//
var input = document.getElementById('autocomplete');
var lock = false;

//
// UI
//

$(document).tooltip({
    selector: ".tip"
})
$(document).on('click', '.sub-results', function() {
    $(this).toggleClass('fold');
});
$(document).on('click', '.map img.static-map', function() {
    var $img = $(this);
    var location = $img.data('location');
    var $map = $img.parents('.map');
    $map.html('');

    var map = new Map($map.get(0))
        .setCenter(location.coordinates.latitude, location.coordinates.longitude)
        .addMarker(location.coordinates.latitude, location.coordinates.longitude)
        .render()
    ;
});

$('.js-action-clear').on('click', function() {
    $(input).val('');
    clearResults();
    input.focus();
});


//
// Places autocomplete
//
var options = {types: ['geocode']};
var autocomplete = new google.maps.places.Autocomplete(input, options);
google.maps.event.addListener(autocomplete, 'place_changed', function() {
    //var place = autocomplete.getPlace();
});

//
// Geocoding API
//
var geocoder = new google.maps.Geocoder();
$('form').on('submit', function(evt) {
    evt.preventDefault();

    clearResults();
    var address = input.value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            console.log('Geocode was not successful: ' + status);
            return;
        }

        for (var i = 0; i < results.length; i++) {
            var location = new Location(results[i]);

            (function (location, i) {
                setTimeout(function() {
                    displayLocation(location);
                }, i * 100)
            })(location, i);
        }
    });
});

//
// Results display
//
function clearResults() {
    $('.results').html('');
}

function displayLocation(location) {
    var template = $('#tpl-result').html();
    var $result = $(Mustache.render(template, location));
    $result.data('location', location);

    var staticMap = new StaticMap()
        .setCenter(location.coordinates.latitude, location.coordinates.longitude)
        .addMarker(location.coordinates.latitude, location.coordinates.longitude)
        .setSize(300, 400)
    ;

    $img = $('<img />')
        .attr('class', 'static-map')
        .attr('src', staticMap.getUrl())
        .data('location', location)
        .appendTo($result.find('.map'));

    $result.addClass('hide');
    $('.results').append($result);
    (function($result) {
        setTimeout(function() { $result.removeClass('hide'); }, 100);
        setTimeout(function() { displaySubResults($result); }, 600);
    })($result);
}

function displaySubResults($result) {
    var location = $result.data('location');
    var latlng = new google.maps.LatLng(location.coordinates.latitude, location.coordinates.longitude);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            console.log('Reverse geocode was not successful: ' + status)
            return;
        }

        var data = {'results': []};
        for (var i = 0; i < results.length; i++) {
            var location = new Location(results[i]);
            data.results.push(location);
        }

        var template = $('#tpl-reverse-results').html();
        var $render = $(Mustache.render(template, data));

        $render.addClass('hide');
        $result.append($render);
        setTimeout(function() {
            $render.removeClass('hide');
            $render.addClass('fold');
        }, 100);
    });
}
