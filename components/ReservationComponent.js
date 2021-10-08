import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet,
    Picker, Switch, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class Reservation extends Component {

    constructor(props){
        super(props)

        this.state={
            campers: 1,
            hikeIn: false,
            date: new Date()
        };
    }

    //Title for header
    static navigationOptions = {
        title: 'Reserve Campsite'
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.setState({
            campers: 1,
            hikeIn: false,
            date: new Date()
        });
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Campers</Text>
                    {/*When a user makes a selection from the Picker Items, it will trigger the onValueChange prop of the picker to update the component state with that item's value */}
                    {/*Then the selectedValue prop will also be updated to match the current state so that the picker knows which item to display as the current selection.*/}
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.campers}
                        onValueChange={itemValue => this.setState({campers: itemValue})}
                    >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hike-In?</Text>
                    {/*The onValueChange prop is triggered when the user changes the value and the changed value will update the Reservation component's state with the new value  */}
                    <Switch
                        styles={styles.formItem}
                        value={this.state.hikeIn}
                        trackColor={{true: '#5637DD', false: '#D3D3D3'}}
                        onValueChange={value => this.setState({hikeIn: value})}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <Button 
                        onPress={() => this.setState({showCalendar: !this.state.showCalendar})}
                        title={this.state.date.toLocaleDateString('en-US')}
                        color='#5637DD'
                        accessibilityLabel='Tap me to select a reservation date'
                    />
                </View>
                {/*If showCalendar is false then DateTimePicker will not be shown at all. */}
                {this.state.showCalendar && (
                    <DateTimePicker
                        styles={styles.formItem}
                        value={this.state.date}
                        mode={'date'}
                        display='default'
                        onChange={(event, selectedDate) => {
                            selectedDate && this.setState({date: selectedDate, showCalendar: false})
                        }}
                    />
                )}
                <View style={styles.formRow}>
                    <Button 
                        onPress={() => this.handleReservation()}
                        title='Search'
                        color='#5637DD'
                        accessibilityLabel='Tap me to search for available campsites to reserve'
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex:2
    },
    formItem: {
        flex: 1
    }
})

export default Reservation;

