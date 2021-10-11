import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { SwipeRow } from "react-native-swipe-list-view";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        favorites: state.favorites, 
    };
};

const mapDispatchToProps = {
    deleteFavorite: campsiteId => deleteFavorite(campsiteId)
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
                //rightOpenValue => sets how many pixels is required to be swiped before option is shown. In this case, must swipe 100 pixels from right to left//
                <SwipeRow rightOpenValue={-100} style={styles.swipeRow}>
                    {/*Must use 2 view components when using SwipeRow. 
                        First view = hidden view when you swipe. 
                        Second view = default view before you swipe.*/}
                    <View style={styles.deleteView}>
                        {/*When pressed, deletes the favorite through campsite.id */}
                        <TouchableOpacity
                            style={styles.deleteTouchable}
                            onPress={() => this.props.deleteFavorite(item.id)}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ListItem
                            title={item.name}
                            subtitle={item.description}
                            leftAvatar={{source: {uri: baseUrl + item.image}}}
                            onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
                        />
                    </View>
                    
                </SwipeRow>
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

//StyleSheet//
const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);