<template>
    <ion-card color="light">
        <ion-grid fixed>
            <ion-row align-items-center>
                <ion-col style="text-align: right;">
                    <ion-label color="primary" style="font-weight: bold;font-size: large;">
                        SPEED
                    </ion-label>
                </ion-col>
                <ion-col size="8">
                    <KGauge v-bind:value="this.speed" :min="0" :max="160" width="170px" height="100%" label-text="Km/h" :format-function="formatSpeed"/>
                </ion-col>
            </ion-row>
        </ion-grid>   
    </ion-card>
</template>

<script>
import KGauge from '@kagronick/kgauge-vue';
import { AbsoluteOrientationSensor, RelativeOrientationSensor } from 'motion-sensors-polyfill'

export default {
    name: "info",
    components: {
        KGauge
    },
    data() {
        return {
            position: {
                lat: 0,
                lng: 0
            },
            speed: 0,
            heading: 0
        };
    },
    mounted() {
        window.addEventListener('load', () => {
            navigator.geolocation.watchPosition(this.getSpeed, this.displayError, {enableHighAccuracy: true, maximumAge: 50});
            const params = new URLSearchParams(new URL(window.location.href).search.slice(1));
            const relative = !!Number(params.get("relative"));
            const coordinateSystem = params.get("coord");
            if (navigator.permissions) {
                Promise.all([navigator.permissions.query({ name: "accelerometer" }),
                            navigator.permissions.query({ name: "magnetometer" }),
                            navigator.permissions.query({ name: "gyroscope" })])
                    .then(results => {
                        if (results.every(result => result.state === "granted")) {
                            this.initSensors(coordinateSystem, relative);
                        } else {
                            this.displayError({message: "No permissions to use Sensors."});
                        }
                    }).catch(() => {
                            this.displayError({message:"Integration with Permissions API is not enabled, still try to start app."});
                            this.initSensors(coordinateSystem, relative);
                    });
            } else {
                this.initSensors(coordinateSystem, relative);
            }
        });
    },
    methods: {
        initSensors(oordinateSystem, relative) {
            const options = { frequency: 60 };
            var sensor = relative ? new RelativeOrientationSensor(options) : new AbsoluteOrientationSensor(options);
            sensor.onreading = () => {
                var qte= require('quaternion-to-euler');
                var euler = qte(sensor.quaternion);
                const pi = 22.0/7.0
                this.heading = ( (euler[0]) / (2 * pi) ) * 360;
                this.$emit("changedHeading", this.heading);
            }; 
            sensor.onerror = (event) => {
                if (event.error.name == 'NotReadableError') {
                    this.displayError({message: "Sensor is not available."});
                }
            }
            sensor.start();
        },
        getSpeed(res) {
            this.position.lat = res.coords.latitude;
            this.position.lng = res.coords.longitude;
            var speed_s = res.coords.speed
            if (speed_s == null) speed_s = 0 ;
            this.speed = speed_s * 3.6;
            this.$emit("changedPosition", this.position);
        },
        displayError(err) {
            this.position.lat = 0 ;
            this.position.lng = 0 ;
            this.speed = 0;
            this.$ionic.alertController.create({
                header: 'Error',
                subHeader: err.message,
                buttons: ['OK']
            })
            .then(aletrMsg => {
                aletrMsg.present();  
            });     
            this.$emit("changedPosition", this.position);
        },
        formatSpeed(v) {
            return `${v.toFixed(1)}`;
        }
    }
}
</script>

<style scoped>

</style>