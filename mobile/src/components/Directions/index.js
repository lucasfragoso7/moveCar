import React from 'react';
import MapViewDirections from 'react-native-maps-directions'

const Directions = ({destination, origin, onReady})=> <MapViewDirections 
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyAm0iuy_6JBrDkVPI2NdUyVx1Wc2ksoOCk"
    strokeWidth= {3}
    strokeColor="#5393d3"
/>;

export default Directions;
