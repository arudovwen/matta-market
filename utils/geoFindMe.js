export function geoFindMe() {
  if (!navigator.geolocation) {
    // console.log("Geolocation is not supported by your browser");
    return;
  }
  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    reverseGeocodingWithGoogle(latitude, longitude);
  }
  function error() {
    console.log("Unable to retrieve your location");
  }
  navigator.geolocation.getCurrentPosition(success, error);

}

function reverseGeocodingWithGoogle(latitude, longitude) {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?
        latlng=${latitude},${longitude}&key={GOOGLE_MAP_KEY}`)
    .then((res) => res.json())
    .then((response) => {
      // console.log("User's Location Info: ", response);
    })
    .catch((status) => {
      console.log("Request failed.  Returned status of", status);
    });
}


export function getLocation(){
  fetch("https://extreme-ip-lookup.com/json/?key=xogBZ9nXmrNAWQOKxgtk")
  .then((res) => res.json())
  .then((response) => {
    // console.log("Country: ", response);
    return response
  })
  .catch((data, status) => {
    console.log("Request failed");
  });
}