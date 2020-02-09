import React, {Component} from 'react'
import {Image, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View} from 'react-native'
import { colors, typography, dimensions, logo } from './theme'
import { I18n } from 'aws-amplify'
import {Item, Container, Content, Header, Card, CardItem, Body} from 'native-base'

export default class About extends Component {
  render() {
        return (
          <Container>
            <Content style={styles.container}>
              <Card>
                <CardItem header bordered>
                  <Text style={styles.speakerName}>{I18n.get('About the Conference')}</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text style={styles.talkTime}>
                      {I18n.get('In 2020, the 44th Annual General and Scientific Meeting of the West African College of Physicians will hold in Banjul, the beautiful coastal capital of The Gambia. It will be a unique conference of Fellows, Members and other guests arriving from the various member nations and beyond.')}
                    </Text>
                  </Body>
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
  },
  talkTime: {
    color: colors.primaryDark,
    fontFamily: typography.primary,
  },
  speakerName: {
    fontSize: 14,
    color: colors.primaryLight,
    fontFamily: typography.primary,
  }
});
