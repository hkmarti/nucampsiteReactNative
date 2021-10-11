import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { TapGestureHandler } from 'react-native-gesture-handler';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        favorites: state.favorites, 
    };
};

class Favorites extends Component {

    //Title of Header
    static navigationOptions = {
        title: "My Favorites"
    }

    render() {

        const { navigate } = this.props.navigation;

        //Renders the favorited campsites as a ListItem//
        const renderFavoriteItem = ({item}) => {
            return(
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
                />
            );
        };

        //If campsites is loading....return loading wheel(Loading component)
        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        //If campsites receives an error while loading...return error message(errMess)
        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }
        //If no error message or no longer loading, return only FAVORITED campsites using a filter method//
        //Checks campsite.id in campsite list and sees whether it matches a campsite.id in the favorites list//
        return (
            <FlatList
                data={this.props.campsites.campsites.filter(
                    campsite => this.props.favorites.includes(campsite.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Favorites);