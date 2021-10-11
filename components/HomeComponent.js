import React, { Component } from "react";
import { View, Text, Animated } from 'react-native';
import { Card } from "react-native-elements";
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from "./LoadingComponent";

//Receives state as a prop and returns campsites, promotions, partners as a state// 
const mapStateToProps = state => {
    return{
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners,
    };
};


function RenderItem(props) {

    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

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

    //sets scaleValue of animation at 0//
    constructor(props){
        super(props);
        this.state={
            scaleValue: new Animated.Value(0)
        };
    }

    //Function for animation where...//
        //toValue is the final value of scale(1=100) and duration is timing (1500=1.5 secs)//
        //useNativeDriver -> helps improve animation performance//
    animate(){
        Animated.timing(
            this.state.scaleValue,
            {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            }
        ).start();
    }

    //When Home component mounts, it automatically starts the animation//
    componentDidMount() {
        this.animate();
    }

    //Title of Header
    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            //Renders Cards for Campsites, Promotions and Partners//
            //Changes scale by using the transform style//
            <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
               <RenderItem
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                />
                <RenderItem
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                <RenderItem
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess}
                />
            </Animated.ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);