var map;
var pickupMarkers = [];
var orgMarkers = [];
var autocomplete;
var currmarker;
var user;
var place;
var currtableId;
var directionsService;
var directionsRenderer;
var pos;
const submitButton = document.getElementById('submitButton');
const searchboxInput = document.getElementById('searchbox');
submitButton.onclick = userSubmitEventHandler;
searchboxInput.onkeyup = userSubmitEventHandler;
const donorChoice = document.getElementById('donorChoice');
const orgChoice = document.getElementById('orgChoice');
donorChoice.onclick = userChoiceHandler;
orgChoice.onclick = userChoiceHandler;
const editButton = document.getElementById('editButton');
editButton.onclick = editHandler;
const subform = document.getElementById('subform');
const orgNav = document.getElementById('orgNav');
const donorNav = document.getElementById('donorNav');
orgNav.addEventListener('click', function(){user = 'org';
    hideById('subform');
    hideById('donorTable');
    hideById('orgTable');
    currtableId = 'orgTable';
    showTableById(currtableId);
});
donorNav.addEventListener('click', function(){user = 'donor';
    hideById('subform');
    hideById('donorTable');
    hideById('orgTable');
    currtableId = 'donorTable';
    showTableById(currtableId);
});

function showTableById(tableId)
{
    document.getElementById(tableId).style.display = 'table';
    console.log(`showed table: ${tableId}`)
}

function displayById(elementId) {
    var element = document.getElementById(elementId);
    element.style.display = 'block';
    console.log(`displayed: ${elementId}`);
}
function hideById(elementId) {
    var element = document.getElementById(elementId);
    element.style.display = 'none';
    console.log(`hid: ${elementId}`);
}

var firstEditInteraction = true;
function editHandler(){
    // if(editIsHid) {
    //     displayById('subform');
    //     if(user == 'donor') hideById('orgNameInput');
    //     else displayById('orgNameInput');
    //     editIsHid = false;
    //     return;
    // }
    // hideById('subform');
    // editIsHid = true;
    if(subform.style.display == 'none' || firstEditInteraction) {
        displayById('subform');
        if(user == 'donor') hideById('orgNameInput');
        else displayById('orgNameInput');
        firstEditInteraction = false;
    }
    else {
        hideById('subform');
        firstEditInteraction = false;
    }
}



class Submission {
    constructor(marker, orgName='')
    {
        this.marker = marker;
        this.orgName = orgName;
    }
}

function userChoiceHandler(event) 
{
    if(event.currentTarget.id == 'donorChoice') {
        user = 'donor';
        currtableId = 'donorTable';
    }
    else {
        user = 'org';
        currtableId = 'orgTable';
    }
    console.log(`user: ${user}`);
    
    hideById('userChoice');
    displayById('map');
    
    displayById('editButton');

    hideById('orgTable');
    hideById('donorTable');

    showTableById(currtableId);



    // document.getElementById('table').style.display = 'table';
}


// function loadTable() {
//     if (markers.size ==0 || markers.size == 1)
//         return;
//     markers.sort(compareFunction); // by distance
//     for (var i =0; i < markers.size; i++)
//     {
//         document.getElementById('th' + i).innerHTML = marker.data;
//     }
// }

// function compareFunction() {
//     if (marker[0].location < marker[1].location)
//         return -1;
//     return 1;
// }




function userSubmitEventHandler(event) {
    if (
        (event.keyCode && event.keyCode === 13) ||
        event.type === 'click'
    ) {
        // var editBtn = document.getElementById('editButton');
        // subform.style.display ='block';
        //choose style and place marker
        var iconUrl = './donorMarker.png';
        if(user=='org') iconUrl = './orgMarker.png'
        var icon = {
            url: iconUrl, // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };
        
        currmarker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          animation:google.maps.Animation.DROP,
          icon: icon
        });

        let contentString = '<h1>' + place.name + '</h1>';
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });
        currmarker.addListener('click', () => {calcRoute(currmarker);});
currmarker.addListener('mouseover',  () => {
    infowindow.open({
        anchor: currmarker,
        map,
        shouldFocus: false,
      });
});
currmarker.addListener('mouseout',  () => {
    infowindow.close();
     
});
          let currOrgName;
          if(user=='org')
            currOrgName = document
            .getElementById('orgNameInput').value;
          else 
            currOrgName = '';

          let currSubmission = new Submission(currmarker, currOrgName);

        //google.maps.event.addListener(currmarker, 'click', markerEventHandler(currmarker));
        let markerArray = pickupMarkers;
        if(user=='org') 
          markerArray = orgMarkers;
        markerArray.push(currmarker);
        console.log("submitted marker");
    
        
        addMarkerToTable(currmarker,currtableId);
    }  
}

function initMap() {

    
   
    //create new direction service
    directionsService = new google.maps.DirectionsService();

    


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
              console.log(`user lat: ${position.coords.latitude}`);
              console.log(`user lng: ${position.coords.longitude}`);


             pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              
            map.setCenter(pos);
          },
          () => {
            console.log('error getting location');
          }
        );
      } else {
        // Browser doesn't support Geolocation
        console.log('error getting location');
      }


      map = new google.maps.Map(document.getElementById('map'), {
        center: pos, //center of US
        zoom: 11,
    });
    

// Create a renderer for directions and bind it to the map.
directionsRenderer = new google.maps.DirectionsRenderer({ map: map });




    //initiate google autocomplete places searchbox
    autocomplete = new google.maps.places
        .Autocomplete(document.getElementById("searchbox"), {
            componentRestrictions: { 'country': ['US'] },
            fields: ['geometry','name'/*, 'adr_address'*/]
        });
    autocomplete.addListener('place_changed', onPlaceChanged);
    console.log("map initialized");
}






// function openCity(evt, cityName) {
//     // Declare all variables
//     var i, tabcontent, tablinks;

//     // Get all elements with class="tabcontent" and hide them
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//     }

//     // Get all elements with class="tablinks" and remove the class "active"
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }

//     // Show the current tab, and add an "active" class to the button that opened the tab
//     document.getElementById(cityName + "Link").style.display = "block";
//     document.getElementById(cityName + "Link").className += ' active';
//     //evt.currentTarget.className += " active";

//     document.getElementById('map').style.display = 'block';
// }

function onPlaceChanged() {
    place = autocomplete.getPlace();
    if (!place.geometry) {
        console.log("place.geometry couldn't be found");
        //reset
        document.getElementById('searchbox').innerText = 'incomplete';
    }
    else {
        console.log(place);
        map.setZoom(11); //maybe try 17
        map.panTo(place.geometry.location);
    }
}



function markerEventHandler(marker) {
    calcRoute(marker);
}




function addMarkerToTable(marker, tableId) {
    let oppositeTable = 'orgTable';
    if(tableId == 'orgTable')
        oppositeTable = 'donorTable';
    const table1 = document.getElementById(oppositeTable);
    let newRow = document.createElement('tr');
    let newEntry = document.createElement('td');
    console.log(place.name);
    let insertText = place.name;
    let newText = document.createTextNode(insertText);

    newEntry.appendChild(newText);
    newRow.appendChild(newEntry);
    table1.appendChild(newRow);

}

function calcRoute(marker) {
    var start = { lat: 44.5, lng: 265 }; //center of US
 console.log('place of marker clicked: ' + marker.getPosition());
    var request = {
      origin: pos,
      destination: marker.getPosition(),
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }
