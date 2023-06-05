const singapore = [1.35, 103.85]

let map1 = L.map('map').setView(singapore, 13)   // initialize map based on html div id and set initial view and zoom

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map1);

let group1 = L.layerGroup()

async function loadData (){
let response = await axios.get("./Geojson/cycling-path.geojson")
    let cyclingLayer = L.geoJson(response.data, {
        onEachFeature: function(feature, layer) {
            let e = document.createElement('div');
            e.innerHTML = feature.properties.Description;
            let tds = e.querySelectorAll('td');
            let region = tds[0].innerHTML;
            let department = tds[1].innerHTML;
            layer.bindPopup(`<div>
            <p>
                Region: ${region}
            </p>
            <p>
                Department: ${department}
            </p>
            </div>
            `
            )
        }
    }).addTo(group1)

    cyclingLayer.setStyle({
        'color':'red'
    })    
}

let loadedData = loadData()
group1.addTo(map1)

//let e = document.createElement('div'): This line creates a new HTML div element using document.createElement. This element will be used as a temporary container to parse the HTML content from the Description property of each feature.
// e.innerHTML = feature.properties.Description: This line sets the HTML content of the div element (e) to the value of the Description property of the current feature.
// let tds = e.querySelectorAll('td'): This line uses querySelectorAll on the e element to select all the td elements within it. It assumes that the Description property contains an HTML structure with td elements.
// when console.log can see that the Description is html and there are multiple <td> that can be selected, with the first and 2nd value being what we are looking out for.
// onEachFeature passes a provide a function. Each feature is then passed into function as first argument.
// 2nd argument is layer the feature is render on.


