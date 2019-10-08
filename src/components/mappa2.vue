<template>
  <div class="mapbox" id="mapbox" />
</template>

<script>
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9zZGFkZSIsImEiOiJjazEzaTFheTIwOW84M2NxZGpseGFodGlkIn0.cqYrYOXCRYMrhN30d0fGfQ';

var map;

export default {
    name: "mapbox",
    mounted() {
        window.addEventListener('load', function() {     
            this.setMapSize;      
            map = new mapboxgl.Map({
                container: 'mapbox',
                style: 'mapbox://styles/mapbox/light-v9',
                center: [0, 0],
                zoom: 9,
                pitch: 60,
                antialias: true
            });
        });
    },
    watch: {
        $props: {
            handler() {
                this.updateMap()
            },
            deep: true
        }
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
        setMapSize() {
            var mapContainer = document.getElementById("mapbox");
            const map_Height = document.getElementById("content").offsetHeight;
            const map_Width = document.getElementById("content").offsetWidth;

            mapContainer.style.height = map_Height + "px";
            mapContainer.style.width = map_Width + "px";
        },
        updateMap() {
            map.panTo([this.position.lng, this.position.lat]);
            map.rotateTo(this.heading);
        },
    }
}
</script>

<style>
    .mapbox {
        position:absolute; 
        top:0; bottom:0;
        width:100%;
    }
</style>