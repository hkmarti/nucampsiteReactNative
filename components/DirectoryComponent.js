import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

//Receives state as a prop and returns campsites as a state// 
const mapStateToProps = state => {
    return{
        campsites: state.campsites,
    };
};

class Directory extends Component {

    //Title of Header 
    static navigationOptions = {
        title: 'Directory'
    };

    render(){
        const { navigate } = this.props.navigation;

        const renderDirectoryItem = ({item}) => {

            //onPress will update campsiteId and navigate to the pressed campsite. 
            //the campsiteId will be passed to the campsiteinfo component in the campsiteId param

            //Creates tile for each campground 
            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                    <Tile
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress = {() => navigate('CampsiteInfo', {campsiteId: item.id})}
                        imageSrc={{uri: baseUrl + item.image}}
                    />
                </Animatable.View>
            );
        };

        //if campsites prop is loading....return Loading component//
        if (this.props.campsites.isLoading) {
            return(
                <Loading />
            );
        }

        //if campsites prop has an error....return errMess as text.
        if (this.props.campsites.errMess) {
            return(
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }

        //Formats webpage
        return (
            <FlatList
                data={this.props.campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

//Connects Directory component to Redux store, so that Directory component receives the campsites prop from Redux store //
export default connect(mapStateToProps)(Directory);