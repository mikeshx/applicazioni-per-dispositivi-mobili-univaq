import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Icon } from 'leaflet';
import 'leaflet.BounceMarker';
import * as uuid from 'uuid';

import {MarkerModel} from "../models/marker.model";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  map!: L.Map;

  ngOnInit(){

    //Accessing Device Location
      if(!navigator.geolocation){
        console.log('location not supported')
      }
      navigator.geolocation.getCurrentPosition((position) => {
        let coord = position.coords;
        //Accessing Device Location - END

        //Integrate leaflet
        this.map = L.map('mapId').setView([coord.latitude, coord.longitude], 20);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">MOpenStreetap</a> contributors'
        }).addTo(this.map);
            //Marker

        //Adds a marker in the user coordinates
        L.marker([coord.latitude, coord.longitude]).addTo(this.map)
        .bindPopup("You're Here")
        .openPopup();
      });
      this.watchPosition();
  }

  //Gets user position
  watchPosition(){

    let id = navigator.geolocation.watchPosition((position) =>{
      console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);

    },(err) => {
      console.log(err);
    },{
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000
    })
  }


  /**
   * This will be probably used later
   *   addHomeMarker() {
   *     const homeMarker = L.marker({ lat: 51.50148, lng: -0.12351 });
   *     // homeMarker.addTo(this.map);
   *     homeMarker.bindPopup('This is the Home marker', {
   *       closeButton: true,
   *     });
   *
   *     L.circle(
   *       { lat: 51.50148, lng: -0.12351 },
   *       {
   *         color: 'steelblue',
   *         radius: 500,
   *         fillColor: "steelblue",
   *         opacity: 0.5,
   *       }
   *     ).addTo(this.map);
   *   }
   * */

  // Adds a marker to some specified coordinates
  addMarker() {

    let longitude = "";
    let latitude  = "";

    // Get the current user position and set a draggable marker from it
    navigator.geolocation.getCurrentPosition((position) => {
      let coord = position.coords;

      const mapIcon = L.icon({
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
        popupAnchor: [13, 0],
      });

      L.marker([coord.latitude, coord.longitude], {
        icon: mapIcon,
        draggable: true,
        // @ts-ignore
        bounceOnAdd: true,
      }).on('click', (e)=>{

        localStorage.setItem('longitude', e.target.getLatLng().lat);
        localStorage.setItem('latitude', e.target.getLatLng().lng);

        var latlng = L.latLng(coord.latitude, coord.longitude);
        var popup = L.popup()
          .setLatLng(latlng)
          .setContent('Longitude:' +localStorage.getItem('latitude') + "Latitude:" +localStorage.getItem('longitude'))

        console.log(e.target.getLatLng().lat);
        console.log(e.target.getLatLng().lng);

      }).addTo(this.map);
    });
  }

  /** First implementation of adding a marker into the database
   * Creates an object based on the marker model in /models/marker
   * Adds the object to the database
   * */
  publishMarker(username: string, latitude: string, longitude: string) {

    // Generate a UUID for the marker
    const markerID = uuid.v4();

    const marker : MarkerModel = new MarkerModel(markerID, username, latitude, longitude);






  }
}
