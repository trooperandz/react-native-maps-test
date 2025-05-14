import React from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const screenDimensions = Dimensions.get('screen');

function App(): React.JSX.Element {
  React.useEffect(() => {
    async function requestLocationPermission(): Promise<boolean> {
      if (Platform.OS !== 'android') {
        return true; // iOS handled differently
      }

      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.mapContainer}>
        <MapView
          onRegionChange={(region, details) => {
            console.log('onRegionChange...');
            console.log({details});
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          userInterfaceStyle="light"
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
            title="My Marker"
            description="This is a marker example"
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: screenDimensions.height,
    width: screenDimensions.width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'yellow',
  },
});

export default App;
