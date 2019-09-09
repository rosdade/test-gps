<template>
    <div id="mapContainer" class="mapContainer">
        <div id="map" style="width: 100%; height: 100%" />
        <ion-icon md="md-navigate" ios="md-navigate" class="logo" />
    </div>
</template>

<script>
import {loadedGoogleMapsAPI} from '../assets/gmaps';

var map;

export default {
    name: "mappa",
    mounted() {
        window.addEventListener('load', this.setMapSize);
        loadedGoogleMapsAPI.then(()=>{
            this.initMap()
        });        
    },
    props: {
        position: {
            type: Object,
            defaut: {lat: 0, lng:0}
        },
        heading: {
            type: Number,
            defaut: 0
        }
    },
    methods: {
        initMap() {
            // eslint-disable-next-line
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 0, lng: 0},
                zoom: 18,
                mapTypeId: 'terrain'
            });
            map.setOptions(this.options);
        },
        updateMap() {
            map.panTo({
                    lat: this.position.lat,
                    lng: this.position.lng
                });
            var mapDiv = document.getElementById("map");
            mapDiv.style.webkitTransform = 'rotate('+this.heading+'deg)'; 
            mapDiv.style.mozTransform    = 'rotate('+this.heading+'deg)'; 
            mapDiv.style.msTransform     = 'rotate('+this.heading+'deg)'; 
            mapDiv.style.oTransform      = 'rotate('+this.heading+'deg)'; 
            mapDiv.style.transform       = 'rotate('+this.heading+'deg)';
        },
        setMapSize() {
            var mapContainer = document.getElementById("mapContainer");
            const content_Height = document.getElementById("content").offsetHeight;
            const content_Width = document.getElementById("content").offsetWidth;
            const map_Height = (content_Height * 2);
            const map_Width = (content_Height * 2);

            mapContainer.style.height = map_Height + "px";
            mapContainer.style.width = map_Width + "px";
            mapContainer.style.right = ((map_Width - content_Width) / 2 ) + "px";
            mapContainer.style.top = - ((map_Height - (content_Height * 1.3)) / 2 ) + "px";
        }
    },
    data() {
        return {
            options: {
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                disableDefaultUi: false,
                styles: [
                    {
                        "elementType": "geometry",
                        "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                        {
                            "visibility": "off"
                        }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                        {
                            "color": "#616161"
                        }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                        ]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "stylers": [
                        {
                            "visibility": "off"
                        }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                        {
                            "color": "#757575"
                        }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                        {
                            "color": "#ffffff"
                        }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.fill",
                        "stylers": [
                        {
                            "color": "#757575"
                        }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                        {
                            "color": "#dadada"
                        }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                        {
                            "color": "#616161"
                        }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                        ]
                    },
                    {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                        {
                            "color": "#c9c9c9"
                        }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                        ]
                    }
                ]
            }
        }
    },
    watch: {
        $props: {
            handler() {
                this.updateMap()
            },
            deep: true
        }
    }
}  
</script>

<style>
.mapContainer {
    position: relative;
    text-align: center;
}

.logo {
    position: absolute;
    color: blue;
    width: 34px;
    height: 34px;
    top: calc(50% - 17px);
    left: 50%;
    transform: translate(-50% , -50% );
}
</style>