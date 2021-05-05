import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

export default function HeaderLeft(props){

    return(
        <View style={styles.container}>
            <Text style={styles.contentArea}>
                {props.title?
                    props.title
                    :
                    "RenoExpress"
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        //alignItems: 'flex-start',
        //alignContent: 'center',
    },
    contentArea: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
})