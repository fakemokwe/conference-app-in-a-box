import React, {Component} from 'react';
import {
    Alert,
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Image
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Pager from './Pager'
import Camera from './Camera'
import About from './About'
import Documents from './Documents'
import Sponsors from './Sponsors'
import Hotels from './Hotels'
import Hotelview from './Hotelview'
import Exploreview from './Exploreview'
import Sponsorview from './Sponsorview'
import Documentview from './Documentview'
import Newsview from './Newsview'
import News from './News'
import Explore from './Explore'
import Contact from './Contact'
//import Contactview from './Contactview'
import Gallery from './Gallery'
import Galleryview from './Galleryview'
import Connec from './Connec'
import { FontAwesome } from '@expo/vector-icons'
import { Auth, I18n } from 'aws-amplify'
import { colors, typography, dimensions, logo } from './theme'
import {Root, Item, Container, Content, Header} from 'native-base'
import { connect } from 'react-redux';


import Swiper from 'react-native-swiper'

class Home extends Component {
  state = {
        family_name: '',
        username: '',
        email: '',
        given_name: '',
        country: '',
        membership: '',
        linkedin: '',
        phone_number: '',
        specialty: '',
        organization: '',
        text2:'',
      }
  static navigationOptions = props => ({
  headerLeft: <Image
        source={logo}
        resizeMode='contain'
        style={styles.logo}
      />
  })

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser()
    const {attributes} = user
    const givenName = attributes['custom:given_name']
    const familyName = attributes['custom:family_name']
    const countryName = attributes['custom:country']
    const linkedin2 = attributes['custom:linkedin']
    const specialty2 = attributes['custom:specialty']
    const organization2 = attributes['custom:organization']
    const membership2 = attributes['custom:membership']
    const email2 = attributes['email']
    const phone_number2 = attributes['phone_number']
    const contactString = 'Name: Dr. ' + givenName + ' ' + familyName + '\n' + 'Specialty: ' + specialty2 + '\n' + 'Organization: ' + organization2 + '\n' + 'Country: ' + countryName + '\n' + 'Tel: ' + phone_number2 + '\n' + 'Email: ' + email2 + '\n' +  'LinkedIn: ' + linkedin2
    
    this.setState({
      username: user.username,
      email: email2,
      given_name: givenName,
      family_name: familyName,
      country: countryName,
      membership: membership2,
      linkedin: linkedin2,
      phone_number: phone_number2,
      specialty: specialty2,
      organization: organization2,
      text2: contactString,
    },
    console.log(this.state.organization));
  
  }

  render() {
    const { navigate } = this.props.navigation;
    showAlert1 = () => {  
      Alert.alert(  
          'QR Code Mode',  
          I18n.get('Display your own code or scan another?'),  
          [ { text: I18n.get('Display'),onPress: () => this.props.navigation.push("Connec",{text3: this.state.text2,})  },
            { text: I18n.get('Scan'), onPress: () => this.props.navigation.navigate("Camera") },
            { text: I18n.get('Cancel'), style: 'cancel', },
          ],
          { cancelable: false } 
      );  
    } 
        
        return (
            <Container>
               <Header style={{backgroundColor: colors.primaryLight, flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{color: 'white'}}> {I18n.get('Welcome')}, Dr. {this.state.family_name} </Text>
                </Header>
                <Content style={{ backgroundColor: '#d5d5d6'}}>
                  <Swiper autoplay={true} style={{height: 100}}>
                        <View style={{ flex: 1 }}>
                            <Image
                                style={{ flex: 1, height: null, width: dimensions.width, resizeMode: 'contain' }}
                                source={require('./assets/confapps1.jpg')} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Image
                                style={{ flex: 1, height: null, width: dimensions.width, resizeMode: 'contain' }}
                                source={require('./assets/confapps2.jpg')} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Image
                                style={{ flex: 1, height: null, width: dimensions.width, resizeMode: 'contain' }}
                                source={require('./assets/confapps3.jpg')} />
                        </View>
                    </Swiper>
                    <View style={{
                      flex: 1,
                      justifyContent: 'space-evenly',
                      width: '100%',
                      height: '60%',
                      alignItems: 'center',
                      paddingTop: 10,
                    }}>
                      <View style={{
                        flex: 1,
                        width: '100%',
                        height: '20%',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                        <View style={{
                          flex: 1,
                          width: '20%',
                          height: '100%',
                          alignItems: 'center',
                        }}>
                          <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('About')}
                          underlayColor='transparent'
                        >
                          <FontAwesome color={colors.primaryLight} size={60} name='info-circle' />
                        </TouchableHighlight>
                        </View>
                        <View style={{
                          flex: 1,
                          width: '20%',
                          height: '100%',
                          alignItems: 'center',
                        }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('Documents')}
                          underlayColor='transparent'
                        >
                          <FontAwesome color={colors.primaryLight} size={60} name='book' />
                  
                        </TouchableHighlight>
                        </View>
                        <View style={{
                          flex: 1,
                          width: '20%',
                          height: '100%',
                          alignItems: 'center',
                        }}> 
                        <TouchableHighlight
                          onPress={
                            showAlert1}
                          
                          underlayColor='transparent'
                        >
                            <FontAwesome color={colors.primaryLight} size={60} name='qrcode' />
                        </TouchableHighlight>
                        </View>
                      </View>
                      <View style={{
                        flex: 1,
                        width: '100%',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                        <View style={{
                          flex: 1,
                          width: '20%',
                          alignItems: 'center',
                        }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('About')}
                          underlayColor='transparent'
                        >
                          <View >
                            <Text >
                              {I18n.get('About')}
                            </Text>
                          </View>
                        </TouchableHighlight>
                        </View>
                        <View style={{
                          flex: 1,
                          width: '20%',
                          alignItems: 'center',
                        }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('Documents')}
                          underlayColor='transparent'
                        >
                          <View >
                            <Text >
                              Documents
                            </Text>
                          </View>
                        </TouchableHighlight>
                        </View>
                        <View style={{
                          flex: 1,
                          width: '20%',
                          alignItems: 'center',
                        }}> 
                        <TouchableHighlight
                          onPress={showAlert1}
                          underlayColor='transparent'
                        >
                          <View >
                            <Text >
                              QR Codes
                            </Text>
                          </View>
                        </TouchableHighlight>
                        </View>
                      </View>
                      <View style={{
                        flex: 1,
                        width: '100%',
                        height: '20%',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 10,
                      }}>
                        <View style={{
                          flex: 1,
                          width: '20%',
                          height: '100%',
                          alignItems: 'center',
                        }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('Hotels')}
                          underlayColor='transparent'
                        >
                            <FontAwesome color={colors.primaryLight} size={60} name='hotel' />
                        </TouchableHighlight>
                        </View>
                        <View style={{
                          flex: 1,
                          width: '20%',
                          height: '100%',
                          alignItems: 'center',
                        }}> 
                          <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('Explore')}
                          underlayColor='transparent'
                        >
                          <FontAwesome color={colors.primaryLight} size={60} name='wpexplorer' />
                        </TouchableHighlight>                        
                        </View>
                        <View style={{
                          flex: 1,
                          width: '20%',
                          height: '100%',
                          alignItems: 'center',
                        }}> 
                          <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('Sponsors')}
                          underlayColor='transparent'
                        >
                          <FontAwesome color={colors.primaryLight} size={60} name='money' />
                        </TouchableHighlight>                        
                        </View>
                      </View>
                      <View style={{
                        flex: 1,
                        width: '100%',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                        <View style={{
                          flex: 1,
                          width: '20%',
                          alignItems: 'center',
                        }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('Hotels')}
                          underlayColor='transparent'
                        >
                          <View >
                            <Text >
                              Hotels
                            </Text>
                          </View>
                        </TouchableHighlight>
                        </View>
                        <View style={{
                          flex: 1,
                          width: '20%',
                          alignItems: 'center',
                        }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('Explore')}
                          underlayColor='transparent'
                        >
                          <View >
                            <Text >
                              Explorer
                            </Text>
                          </View>
                        </TouchableHighlight>
                        </View>
                        <View style={{
                          flex: 1,
                          width: '20%',
                          alignItems: 'center',
                        }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('Sponsors')}
                          underlayColor='transparent'
                        >
                          <View >
                            <Text >
                              Sponsors
                            </Text>
                          </View>
                        </TouchableHighlight>
                        </View>
                      </View>
                    </View>
                    <View style={{
                      flex: 1,
                      width: '100%',
                      height: '20%',
                      justifyContent: 'space-evenly',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 10,
                    }}>  
                      <View style={{
                        flex: 1,
                        width: '20%',
                        height: '100%',
                        alignItems: 'center',
                      }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('News')}
                          underlayColor='transparent'
                        >
                          <FontAwesome color={colors.primaryLight} size={60} name='newspaper-o' />
                        </TouchableHighlight>
                      </View>
                      <View style={{
                        flex: 1,
                        width: '20%',
                        height: '100%',
                        alignItems: 'center',
                      }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('Gallery')}
                          underlayColor='transparent'
                        >
                          <FontAwesome color={colors.primaryLight} size={60} name='file-photo-o' />
                        </TouchableHighlight>
                      </View>                      
                      <View style={{
                        flex: 1,
                        width: '20%',
                        height: '100%',
                        alignItems: 'center',
                      }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('Contact')}
                          underlayColor='transparent'
                        >
                          <FontAwesome color={colors.primaryLight} size={60} name='phone' />
                        </TouchableHighlight>
                      </View>
                    </View>
                    <View style={{
                      flex: 1,
                      width: '100%',
                      justifyContent: 'space-evenly',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <View style={{
                          flex: 1,
                          width: '20%',
                          alignItems: 'center',
                        }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('News')}
                          underlayColor='transparent'
                        >
                          <View >
                            <Text >
                              {I18n.get('News')}
                            </Text>
                          </View>
                        </TouchableHighlight>
                      </View>
                      <View style={{
                          flex: 1,
                          width: '20%',
                          alignItems: 'center',
                        }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('Gallery')}
                          underlayColor='transparent'
                        >
                          <View >
                            <Text >
                              {I18n.get('Gallery')}
                            </Text>
                          </View>
                        </TouchableHighlight>
                      </View>                      
                      <View style={{
                          flex: 1,
                          width: '20%',
                          alignItems: 'center',
                        }}> 
                        <TouchableHighlight
                          onPress={() => this.props.navigation.navigate('Contact')}
                          underlayColor='transparent'
                        >
                          <View >
                            <Text >
                              Contact
                            </Text>
                          </View>
                        </TouchableHighlight>
                      </View>
                    </View>          
                </Content>
            </Container>
        );
    }
}

const HomeNav = createStackNavigator({
  Home: { screen: Home },
  Connec: { 
    screen: Connec,
    navigationOptions: ({ navigation }) => ({
      title: I18n.get('Display My QR Code'),
    }),
  },
  Camera: { 
    screen: Camera,
    navigationOptions: ({ navigation }) => ({
      title: I18n.get('Scan QR Code'),
    }),
  },
  Documents: { 
    screen: Documents,
    navigationOptions: ({ navigation }) => ({
      title: 'Documents',
    }),
  },
  Hotels: { 
    screen: Hotels,
    navigationOptions: ({ navigation }) => ({
      title: 'Hotels',
    }),
  },
  Explore: { 
    screen: Explore,
    navigationOptions: ({ navigation }) => ({
      title: I18n.get('Exploring Banjul'),
    }),
  },
  Sponsors: { 
    screen: Sponsors,
    navigationOptions: ({ navigation }) => ({
      title: 'Sponsors',
    })
  },
  News: { 
    screen: News,
    navigationOptions: ({ navigation }) => ({
      title: I18n.get('What\'s New'),
    })    
  },
  Contact: { 
    screen: Contact,
    navigationOptions: ({ navigation }) => ({
      title: 'Contact',
    }) 
  },
  Hotelview: { 
    screen: Hotelview},
  Exploreview: { 
    screen: Exploreview},
  Sponsorview: { 
    screen: Sponsorview},
  Documentview: { 
    screen: Documentview},  
  Newsview: { 
    screen: Newsview},
  Galleryview: { 
    screen: Galleryview},
//  Contactview: { 
//    screen: Contactview},    
  Gallery: { 
    screen: Gallery,
    navigationOptions: ({ navigation }) => ({
      title: I18n.get('Gallery'),
    }),
  },
  About: { 
    screen: About,
    navigationOptions: ({ navigation }) => ({
      title: I18n.get('About'),
    })     
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.primary,
      borderBottomColor: colors.primaryLight,
      borderBottomWidth: 1
    },
    headerTintColor: colors.highlight,
    
  }
})

export default connect(state => state)(HomeNav)

const styles = StyleSheet.create({
  bottomButton: {
    width: dimensions.width,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1
  },
  bottomButtonText: {
    color: colors.highlight,
    fontFamily: typography.primary,
  },
  tabBottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: dimensions.width,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "rgba(255, 255, 255, .2)",
    borderBottomColor: "rgba(255, 255, 255, .2)",
    left: 0, 
    bottom: -1
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
  name: {
    fontFamily: typography.medium,
    fontSize: 17,
    marginBottom: 5,
    color: colors.primaryText,
  }
});
