import React, { Component } from 'react';
import { ScrollView, FlatList, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

//Receives state as a prop and returns partner as a state// 
const mapStateToProps = state => {
    return{
        partners: state.partners
    };
};

class About extends Component {

    //Title of Header
    static navigationOptions = {
        title: 'About Us'
    }

    render() {

        //Renders Community Partners List 
        const renderPartner = ({item}) => {

            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: {uri: baseUrl + item.image}}}
                />
            );
        };

        //Mission Statement 
        function Mission() {
            return(
                <Card title="Our Mission">
                    <Text style={{margin: 10}}>
                    We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
                    </Text>
                </Card>
            );
        }

        //If partners state is loading...., return Loading component//
        if (this.props.partners.isLoading){
            return(
                <ScrollView>
                    <Mission/>
                    <Card title="Community Partners">
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }

        //If partners state has an error message...return errMess text//
        if (this.props.partners.errMess){
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <Mission/>
                        <Card title="Community Partners">
                            <Text>{this.props.partners.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }

        //If no error and everything has loaded correctly then renders webpage//
        return (
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Mission/>
                    <Card title="Community Partners">
                        <FlatList
                        data={this.props.partners.partners}
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

//Connects About component to Redux store, so that About component receives the partners prop from Redux store //
export default connect(mapStateToProps)(About);