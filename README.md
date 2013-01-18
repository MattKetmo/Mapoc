# Mapoc

Mapoc is a tool to help you visualize the results of GoogleMaps Geocoding API.

You can test it online at [mapoc.io](http://mapoc.io/).

## How it works?

Just type an address in the search field and submit the form. The geocoded
results will appear. For each result, a reverse-geocoding request is done with
the coordinates received.

For instance, if you search "Paris, France", Google will answer the associated
point: "48.856614,2.352222". But if you reverse this point, you will find
a more precise address: "60 Rue de Rivoli, 75004 Paris, France".

## Design notes

The design of this application has been highly inspired from Google style
guide. The search bar is similar to Google search. The "card" system to display
the results have been copied from the [Knowledge Graph][knowledge] and the
"show" animation from [Google Now][now].

[knowledge]: http://www.google.com/insidesearch/features/search/knowledge.html
[now]: http://www.google.com/landing/now/

## Why this name?

This is simply a shortcut between Map + PoC (Proof of Concept).
