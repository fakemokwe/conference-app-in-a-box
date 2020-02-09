import React, {Component} from 'react'
import {Image, Linking, StyleSheet} from 'react-native'
import { colors, typography, dimensions, logo } from './theme'
import * as WebBrowser from 'expo-web-browser';

import {Item, Container, Content, Header, Card, CardItem, Body, Icon, Text, Right} from 'native-base'

export default class Contact extends Component {
  render() {
        return (
          <Container>
            <Content style={styles.container}>
              <Card>
                <CardItem bordered button onPress={() => Linking.openURL()}>
                  <Icon active name="mail" />
                  <Text>Email</Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                 </CardItem>                
                <CardItem bordered button onPress={() => Linking.openURL()}>
                  <Icon active name="md-phone-portrait" />
                  <Text>Phone</Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                 </CardItem> 
              </Card>
              <Card>
                <CardItem bordered button onPress={()=>WebBrowser.openBrowserAsync()}>
                  <Icon active name="logo-whatsapp" />
                  <Text>Whatsapp</Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                 </CardItem>
                <CardItem bordered button onPress={()=>WebBrowser.openBrowserAsync()}>
                  <Icon active name="logo-facebook" />
                  <Text>Facebook</Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                 </CardItem>
            </Card>
            <Card>
              <CardItem bordered button onPress={()=>WebBrowser.openBrowserAsync()}>
                  <Icon active name="logo-twitter" />
                  <Text>Twitter</Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </CardItem>               
                <CardItem bordered button onPress={()=>WebBrowser.openBrowserAsync()}>
                  <Icon active name="logo-linkedin" />
                  <Text>LinkedIn</Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                 </CardItem>                 
                </Card>
            </Content>
          </Container>
        )}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryLight,
    flex: 1
  }
});