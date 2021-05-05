import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

export default function HeaderLeft(){

    return(
        <View style={styles.container}>
            <Text style={styles.contentArea}>
                R
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: '15%'
    },
    contentArea: {
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})