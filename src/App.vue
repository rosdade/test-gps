<template>
  <ion-app>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Test GPS</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="content">
      <div slot="fixed">
        <div class="map_container">
<!--           <mappa v-bind:position="position" v-bind:heading="heading"/> -->
          <mapbox v-bind:position="position" v-bind:heading="heading"/>
        </div>
        <div class="div_container">
          <info @changedPosition="updatePosition" @changedHeading="updateHeading"/>
        </div>
      </div>
    </ion-content>
  </ion-app>
</template>

<script>
import info from "./components/info";
//import mappa from './components/mappa';
import mapbox from './components/mappa2';

export default {
  name: 'app',
  components: {
    info,
    //mappa,
    mapbox
  },
  data() {
    return {
      position: {
          lat: 0,
          lng: 0
      },
      heading: 0
    }
  },
  mounted() {    
  },
  methods: {
    updatePosition(position) {
      this.position = position;
    },
    updateHeading(heading) {
      this.heading = heading;
    }
  }
}
</script>

<style scoped>
.map-container {
  position: relative;
  height: 100%;
}

.div_container {
  position: absolute;
  top: calc(100% - 90px);
  left: 50%;
  width: 80%;
  transform: translate(-50% , -50% );
}
</style>