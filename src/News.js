import React, {Component} from 'react'
import {ActivityIndicator, Image, ScrollView, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import Newsview from './Newsview'
import { colors, typography, dimensions} from './theme'

import { API, graphqlOperation } from 'aws-amplify'
import { listNewss } from './graphql/queries'

class News extends Component {
  
  state = {
    newss: [],
    loading: true
  }
  
  async componentDidMount() {
    try {
      const newsData = await API.graphql(graphqlOperation(listNewss))
      this.setState({ newss: newsData.data.listNewss.items, loading: false })
    } catch (err) {
      console.log('err: ', err)
      this.setState({ loading: false })
    }
  }
  render() {
    const { newss, loading } = this.state
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )
    }
    const newsData = newss
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.listContainer}>
          {
            newsData.map((news, i) => (
              <TouchableOpacity
                key={i} 
                onPress={
                  () => this.props.navigation.push('Newsview', news)
                }
              >
                <View style={styles.news}>
                  <View style={styles.speakerContainer}>
                    <View style={styles.avatarContainer}>
                      <Image
                        style={styles.avatar}
                        resizeMode='cover'
                        source={{ uri: news.newsAvatar }}
                      />
                    </View>
                    <View style={styles.infoContainer}>
                      <Text
                        style={styles.name}
                      >{news.name}</Text>
                      <Text style={styles.speakerName}>{news.shortDesc}</Text>
                    </View>
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.newsTime}>{news.website}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          }
          </View>
        </ScrollView>
      </View>
    );
  }
}


export default News

const styles = StyleSheet.create({

  listContainer: {
    paddingBottom: 70,
  },
  speakerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  logo: {
    marginLeft: 10,
    marginBottom: 4,
    width: 120,
    height: 35
  },
  container: {
    backgroundColor: colors.primaryLight,
    flex: 1
  },
  loading: {
    backgroundColor: colors.primaryLight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  news: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    margin: 15,
    marginBottom: 0,
    paddingTop: 15,
    paddingBottom: 0,
  },
  timeContainer: {
    backgroundColor: "#ddd",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: colors.primaryDark
  },
  newsTime: {
    color: colors.primaryText,
    fontFamily: typography.primary,
  },
  infoContainer: {
    flex: 8,
    paddingLeft: 20
  },
  name: {
    fontFamily: typography.medium,
    fontSize: 17,
    marginBottom: 5,
    color: colors.primaryText,
  },
  avatarContainer: {
    flex: 2,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  avatar: {
    width: 60,
    height: 70,
  },
  speakerName: {
    fontSize: 14,
    color: colors.primaryText,
    fontFamily: typography.primary,
  }
});
