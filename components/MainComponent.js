import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Constants from 'expo-constants';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';


//Stack Navigator for Directory Component//
const DirectoryNavigator = createStackNavigator(
    //Screens//
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    },

    {
        initialRouteName: 'Directory',

        //Style of Navigation Header//
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

//Stack Navigator for Home Component//
const HomeNavigator = createStackNavigator(
    //Screens//
    {
        Home: { screen: Home },
        
    },

    {
        //Style of Navigation Header//
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

//Stack Navigator for About Component//
const AboutNavigator = createStackNavigator(
    //Screens//
    {
        About: { screen: About },
        
    },

    {
        //Style of Navigation Header//
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);


//Stack Navigator for Contact Component//
const ContactNavigator = createStackNavigator(
    //Screens//
    {
        Contact: { screen: Contact },
        
    },

    {
        //Style of Navigation Header//
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);


//Drawer Navigator, opens at Home by default bc it's 1st Screen//
const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator},
        Directory: {screen: DirectoryNavigator},
        About: {screen: AboutNavigator},
        Contact: {screen: ContactNavigator},
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);

//Always wrap top-lvl navigator with createAppContainer//
const AppNavigator = createAppContainer(MainNavigator);


class Main extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}>
                <AppNavigator />
            </View>
        );
    }
}

export default Main;