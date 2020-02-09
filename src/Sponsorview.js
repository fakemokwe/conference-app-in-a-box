import React, {Component} from 'react';
import * as WebBrowser from 'expo-web-browser';
import {ScrollView, StyleSheet, Text, View, Image, Linking, TouchableHighlight} from 'react-native'
import { dimensions, colors, typography } from './theme'
import { Auth, I18n } from 'aws-amplify'

export default class Sponsorview extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`
  });
  
  render() {
    const { navigation: { state: { params }}} = this.props
    console.log('params:', params)
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{uri: params.sponsorAvatar}}
            resizeMode='cover'
            style={styles.avatar}
          />
          <Text style={styles.speakerName}>{params.name}</Text>
          <TouchableHighlight
            onPress={() => WebBrowser.openBrowserAsync('https://' + params.website)}
            underlayColor='transparent'
          >
            <Text style={styles.time}>{params.website}</Text>
          </TouchableHighlight>
          
          <Text style={styles.title}>{I18n.get('Summary')}</Text>
          <Text style={styles.summary}>{params.summary}</Text>
          <Text style={styles.title}>{I18n.get('Address')}</Text>


          <TouchableHighlight
            onPress={() => Linking.openURL(params.locations)}
            underlayColor='transparent'
          >          
          <Text style={styles.speakerBio}>{params.locations}</Text>
          </TouchableHighlight>          
          <TouchableHighlight
            onPress={() => Linking.openURL('mailto:' + params.email)}
            underlayColor='transparent'
          >          
            <Text style={styles.speakerBio}>{params.email}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => WebBrowser.openBrowserAsync('https://' + params.website)}
            underlayColor='transparent'
          >
            <Text style={styles.speakerBio}>{params.website}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => Linking.openURL('tel:' + params.phoneNumber)}
            underlayColor='transparent'
          >           
            <Text style={styles.speakerBio}>{params.phoneNumber}</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 15,
    width: dimensions.width - 40,
    height: 300
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primaryLight
  },
  title: {
    fontSize: 22,
    marginTop: 15,
    color: colors.primaryText,
    fontFamily: typography.medium
  },
  name: {
    fontSize: 26,
    marginBottom: 20,
    marginTop: 20,
    color: colors.highlight,
    fontFamily: typography.medium,
  },
  speakerName: {
    marginBottom: 5,
    fontSize: 16,
    color: colors.primaryText,
    fontFamily: typography.medium
  },
  time: {
    color: colors.highlight,
    fontFamily: typography.medium,
  },
  summary: {
    marginTop: 4,
    color: colors.primaryText,
    fontFamily: typography.primary,
  },
  speakerBio: {
    color: colors.primaryText,
    textDecorationLine: 'underline'
  }
});

