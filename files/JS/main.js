"use strict"

const userIpAddressInput = document.querySelector('#input_ip_address')
const ipNumber = document.querySelector(".ip__number")
const ipCity = document.querySelector(".ip__location")
const timeInHours = document.querySelector(".ip_timezone")
const provider = document.querySelector(".provider");
// const loading = document.querySelector(".loading")
const btn  = document.querySelector(".submit-btn");
const userForm = document.querySelector('form')

// control user input

    function isValidIPv4(ip) {
            const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            
            return ipv4Pattern.test(ip);
        }

        function isValidIPv6(ip) {
            const ipv6Pattern = /([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])/;
              return ipv6Pattern.test(ip);
        }

        
        function validateAndSubmit(userInput) {
            if (isValidIPv4(userInput) || isValidIPv6(userInput)) {
                if(userForm.classList.contains('error-msg')){
                    userForm.classList.remove('error-msg')
                }
                // settimeoutdelay
                // alert('Valid IP address: ' + userInput);
                return true
            } else {
                userForm.classList.add('error-msg')
                // alert(`${userInput} Invalid Ip address`)
            }

            
        }

        
        // createMapElement("div")



async function callingIpAddress (ipAddress){

    try {
        
        if (validateAndSubmit(ipAddress)){

            const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_7DjECNW0YdO0D3F17jFbCfyO9o4CA&ipAddress=${ipAddress}`);

        if(response.status === 403 || response.status === 404) throw new Error('salam Adigun')
        if (!response.ok) throw new Error('Problem getting location data');
        if(response.ok){
            const data = await response.json()
            // console.log("from ip address")

            
        //  loading.classList.remove('loading')
          
        ipNumber.textContent = data.ip
        ipCity.textContent = `${data.location.city},${data.location.region}`
        provider.textContent = data.isp
        timeInHours.textContent =`${data.location.timezone} UTC`
         
        
        // leaflet
        //  let salam = true
        function getLocation(data){
            // console.log(data, "line 74 salam ")
            function createMapElement(tag){
                const mapSection = document.querySelector(".map")
                mapSection.innerHTML =``
                const mapElement = document.createElement(tag);

                // createElement.className.add("show-map")
                mapElement.setAttribute("id" , "show-map");
                mapElement.setAttribute('class' , "show-map")
                
                mapSection.appendChild(mapElement)
                // console.log(mapSection,mapElement)
                // return mapElement
            }


            const {lat,lng} = data.location
            let coord__location = [lat,lng];
            let map;
            // if (!map){
            //     // map.remove()
            //     console.log("removed")
            //     mapSection.removeChild()
            // }
            // console.log( "from get location 1")
            createMapElement("div")
             map = L.map('show-map').setView(coord__location, 10);

            // console.log(map , "I am salam")
            // console.log( "from get location 2")

               L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                   maxZoom: 15,
                   attribution: '&copy; <a href="http://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a>'
                   }).addTo(map);

                   const marker = L.marker(coord__location)
                   marker.addTo(map)
                   marker.bindPopup(L.popup({
           minWidth: 200,
           maxWidth: 250,
           // autoClose:false,
           closeOnClick:false,
           className:'location__popup'
       }))
       marker.openPopup()
       marker.setPopupContent(`${data.location.city},${data.location.region}`)
   }
   getLocation(data)
        }
     
        
}
// leaflet

    } catch (error) {
        // console.log(error.message)
    }

   

         

        
}
// }

// callingIpAddress("102.89.23.227")
// callingIpAddress("129.205.113.179")


btn.addEventListener("click" , function(e){
    e.preventDefault()
    callingIpAddress(userIpAddressInput.value.trim())
    userIpAddressInput.value = ' '
    
})

// callingIpAddress("192.212.174.101")

function getUserDefaultIp(callbaack){

    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      console.log('Your Public IP Address:', data.ip);
      callbaack(data.ip)
    })
    .catch(error => {
      console.error('Error fetching IP:', error);
    });
}
getUserDefaultIp(callingIpAddress)



// https://geo.ipify.org/api/v2/country,city?apiKey=at_7DjECNW0YdO0D3F17jFbCfyO9o4CA&ipAddress=
// https://geo.ipify.org/api/v2/country,city?apiKey=at_Dr4OPW7wLihwfCTOSE39cYNrR4fMuipAddress=