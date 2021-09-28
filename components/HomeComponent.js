import React, { Component } from "react";
import { View, Text, ScrollView } from 'react-native';
import { Card } from "react-native-elements";
import { CAMPSITES } from '../shared/campsites';
import { PROMOTIONS } from '../shared/promotions';
import { PARTNERS } from '../shared/partners';

function RenderItem({item}) {
    if (item){
        return (
            //Styles the Card//
            <Card
                featuredTitle={item.name}
                image={require('./images/react-lake.jpg')}>
                <Text 
                    style={{margin:10}}>
                    {item.description}    
                </Text>
            </Card>
        );
    } else {
        return <View />;
    }
}


class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            campsites: CAMPSITES,
            promotions: PROMOTIONS,
            partners: PARTNERS,
        };
    }

    //Title of Header
    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            //Renders Cards for Campsites, Promotions and Partners//
            <ScrollView>
                <RenderItem
                    item={this.state.campsites.filter(campsite => campsite.featured)[0]} />
                <RenderItem
                    item={this.state.promotions.filter(promotion => promotion.featured)[0]} />
                <RenderItem
                    item={this.state.partners.filter(partner => partner.featured)[0]} />    
            </ScrollView>
        );
    }
}

export default Home;