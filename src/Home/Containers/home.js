import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

import Header from '../../Common/header';

export default function Home(props){

        return(
            <SafeAreaView style={styles.container}>
                <Header 
                    iconName={'menu'}
                    drawer={()=>{props.navigation.openDrawer()}}
                    title={'Home'}
                />
                <View >
                    <Text>HOLAAA HOME</Text>
                </View>
            </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})