import React from 'react'
import { View, Image, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Hub, Auth, I18n } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import AmplifyTheme from 'aws-amplify-react-native/src/AmplifyTheme'
import { FontAwesome } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as Localization from 'expo-localization'

import Schedule from './Schedule'
import Profile from './Profile'
import Map from './Map'
import Home from './Home'
import { connect } from 'react-redux';

// Import Provider to wrap our app's highest level component
import { Provider } from 'react-redux';

// Import our app's store and persistor
import {store, persistor } from '../redux/store';

// Wrap root component with PersistGate
import { PersistGate } from 'redux-persist/lib/integration/react';

import { colors, logo } from './theme'

const langLoc = Localization.locale;

I18n.setLanguage(langLoc);

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: I18n.get('Home'),
    })
  },
  Schedule: {
    screen: Schedule,
    navigationOptions: ({ navigation }) => ({
      title: I18n.get('Schedule'),
    })    
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: I18n.get('Profile'),
    })
  },
  Map: {
    screen: Map,
    navigationOptions: ({ navigation }) => ({
      title: I18n.get('Map'),
    })    
  }
}, {
  tabBarOptions: {
    activeTintColor: colors.highlight,
    inactiveTintColor: '#fafafa',
    style: {
      backgroundColor: colors.primary
    }
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state
      if (routeName === 'Home') {
        return <FontAwesome color={tintColor} size={20} name='home' />
      }
      if (routeName === 'Schedule') {
        return <FontAwesome color={tintColor} size={20} name='calendar' />
      }
      if (routeName === 'Map') {
        return <FontAwesome color={tintColor} size={20} name='map' />
      }
      return <FontAwesome color={tintColor} size={20} name='user' />
    }
  })
})

class TabNavWithProps extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'Gotham Rounded': require('./assets/fonts/GothamRnd-Light.otf'),
      'GothamRnd Medium': require('./assets/fonts/GothamRnd-Medium.otf'),
      'Gotham Bold': require('./assets/fonts/GothamRnd-Bold.otf')
    });
  }
  static router = TabNavigator.router
  render() {
    return(
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TabNavigator screenProps={{...this.props}} {...this.props}  />
        </PersistGate>
        </Provider>
    )
  }
}

const App = createAppContainer(TabNavWithProps)

const theme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: colors.primaryLight
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: colors.primaryLight
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: colors.primaryOpaque(0.6)
  }
}

class AppWithAuth extends React.Component {
  state = {
    signedIn: true
  }
  async componentDidMount() {
    try {
      await Auth.currentAuthenticatedUser()
      this.setState({ signedIn: true })
    } catch (err) { console.log('user not signed in') }
    Hub.listen('auth', (data) => {
      const { payload: { event } } = data
      if (event === 'signIn') {
        this.setState({ signedIn: true })
      }
      if (event === 'signOut' && this.state.signedIn) {
        this.setState({ signedIn: false })
      }
    })
  }
  render() {
    const signUpConfig = {
      defaultCountryCode: '220',
      signUpFields: [
        {
          label: I18n.get('Country of residence'),
          key: 'country',
          custom: true,
          type: 'string', 
          displayOrder: 3,
          placeholder: I18n.get('Country of residence')
        },
        {
          label: I18n.get('Last Name'),
          key: 'family_name',
          custom: true,
          type: 'string',
          displayOrder: 2,
          placeholder: I18n.get('Last Name')
        },
        {
          label: I18n.get('First Name'),
          key: 'given_name',
          custom: true,
          type: 'string',
          displayOrder: 1,
          placeholder: I18n.get('First Name')
        },
        {
          label: I18n.get('Membership Status'),
          key: 'membership',
          custom: true,
          type: 'string',
          displayOrder: 4,
          placeholder: 'Fellow/Member/None'
        },
        {
          label: I18n.get('Username'),
          key: 'username',
          required: true,
          type: 'string',
          displayOrder: 5,
          placeholder: I18n.get('Username')
        },
        {
          label: I18n.get('Password'),
          key: 'password',
          required: true,
          type: 'password',
          displayOrder: 6,
          placeholder: I18n.get('8+ characters(CAPS+lower+numb3rs)')
        },
        {
          label: I18n.get('Email'),
          key: 'email',
          required: true,
          type: 'email',
          displayOrder: 7,
          placeholder: I18n.get('Email')
        },        
        {
          label: I18n.get('Phone Number'),
          key: 'phone_number',
          required: true,
          type: 'string',
          displayOrder: 8,
          placeholder: I18n.get('Phone Number')
        }, 
      ]
    };

    const AppComponent = withAuthenticator(App, { signUpConfig }, null, null, theme)
    return (
          <KeyboardAvoidingView style={styles.appContainer} behavior="padding" enabled>
            <ScrollView style={styles.appContainer}>
              <View style={styles.appContainer}>
                {!this.state.signedIn && <Logo />}
                  <AppComponent {...this.props} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>  

    )
  }
}

const Logo = () => (
  <View style={styles.logoContainer}>
    <Image
      style={styles.logo}
      resizeMode='contain'
      source={logo}
    />
  </View>
)

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  logoContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 50,
    width: 200
  }
})

export default AppWithAuth;
