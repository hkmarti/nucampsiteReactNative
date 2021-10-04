import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';

function RenderCampsite(props) {

    const {campsite} = props;

    if (campsite) {
        return (
            <Card 
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')}
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

    constructor(props){
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            favorite: false,
        }
    }

    //Event handler that toggles favorite to true//
    markFavorite() {
        this.setState({favorite: true});
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
        //Filter comments for the selected campsite we want to render by using comments.campsiteId, renders into new array called comments//
        const comments = this.state.comments.filter (comment => comment.campsiteId === campsiteId);


        //Passes selected campsite to RenderCampsite//
        //Passes new comments array into RenderComments//
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite} 
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default CampsiteInfo;