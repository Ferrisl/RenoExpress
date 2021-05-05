import React, {useState, useEffect} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Dimensions,
 } from "react-native";

 import Icon from 'react-native-vector-icons/Octicons';
 import IconM from 'react-native-vector-icons/MaterialIcons';

 import { ListItem, Avatar } from 'react-native-elements';

 //import image from '../../../public/assets/Images/Products/'
 const { width, height } = Dimensions.get('window');

 export default function Product(props){

    const [expanded, setExpanded] = useState(false);
    let image_path = '../../../public/assets/Images/Products/toy-7.png'

    return(
        <ListItem.Accordion
            content={
                <>
                    <View style={{width:'20%', height: '100%', marginRight: '5%'}}>
                        <Avatar style={{backgroundColor:'#f4f4f4', flex: 1, borderRadius: 10, padding: 5}} title={props.product.name} source={require(image_path)}  />
                    </View>
                    <ListItem.Content>
                        <ListItem.Title style={styles.titleArea}>{props.product.id + ". " + props.product.name}</ListItem.Title>
                        <ListItem.Subtitle style={styles.brandArea}>{props.product.brand}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.descriptionArea} >{props.product.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={()=>{setExpanded(!expanded)}}
        >
            <View style={styles.containerExpandedArea}>
                <View style={styles.expandedArea}>
                    <View style={styles.containerExpanded}>
                        <View style={styles.infoArea}>
                            <View style={styles.titleInfo}>
                                <Text style={styles.titleExpanded}>Precio Unit.</Text>
                            </View>
                            <View style={styles.titleInfo}>
                                <Text style={styles.titleExpanded}>Existencia</Text>
                            </View>
                            <View style={styles.titleInfo}>
                                <Text style={styles.titleExpanded}>Categoria</Text>
                            </View>
                        </View>
                        <View style={styles.valueArea}>
                            <View style={styles.titleInfo}>
                                <Text style={styles.subtitleExpanded}>{"Q. " + props.product.unit_price}</Text>
                            </View>
                            <View style={styles.titleInfo}>
                                <Text style={styles.subtitleExpanded}>{props.product.qty}</Text>
                            </View>
                            <View style={styles.titleInfo}>
                                <Text style={styles.subtitleExpanded}>{props.product.category}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.dataInfo}>
                        <View style={styles.dataContent}>
                            <Text style={styles.titleExpanded}>Último Abastecimiento</Text>
                            <Text style={styles.subtitleExpanded}>{props.product.date_catering}</Text>
                            <Text style={styles.subtitleExpanded}>{"Adquirido: " + props.product.new_qty_catering}</Text>
                        </View>
                    </View>
                    
                </View>
                <View style={styles.grpahArea}>
                    <TouchableOpacity style={styles.buttonGrpah}>
                        <Icon name="graph" size={25} color="black" />
                        <Text style={styles.titleExpanded}>Ver Estatus</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ListItem.Accordion>
    )
 }

 const styles = StyleSheet.create({
     container: {
         
     },
    titleArea: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        //textAlign: 'center'
    },
    descriptionArea: {
        fontSize: 12,
        color: 'grey',
        //textAlign: 'center'
    },
    brandArea: {
        fontSize: 13,
        color: '#21264D',
    },
    containerExpandedArea: {
        height: 150,
        backgroundColor: 'white',
        marginTop: '5%',
    },
    expandedArea: {
        height: '50%',
        width: '100%',
        flexDirection: 'row'
    },
    containerExpanded:{
        width: '50%',
        height: '90%',
        flexDirection: 'row'
    },
    dataInfo: {
        width: '50%',
        height: '90%',
        borderLeftWidth: 3,
        marginLeft: '2%'
        //flexDirection: 'row'
        //backgroundColor: 'green'
    },
    dataContent:{
        width: '100%',
        height: '100%',
        //marginLeft: 5
    },
    infoArea: {
        width: '50%',
        height: '100%',
        flexDirection: 'column',
    },
    valueArea:{
        width: '50%',
        height: '100%',
        flexDirection: 'column',
    },
    titleInfo: {
        width: '100%',
        height: '33.33%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    titleExpanded: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitleExpanded: {
        fontSize: 13,
        color: 'black',
        textAlign: 'center'
    },
    grpahArea:{
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonGrpah: {
        width: '40%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        //elevation: 0.5,
        backgroundColor: '#f4f4f4',
        borderRadius: 5
    }
 })