import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function HeaderLeft(props){

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.contentArea} onPress={()=>{props.onPress()}}>
                {/* <Text style={styles.textArea}>
                    L
                </Text> */}
                <Icon name={props.iconName} size={30} color={"white"}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: '15%'
        //alignContent: 'center',
    },
    textArea: {
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    contentArea: {
        width: '40%',
        height: '60%',
        /* borderRadius: 50,
        backgroundColor: 'white', */
        justifyContent: 'center',
    }
})