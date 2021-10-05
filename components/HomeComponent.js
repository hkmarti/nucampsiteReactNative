import React, { Component } from "react";
import { View, Text, ScrollView } from 'react-native';
import { Card } from "react-native-elements";
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

//Receives state as a prop and returns campsites, promotions, partners as a state// 
const mapStateToProps = state => {
    return{
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners,
    };
};


function RenderItem({item}) {
    if (item){
        return (
            //Styles the Card//
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
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

    //Title of Header
    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            //Renders Cards for Campsites, Promotions and Partners//
            <ScrollView>
                <RenderItem
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]} />
                <RenderItem
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} />
                <RenderItem
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]} />    
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);