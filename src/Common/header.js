import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from 'react-native';

import HeaderCenter from './header_center';
import HeaderLeft from './header_left';
import HeaderRight from './header_right';

function Header(props) {

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.headerArea}>
                <View style={[styles.headerSizes, {width: '25%'}]}>
                    <HeaderLeft iconName={props.iconName} onPress={()=>{props.drawer()}}/>
                </View>
                <View style={[styles.headerSizes, {width: '50%'}]}>
                    <HeaderCenter title={props.title}/>
                </View>
                <View style={[styles.headerSizes, {width: '25%'}]}>
                    {props.headerRight?
                        <HeaderRight right={props.headerRight}/>
                        :
                        null
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '8%',
        backgroundColor: '#009688',
        //borderWidth: 2,
        //borderColor: 'black'
    },
    headerArea: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        //borderWidth: 2,
        //borderColor: 'red'
    },
    headerSizes: {
        width: '33.3%',
        height: '100%',
        //borderWidth: 2,
        //borderColor: 'blue',
        //alignItems: 'center',
    }
})

export default Header;