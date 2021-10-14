import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet,
    Alert, PanResponder } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';
import { Rating } from 'react-native-ratings';
import * as Animatable from 'react-native-animatable';

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
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment: (campsiteId, rating, author, text) => 
        (postComment(campsiteId, rating, author, text))
};

function RenderCampsite(props) {

    const {campsite} = props;

    //Creates a reference point//
    const view = React.createRef();

    //Function that determines whether there was a horizontal drag (dx) of -200 pixels. If yes, then value is set to true, otherwise set to false. *Note: -200 pixels = 200px to left//
    const recognizeDrag = ({dx}) => (dx < -200)? true: false;


    const panResponder = PanResponder.create({
        //Activate panResponder to respond to gestures on the component it is used on//
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            //If the gesture was more than 200 pixels to left, then return true and 'Add Favorite' alert//
            if(recognizeDrag(gestureState)) {
                //Sets up 'Add Favorite?' alert with cancel and ok buttons//
                //If already in favorite, then returns console.log, otherwise markFavorite//
                //cancelable: false -> cannot tap out of alert// 
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + campsite.name + ' to favorite?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false}
                );
            }
            return true;
        } 
    });   
    
    if (campsite) {
        return (
            //panResponder is connected to Animatable.View//
            <Animatable.View 
                animation="fadeInDown" 
                duration={2000} 
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}>
                <Card 
                    featuredTitle={campsite.name}
                    image={{uri: baseUrl + campsite.image}}
                >
                    <Text style={{margin: 10}}>
                        {campsite.description}
                    </Text>
                    <View style={styles.cardRow}>
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
                        <Icon 
                            //Pencil icon for writing comments//
                            name="pencil"
                            type="font-awesome"
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                        />
                    </View>
                </Card>
            </Animatable.View>
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
                <Rating 
                    readonly
                    startingValue={item.rating}
                    imageSize={10}
                    style={{
                        alignItems:'flex-start',
                        paddingVertical: '5%'
                    }}
                />
                <Text style={{fontSize: 12}}>
                    {`-- ${item.author} , ${item.date}`}
                </Text>
            </View>
        );
    };

    return(
        //Format Comments section in CampsiteInfo//
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class CampsiteInfo extends Component {

    constructor(props){
        super(props);
        this.state={
            showModal: false,
            rating: 5, 
            author: "",
            text: "",
        };
    }

    //Toggles Modal off and on
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(campsiteId){
        //Since you're taking postComment from mapDispatchToProps (aka props), you have to use this.props.postComment()//
        this.props.postComment(campsiteId, this.state.rating, this.state.author, this.state.text)
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            showModal: false,
            rating: 5, 
            author: "",
            text: "",
        });
    }

    //Event handler that toggles favorite to true//
    //Since you're taking postFavorites from mapDispatchToProps (aka props), you have to use this.props.postFavorite()//
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
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}

                >
                    <View style={styles.modal}>
                        <Rating 
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={rating => this.setState({rating: rating})} 
                            style={{paddingVertical: 10}}
                        />
                        <Input 
                            placeholder="Author"
                            leftIcon={{type:'font-awesome', name:"user-o"}}
                            leftIconContainerStyle={{paddingRight:10}}
                            onChangeText={author => this.setState({author: author})}
                            value={this.state.author}
                        />
                        <Input 
                             placeholder="Comment"
                             leftIcon={{type:'font-awesome', name:"comment-o"}}
                             leftIconContainerStyle={{paddingRight:10}}
                             onChangeText={text => this.setState({text: text})}
                             value={this.state.text}
                        />
                        <View style={{margin:10}}>
                            <Button 
                                title="Submit"
                                color="#5637DD"
                                onPress={() => {
                                    this.handleComment(campsiteId);
                                    this.resetForm();
                                }}
                            />

                        </View>

                        <View style={{margin:10}}>
                        <Button
                            onPress={() => {
                                this.toggleModal();
                            }}
                            color='#808080'
                            title="Cancel"
                        />
                        </View>
                    </View>
                </Modal>

            </ScrollView>
         

        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

//Connects CampsiteInfo component to Redux store, so that CampsiteInfo component receives the campsites,comments prop from Redux store //
export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);