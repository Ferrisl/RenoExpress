import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    FlatList,
} from 'react-native';

import Header from '../../Common/header';
import Product from '../Components/product';

import {dataProducts} from '../../../utils/api';
import { ListItem, Avatar } from 'react-native-elements';

export default function Inventory(props){

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    //console.log(dataProducts, "ESTA ES LA DATA DEL API=======")

    useEffect(()=>{
        if(loading){
            setTimeout(()=>{
                setData(dataProducts);
                setLoading(false);
            }, 3000)
        }
    })

        return(
            <SafeAreaView style={styles.container}>
                <Header 
                    iconName={'menu'}
                    drawer={()=>{props.navigation.openDrawer()}}
                    title={'Inventario'}
                />
                {!loading && data ?
                    <View style={styles.areaContent}>
                        <View style={styles.totals}>
                            <View style={[styles.totalArea, {justifyContent: 'flex-start', paddingLeft: 15}]}>
                                <Text style={styles.titleTotal}>Existencia:</Text>
                                <Text style={styles.valueTotal}>{data.qty_total}</Text>
                            </View>
                            <View style={[styles.totalArea, {justifyContent: 'flex-end', paddingRight: 15}]}>
                                <Text style={styles.titleTotal}>Precio Promedio:</Text>
                                <Text style={styles.valueTotal}>{data.average_unit_price}</Text>
                            </View>
                        </View>
                        <FlatList
                            style={{flex: 1}}
                            data={data.data}
                            renderItem={({item, index, separators})=>{
                                let image_path = '../../../public/assets/Images/Products/toy-7.png'
                                return(
                                    <View style={{width: '100%', backgroundColor: 'white', marginVertical: 5, elevation: 5}}>
                                        {/* <ListItem>
                                            <View style={{width:'20%', height: '100%'}}>
                                                <Avatar style={{backgroundColor:'#f4f4f4', flex: 1, borderRadius: 10, padding: 5}} title={item.name} source={require(image_path)}  />
                                            </View>
                                            <ListItem.Content>
                                                <ListItem.Title>{item.name}</ListItem.Title>
                                                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                                            </ListItem.Content>
                                            <ListItem.Chevron color="grey" />
                                        </ListItem> */}
                                        <Product product={item} index={index} />
                                    </View>
                                )
                            }}
                        />
                    </View>
                    :
                    <View style={styles.areaLoading}>
                        <ActivityIndicator size="large" color="#528E6F" />
                    </View>
                }
            </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    areaContent: {
        width: '100%',
        height: '100%',
        padding: 5,
        /* alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center' */
    },
    areaLoading: {
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    totals: {
        width: '100%',
        height: '5%',
        backgroundColor: 'white',
        marginBottom: 5,
        flexDirection: 'row',
    },
    totalArea :{
        width: '50%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginRight: 15
    },
    valueTotal: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center'
    },
})