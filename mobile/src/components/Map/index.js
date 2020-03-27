import React, { Component } from 'react';
import MapView , { AnimatedRegion , PROVIDER_GOOGLE } from 'react-native-maps';
import {View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Search from "../Search";
import Geocoder from "react-native-geocoding";
import Directions from '../Directions';
import {getPixelSize} from '../../utils';

Geocoder.init("AIzaSyAm0iuy_6JBrDkVPI2NdUyVx1Wc2ksoOCk");

export default class Map extends Component {
  state = {
    region: null,
  }

  goToInitialLocation() {
    let initialRegion = Object.assign({}, this.state.initialRegion);
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
    this.mapView.animateToRegion(initialRegion, 2000);
  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    });
  };
  async componentDidMount() {
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(","));

        this.setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.00134,
            longitudeDelta: 0.00143,
          }
        });
      }, //sucesso
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    );
  }

  render() {
    const {region, destination}  = this.state;
    console.log(destination)
    return <View style={{flex : 1}}>
    <MapView
      style={{flex : 1}}
      followUserLocation={true}
      zoomEnabled={true}
      showsUserLocation={true}
      initialRegion={region}
      ref={el => this.mapView = el}
      >
        {destination && (
          <Directions
            origin={region}
            destination={destination}
            onReady = {(result) =>{
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding:{
                  right: getPixelSize(50),
                  left: getPixelSize(50),
                  top: getPixelSize(50),
                  bottom: getPixelSize(350)
                }
              })
            }}
          />
        )}
    </MapView>
    <Search onLocationSelected={this.handleLocationSelected} />
  </View>;
  }
}
