<template>
    <div id="mapContainer" class="mapContainer">
         <div class="mapbox" id="mapbox" style="width: 100%; height: 100%"/>
         <ion-icon md="md-navigate" ios="md-navigate" class="logo" />
    </div>
</template>

<script>
/* eslint-disable */
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9zZGFkZSIsImEiOiJjazEzaTFheTIwOW84M2NxZGpseGFodGlkIn0.cqYrYOXCRYMrhN30d0fGfQ';

var map;

export default {
    name: "mapbox",
    mounted() {
        const self = this;
        window.addEventListener('load', function() {    
            self.setMapSize(); 
            map = new mapboxgl.Map({
                container: 'mapbox',
                style: 'mapbox://styles/mapbox/light-v9',
                center: [0, 0],
                zoom: 18,
                pitch: 60,
                antialias: true,
                interactive: false
            });
        });
    },
    watch: {
        $props: {
            handler() {
                this.updateMap();
            },
            deep: true
        }
    },
    props: {
        position: {
            required: true,
            type: Object,
            defaut: {lat: 0, lng:0}
        },
        heading: {
            required: true,
            type: Number,
            defaut: 0
        }
    },
    methods: {
        setMapSize() {
            var mapContainer = document.getElementById("mapContainer");
            const map_Height = document.getElementById("content").offsetHeight;
            const map_Width = document.getElementById("content").offsetWidth;

            mapContainer.style.height = map_Height + "px";
            mapContainer.style.width = map_Width + "px";
        },
        updateMap() {
            map.jumpTo({
                center: {lon: this.position.lng, lat: this.position.lat},
                bearing: this.heading
            });
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
    width: 50px;
    height: 50px;
    top: calc(50% - 25px);
    left: 50%;
    transform: translate(-50% , -50% ) rotateX(60deg);
}
</style>