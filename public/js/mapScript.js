mapboxgl.accessToken = mapToken;

// console.log("coordinates: ",coordinates)
// let lng=coordinates[0];
// let lat=coordinates[1];
// let listingData=JSON.parse(listingData);   // listingData inside parenthesis is from showListing.ejs

const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listingData.geometry.coordinates,     // JSON.parse converts the coordinates string to array or object
    zoom: 5
});

// Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(listingData.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
            `<h6>${listingData.location},${listingData.country}</h6> <p>Exact location is provided after booking</p>`
        )
    )
    .addTo(map)