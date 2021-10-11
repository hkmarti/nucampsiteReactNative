import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {

    //Title of Header
    static navigationOptions = {
        title: 'Contact Us'
    }

    //Renders Contact Info
    //{"\n"} --> line break 
    render() {
        return (
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card
                        title="Contact Information"
                        wrapperStyle={{margin: 20}}>
                        <Text> 
                        1 Nucamp Way {"\n"}
                        Seattle, WA 98001 {"\n"}
                            U.S.A
                        </Text >
                        <Text style={{marginTop: 10}}>Phone: 1-206-555-1234</Text>
                        <Text>Email: campsites@nucamp.co</Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default Contact;