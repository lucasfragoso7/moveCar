import React, { Component , Fragment} from 'react';
import MapView , { Marker , AnimatedRegion , PROVIDER_GOOGLE } from 'react-native-maps';
import {View , Image} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Search from "../Search";
import Geocoder from "react-native-geocoding";
import Directions from '../Directions';
import Details from '../Details'
import {getPixelSize} from '../../utils';
import {Back, LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall} from '../Map/styles'

import backImage from '../../assets/back.png';
import markerImage from '../../assets/marker.png';

Geocoder.init("AIzaSyAm0iuy_6JBrDkVPI2NdUyVx1Wc2ksoOCk");

export default class Map extends Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
  }

  goToInitialLocation() {
    let initialRegion = Object.assign({}, this.state.initialRegion);
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
    this.mapView.animateToRegion(initialRegion, 2000);
  }

  handleBack = () => {
    this.setState({destination : null})
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
    const {region, destination, duration, location}  = this.state;
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
          <Fragment>
            <Directions
              origin={region}
              destination={destination}
              onReady = {(result) =>{
                this.setState({duration: Math.floor(result.duration)})
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
          <Marker coordinate={destination} anchor={{ x: 0, y:0}} image={markerImage} >
              <LocationBox>
                <LocationText>
                  {destination.title}
                </LocationText>
              </LocationBox>
          </Marker>

          <Marker coordinate={region} anchor={{ x: 0, y:0}}>
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>{duration}</LocationTimeText>
                  <LocationTimeTextSmall>Min</LocationTimeTextSmall>
                </LocationTimeBox>
                <LocationText>{location}</LocationText>
              </LocationBox>
          </Marker>
        </Fragment>
      )}
    </MapView>
    {destination ? 
    (<Fragment>
      <Back onPress={this.handleBack}>
        <Image source={backImage}/>
      </Back>
      <Details/> 
    </Fragment>) :
    (<Search onLocationSelected={this.handleLocationSelected}/>)
  }
  </View>;
  }
}
