import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, {Marker} from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAP_APIKEY } from '@env'
import { Dimensions } from 'react-native';

import { setTravelTimeInformation } from '../slices/navSlice';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const edgePadding = {
  top: windowHeight * 0.05, // 5% of screen height
  right: windowWidth * 0.05, // 5% of screen width
  bottom: windowHeight * 0.05, // 5% of screen height
  left: windowWidth * 0.05, // 5% of screen width
};
const Map = () => {
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!origin || !destination) return;
        // Zoom & fit to markers
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"],edgePadding);
    }, [origin, destination])
    useEffect(() => {
        const getTravelTime = async () => {
            if (!origin || !destination) return;
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAP_APIKEY}`)
            .then(res => res.json())
            .then(data => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
            })
        }
        getTravelTime();
    }, [origin,destination,GOOGLE_MAP_APIKEY])
  return (
    <MapView
    ref={mapRef}
    style={tw`flex-1`}
    mapType='mutedStandard'
        initialRegion={
            {
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }
        }
     >
        {origin && destination && (
            <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAP_APIKEY}
            strokeWidth={3}
            strokeColor="black"
            />
        )}
        {
            origin?.location && (
                <Marker
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng
                }}
                title="Origin"
                description={origin.description}
                identifier="origin"
                />
            )
        }
        {
            destination?.location && (
                <Marker
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng
                }}
                title="Destination"
                description={destination.description}
                identifier="destination"
                />
            )
        }
        </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})