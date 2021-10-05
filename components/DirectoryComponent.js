import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

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
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress = {() => navigate('CampsiteInfo', {campsiteId: item.id})}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        };

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