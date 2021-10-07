import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

//Receives state as a prop and returns campsites, comments & favorites as a state// 
const mapStateToProps = state => {
    return{
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    };
};

//Pass in postFavorite action creator with campsiteId as a paramaeter//
const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId))
};

function RenderCampsite(props) {

    const {campsite} = props;

    if (campsite) {
        return (
            <Card 
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}}
            >
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>

                <Icon
                    //If favorite=true then solid heart(heart), if not then empty heart(heart-o)//
                    name={props.favorite? 'heart' : 'heart-o'}
                    type='font-awesome' //Name of iconset//
                    color='#f50'
                    raised ///Shadow effect//
                    reverse //Reverse color scheme//
                    //If heart icon is already pressed, console.log. If not, set favorite to true with markFavorite//
                    onPress={() => props.favorite? 
                        console.log('Already set as favorite') : props.markFavorite()}
                />

            </Card>
        );
    }
    return <View />;
}

function RenderComments({comments}) {

    //Renders comments array into separate sections//
    const renderCommentItem = ({item}) => {
        return(
            <View style={{margin:10}}>
                <Text style={{fontSize: 14}}> 
                    {item.text} 
                </Text>
                <Text style={{fontSize: 12}}> 
                    {item.rating} Stars
                </Text>
                <Text style={{fontSize: 12}}>
                    {`-- ${item.author} , ${item.date}`}
                </Text>
            </View>
        );
    };

    return(
        //Format Comments section in CampsiteInfo//
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class CampsiteInfo extends Component {

    //Event handler that toggles favorite to true//
    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
    }

    //Title of Header
    static navigationOptions = {
        title: 'Campsite Information'
    }

    render(){

        //Holds id of selected campsite //
        const campsiteId = this.props.navigation.getParam('campsiteId');
        //Pulls out campsite object from campsite array using filter, has it so selected campsite (campsiteId) === campsite.id//
        const campsite = this.props.campsites.campsites.filter (campsite => campsite.id === campsiteId)[0];
        //Filter comments for the selected campsite we want to render by using comments.campsiteId, renders into new array called comments//
        const comments = this.props.comments.comments.filter (comment => comment.campsiteId === campsiteId);


        //Passes selected campsite to RenderCampsite//
        //Passes new comments array into RenderComments//
        return (
            <ScrollView>
               <RenderCampsite campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

//Connects CampsiteInfo component to Redux store, so that CampsiteInfo component receives the campsites,comments prop from Redux store //
export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);