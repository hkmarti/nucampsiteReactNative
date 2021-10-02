import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

class Directory extends Component {

    constructor(props){
        super(props);
        this.state={
            campsites: CAMPSITES,
        };
    }

    //Title of Header 
    static navigationOptions = {
        title: 'Directory'
    };

    render(){
        const { navigate } = this.props.navigation;

        const renderDirectoryItem = ({item}) => {

            //onPress will update campsiteId and navigate to the pressed campsite. 
            //the campsiteId will be passed to the campsiteinfo component in the campsiteId param

            //Creates listitem for each campground 
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    onPress = {() => navigate('CampsiteInfo', {campsiteId: item.id})}
                    leftAvatar={{ source: require('./images/react-lake.jpg')}}
                />
            );
        };

        //Formats webpage
        return (
            <FlatList
                data={this.state.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Directory;