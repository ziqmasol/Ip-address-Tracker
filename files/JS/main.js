"use strict"
// get user current location

// Api i call


function checkIpAddress(){

}

async function callingIpAddress (apiEndpoint){
    const response = await fetch(apiEndpoint);
    if(response.ok){
        const data = await response.json()
        console.log(data.ip,data.location)
    }else{
        throw new console.error("network bad time");
    }

}

callingIpAddress("https://geo.ipify.org/api/v2/country,city?apiKey=at_UdvCepbPCwozosCKVWSsBnR97BqKa&ipAddress=192.158.1.38")

if (navigator.geolocation){

    navigator.geolocation.getCurrentPosition(function(position){
        // extract lat and long
        
    const {latitude , longitude} = position.coords;
    console.log(latitude,longitude)

    const coord__location = [latitude,longitude]
const map = L.map('show-map').setView([...coord__location], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a>'
}).addTo(map);

// map event

map.on("click" , function(mapEvent){
    const {lat , lng} = mapEvent.latlng

    const marker = L.marker([lat,lng])
    marker.addTo(map)
    marker.bindPopup(L.popup({
       minWidth: 200,
       maxWidth: 250,
       autoClose:false,
       closeOnClick:false,
       className:'running-popup'
    }))
    marker.openPopup()
    marker.setPopupContent('workout')
   
})

const marker = L.marker(coord__location)
 marker.addTo(map)
 marker.bindPopup(L.popup({
    minWidth: 200,
    maxWidth: 250,
    autoClose:false,
    closeOnClick:false,
    className:'running-popup'
 }))
 marker.openPopup()
 marker.setPopupContent('workout')

    
},
function(){
    alert("location does not exist")
})
}