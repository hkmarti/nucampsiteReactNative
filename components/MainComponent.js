import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Constants from 'expo-constants';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


//Navigation Bar//
const DirectoryNavigator = createStackNavigator(
    //Navigation Links?//
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

//Always wrap top-lvl navigator with createAppContainer//
const AppNavigator = createAppContainer(DirectoryNavigator);


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