import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Directory(props) {

    const renderDirectoryItem = ({item}) => {

        //ListItem onPress -> when item is pressed, function will automatically fire //

        //This ListItem onPress triggers the onCampsiteSelect event handler from MainComponent that was passed via props.//

        //The id of the pressed campsite will update item.id and give that value to the onCampsiteSelect event handler. That will then update the selectedCampsite property in the MainComponent with this id.//

        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                onPress = {() => props.onPress(item.id)}
                leftAvatar={{ source: require('./images/react-lake.jpg')}}
            />
        );
    };

    return (
        <FlatList
            data={props.campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default Directory;