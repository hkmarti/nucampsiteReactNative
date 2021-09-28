import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

function RenderCampsite({campsite}) {
    if (campsite) {
        return (
            <Card 
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')}
            >
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class CampsiteInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            campsites: CAMPSITES,
        }
    }

    //Title of Header
    static navigationOptions = {
        title: 'Campsite Information'
    }

    render(){

        //Holds id of selected campsite //
        const campsiteId = this.props.navigation.getParam('campsiteId');
        //Pulls out campsite object from campsite array using filter, has it so selected campsite (campsiteId) === campsite.id//
        const campsite = this.state.campsites.filter (campsite => campsite.id === campsiteId)[0];
        //Passes selected campsite to RenderCampsite//
        return <RenderCampsite campsite={campsite} />;
    }
}

export default CampsiteInfo;