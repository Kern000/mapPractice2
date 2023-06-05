async function mapLoader(){

    function init(){
        let map1 = initMap();

        let searchResultLayer = L.layerGroup(); // if many results, marker cluster group would help

        window.addEventListener('DOMContentLoaded', () => {
        
            document.querySelector('#search-btn').addEventListener('click', async ()=>{
                let query = document.querySelector('#search-input').value
                let centering = map1.getBounds().getCenter();
                let response = await search(centering.lat, centering.lng, query);
                console.log(response)
               
                searchResultLayer.clearLayers() //this clear previous results

                let searchResultContainer = document.querySelector("#search-results");
                searchResultContainer.innerHTML = ''

                for (let venue of response.results){
                
                let coordinate = [venue.geocodes.main.latitude, venue.geocodes.main.longitude]
                let marker = L.marker(coordinate)
                marker.bindPopup(`<div><p><h2>${venue.name}</h2></p><p>${venue.location.address}</p></div>`)
                marker.addTo(searchResultLayer)

                let resultItem = document.createElement('div');
                resultItem.className = "search-result"   //This assigns html class name
                resultItem.innerHTML = `<p><h3>${venue.name}</h3></p><p>${venue.location.address}</p>`

                resultItem.addEventListener('click', function(){
                    map1.flyTo(coordinate, 16);
                    marker.openPopup();
                })

                searchResultContainer.style.display = "block";
                searchResultContainer.appendChild(resultItem);

            }

            if (!map1.hasLayer(searchResultLayer)){ //!map is used as a condition in an if statement. It checks whether the map object does not have the searchResultLayer layer added to it. If the condition evaluates to true (i.e., map does not have the layer), the code block inside the if statement will be executed.
                map1.addLayer(searchResultLayer)
                }
            })           
        })
    }
    init()
}

// application framework
// nested function - init can only be used inside mapLoader function
// initialization and creating map inside initMap function
// contents from for-loop onwards can be re-factor into a function into another js sheet -> that file would thus be responsible for adding to the map, while this file load data and manipulates them.

function initMap(){
    let singapore = [1.29, 103.85];
    let map1 = L.map('singapore-map').setView(singapore, 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg'
    }).addTo(map1);

    return map1

}

mapLoader()

