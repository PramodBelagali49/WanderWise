mapboxgl.accessToken = mapToken;
const geocodingClient = mapboxSdk({ accessToken: mapToken }).geocoding;

// for map-box
// import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
// const mapToken=process.env.MAP_BOX_TOKEN ;
// const geocodingClient = mbxGeocoding({ accessToken: mapToken});

// console.log("coordinates: ",coordinates)
// let lng=coordinates[0];
// let lat=coordinates[1];
// let listingData=JSON.parse(listingData);   // listingData inside parenthesis is from showListing.ejs


async function geocode(){
    let response=await geocodingClient.forwardGeocode({
        query: listingData.location ,
        limit: 1
    })
    .send();
    let coordinates=response.body.features[0].geometry.coordinates;
    console.log("coordinates: ",coordinates);

    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coordinates,     // JSON.parse converts the coordinates string to array or object
        zoom: 5
    });
    
    // Create a default Marker and add it to the map.
    const marker = new mapboxgl.Marker({color:"red"})
        .setLngLat(coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                `<h6>${listingData.location} , ${listingData.country}</h6> <p>Exact location is provided after booking</p>`
            )
        )
        .addTo(map)
}
geocode();


