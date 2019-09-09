export const loadedGoogleMapsAPI = new Promise( (resolve,reject) => {

    window['GoogleMapsInit'] = resolve;

    let GMap = document.createElement('script');

    GMap.setAttribute('src',
   `https://maps.googleapis.com/maps/api/js?key=AIzaSyDW8bXzC646HNqW2Yp8MJADcPio2g34EgE&callback=GoogleMapsInit`);

    document.body.appendChild(GMap); 
});