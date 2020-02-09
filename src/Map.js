import React, {Component} from 'react';
import {ScrollView, TouchableHighlight, Linking, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import { colors, typography, dimensions } from './theme'

import BaseHeader from './BaseHeader'

export default class Map extends Component {
  openMap = () => {
    Linking.openURL('https://goo.gl/maps/yBKLxWo4aB441QHk9')
      .catch((err) => console.error('An error occurred', err));
  }
  render() {
    return (
      <View style={styles.container}>
        <BaseHeader />
        <View style={styles.mapContainer}>
          <ScrollView>
            <View style={styles.mapView}>
              <TouchableHighlight
                onPress={this.openMap}
                underlayColor='transparent'
              >
                <View style={styles.addressContainer}>
                  <Text style={[styles.address, styles.addressHeading]}>Kairaba Beach Hotel</Text>
                  <Text style={styles.address}>Kololi, Greater Banjul Area, The Gambia</Text>
                </View>
              </TouchableHighlight>
              <MapView
                style={styles.mapStyle}
                initialRegion={{
                  latitude: 13.442978,
                  longitude: -16.723885,
                  latitudeDelta: 0.00711,
                  longitudeDelta: 0.00311,
                }}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: 13.442978,
                    longitude: -16.723885
                  }}
                >
                  <View>
                    <Text style={{
                        fontSize: 24
                      }}>🚀</Text>
                  </View>
                </MapView.Marker>
              </MapView>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    width: dimensions.width - 40,
    height: 400,
    borderRadius: 5
  },
  addressContainer: {
    paddingVertical: 10
  },
  address: {
    color: colors.primaryText,
    fontSize: 18,
    marginBottom: 4,
    fontFamily: typography.primary
  },
  addressHeading: {
    fontSize: 18,
    fontFamily: typography.medium,
    marginBottom: 5,
    color: colors.highlight,
    textDecorationLine: 'underline'
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight
  },
  mapContainer: {
    flex: 1
  },
  mapView: {
    padding: 20
  }
});
