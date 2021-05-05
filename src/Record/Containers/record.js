import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    Modal
} from 'react-native';

import Header from '../../Common/header';
import RadioButton from 'radio-buttons-react-native';
import NumericInput from 'react-native-numeric-input';

import {dataProducts} from '../../../utils/api';

export default function Record(props){

    const radios = [
        {
            label: 'Compra'
        },
        {
            label: 'Venta'
        }
    ];

    const data = dataProducts;

    const [titleName, setTitleName] = useState("Proveedor");

    const [transaction, setTransaction] = useState(radios[0].label);
    const [nit, setNit] = useState(null);
    const [name, setName] = useState(null);
    const [direction, setDirection] = useState(null);
    const [idProd, setIdProd] = useState(0);
    const [nameProd, setNameProd] = useState(null);
    const [brandProd, setBrandProd] = useState(null);
    const [qtyPord, setQtyPord] = useState(1);
    const [priceProd, setPriceProd] = useState("0.00");
    const [total, setTotal] = useState("0.00");

    const [showModal, setShowModal] = useState(false);

    const searchProduct = (idProd) => {
        setIdProd(idProd);
        let found = data.data.filter(prod=> prod.id == idProd);
        console.log(found, "FOUND ==========")
        if(found.length > 0){
            setNameProd(found[0].name)
            setPriceProd((found[0].unit_price).toString());
            setBrandProd(found[0].brand);
            calculateTotal(qtyPord, (found[0].unit_price).toString())
        }else{
            setNameProd("")
            setPriceProd("0.00");
            setBrandProd("");
            calculateTotal(1, "0.00")
        }
    }

    const calculateTotal = (cant, price) => {
        setQtyPord(cant);
        let decimals = price.split('.');
        let total = cant * parseInt(price)
        let valueDecimal = parseInt(decimals[1]) > 10? (parseInt(decimals[1])/100) : (parseInt(decimals[1])/10)   
        if(total > 0){
            setTotal((((total) + (valueDecimal)*cant).toFixed(2)).toString());
        }else{
            setTotal("0.00")
        }
    }

    const nextStep = () =>{
        if(name && nit && direction && idProd && qtyPord && nameProd && priceProd && brandProd){
            console.log("TODO LLENO, SE REALIZA LA ACCION========");
            //alert("Realizado con éxito");
            setShowModal(true);
        }else{
            alert("No fue posible realizar la compra. Todos los campos son necesarios (*)");
        }
    }
    
        return(
            <SafeAreaView style={styles.container}>
                <Header 
                    iconName={'menu'}
                    drawer={()=>{props.navigation.openDrawer()}}
                    title={'Compra/Venta'}
                />
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={showModal}
                >
                            <View style={styles.modalView}>
                                <View style={styles.modalheader}>
                                    <Text style={styles.modalTile}>{titleName == "Proveedor"? "Compra": "Venta"}</Text>
                                </View>
                                <View style={styles.modalBody}>
                                   <View style={styles.sectionsBody}>
                                       <View style={styles.sectBody}>
                                            <Text style={styles.sectionTtitle}>Datos Personales</Text>
                                            <View style={styles.colsModal}>
                                                <View style={styles.colModal}>
                                                    <Text style={styles.titleColumnModal}>{titleName}: </Text>
                                                    <Text style={styles.titleColumnModal}>NIT: </Text>
                                                    <Text style={styles.titleColumnModal}>Dirección: </Text>
                                                </View>
                                                <View style={[styles.colModal, {width: '50%'}]}>
                                                    <Text>{name}</Text>
                                                    <Text>{nit}</Text>
                                                    <Text>{direction}</Text>
                                                </View>
                                            </View>
                                       </View>
                                       <View style={styles.sectBody}>
                                            <Text style={styles.sectionTtitle}>Producto</Text>
                                            <View style={styles.colsModal}>
                                                <View style={styles.colModal}>
                                                    <Text style={styles.titleColumnModal}>ID: </Text>
                                                    <Text style={styles.titleColumnModal}>Cantidad: </Text>
                                                    <Text style={styles.titleColumnModal}>Precio: </Text>
                                                    <Text style={styles.titleColumnModal}>Marca: </Text>
                                                </View>
                                                <View style={[styles.colModal, {width: '60%'}]}>
                                                    <Text>{idProd}</Text>
                                                    <Text>{qtyPord}</Text>
                                                    <Text>{"Q. " + priceProd}</Text>
                                                    <Text>{brandProd}</Text>
                                                </View>
                                            </View>
                                       </View>
                                   </View>
                                   <View style={[styles.sectionsBody, {height: '20%'}]}>
                                       <View style={styles.totalModal}>
                                           <Text style={styles.titleTotal}>Total a Pagar: </Text>
                                       </View>
                                       <View style={styles.totalModal}>
                                           <Text style={styles.valueTotal}>{"Q. " + total}</Text>
                                       </View>
                                   </View>
                                </View>
                                <View style={styles.modalFooter}>
                                    <View style={styles.modalButtonArea}>
                                        <TouchableOpacity style={styles.modalButton} onPress={()=>{setShowModal(false); props.navigation.navigate("Inventario")}}>
                                            <Text style={styles.buttonText}>Ok</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    <ScrollView contentContainerStyle={styles.formArea}>
                        <View style={styles.form}>
                            <Text style={styles.generalTitle}>Completar el siguiente formulario</Text>
                            <Text style={styles.generalSubtitle}>Campos (*) obligatorios</Text>
                            <View style={styles.selectArea}>
                            <Text style={styles.generalTitle}>Tipo de Transacción</Text>
                                <RadioButton
                                    initial={1}
                                    style={styles.radiosArea}
                                    boxStyle={{height: '40%'}}
                                    data={radios}
                                    selectedBtn={(radio)=>{setTransaction(radio.label); radio.label == "Compra"? setTitleName("Proveedor") : setTitleName("Cliente")}}
                                />
                            </View>
                            <Text style={styles.titleForm}>Datos Personales</Text>
                                <View style={styles.inputArea}>
                                    <View style={styles.titleInputArea}>
                                        <Text style={styles.titleInput}>{titleName+ "(*)"}: </Text>
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        value={name}
                                        onChangeText={(name)=>{setName(name)}}
                                        placeholder={"Ingresa nombre de " + titleName} 
                                    />
                                </View>
                                <View style={styles.inputArea}>
                                    <View style={styles.titleInputArea}>
                                        <Text style={styles.titleInput}>{"NIT(*):"} </Text>
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        value={nit}
                                        onChangeText={(nit)=>{ nit.length<10 && setNit(nit)}}
                                        placeholder={"Ingresa número de NIT "} 
                                        keyboardType={"number-pad"}
                                    />
                                </View>
                                <View style={styles.inputArea}>
                                    <View style={styles.titleInputArea}>
                                        <Text style={styles.titleInput}>{"Dirección(*):"} </Text>
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        value={direction}
                                        onChangeText={(direction)=>{setDirection(direction)}}
                                        placeholder={"Ingresa Dirección"}
                                    />
                                </View>
                                <Text style={styles.titleForm}>Detalle de Producto</Text>
                                <View style={styles.dormDetails}>
                                    <View style={[styles.area1, {flexDirection: null, alignSelf: 'center'}]}>
                                        <View style={[styles.inputAreaDetail1, {width: '40%', alignSelf: 'center'}]}>
                                                <View style={[styles.titleInputArea, {width: '30%'}]}>
                                                    <Text style={styles.titleInput}>{"ID(*):"} </Text>
                                                </View>
                                                {/* <TextInput
                                                    style={[styles.input, {width: '70%'}]}
                                                    value={idProd}
                                                    onChangeText={(id)=>{setIdProd(id)}}
                                                    onBlur={()=>{searchProduct(idProd)}}
                                                    placeholder={"Ingresa ID"}
                                                    keyboardType={"number-pad"}
                                                /> */}
                                                <NumericInput
                                                    value={idProd}
                                                    minValue={0}
                                                    maxValue={data.data.length - 1}
                                                    type={"up-down"}
                                                    onChange={(id)=>{searchProduct(id)}}
                                                />
                                        </View>
                                    </View>
                                    <View style={[styles.area1, {flexDirection: null}]}>
                                        <View style={[styles.inputAreaDetail1, {width: '100%'}]}>
                                            <View style={[styles.titleInputArea, {width: '30%'}]}>
                                                <Text style={styles.titleInput}>{"Nombre(*):"} </Text>
                                            </View>
                                            <TextInput
                                                style={[styles.input, {width: '70%'}]}
                                                value={nameProd}
                                                onChangeText={(nameProd)=>{setNameProd(nameProd)}}
                                                placeholder={"Ingresa Nombre del Producto"}
                                                editable={false}
                                            />
                                        </View>
                                    </View>
                                    <View style={[styles.area1, {flexDirection: null}]}>
                                        <View style={[styles.inputAreaDetail1, {width: '50%'}]}>
                                            <View style={[styles.titleInputArea, {width: '60%'}]}>
                                                <Text style={styles.titleInput}>{"Cantidad(*):"} </Text>
                                            </View>
                                            {/* <TextInput
                                                style={[styles.input, {width: '50%'}]}
                                                value={qtyPord}
                                                onChangeText={(qty)=>{setQtyPord(qty); calculateTotal(qty, priceProd)}}
                                                placeholder={titleName == "Proveedor"? "Comprar" : "Vender" }
                                                keyboardType={"number-pad"}
                                                autoCompleteType="cc-number"
                                                editable={idProd ? true : false}
                                            /> */}
                                            <NumericInput
                                                    value={qtyPord}
                                                    minValue={1}
                                                    type={"up-down"}
                                                    onChange={(qty)=>{calculateTotal(qty, priceProd)}}
                                                />
                                        </View>
                                    </View>
                                    <View style={[styles.area1, {flexDirection: null}]}>
                                        <View style={[styles.inputAreaDetail1, {width: '100%'}]}>
                                                <View style={[styles.titleInputArea, {width: '30%'}]}>
                                                    <Text style={styles.titleInput}>{"Precio(*):"} </Text>
                                                </View>
                                                <TextInput
                                                    style={[styles.input, {width: '40%'}]}
                                                    value={"Q. " + priceProd}
                                                    onChangeText={(price)=>{setPriceProd(price)}}
                                                    placeholder={"Ingresa Precio"}
                                                    keyboardType={"number-pad"}
                                                    editable={false}
                                                />
                                        </View>
                                    </View>
                                    <View style={[styles.area1, {flexDirection: null}]}>
                                        <View style={[styles.inputAreaDetail1, {width: '100%'}]}>
                                                <View style={[styles.titleInputArea, {width: '30%'}]}>
                                                    <Text style={styles.titleInput}>{"Marca(*):"} </Text>
                                                </View>
                                                <TextInput
                                                    style={[styles.input, {width: '70%'}]}
                                                    value={brandProd}
                                                    onChangeText={(brand)=>{setBrandProd(brand)}}
                                                    placeholder={"Ingresa Marca del Producto"}
                                                    editable={false}
                                                />
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.titleForm}>Totales</Text>
                                <View style={styles.totalArea}>
                                    <View style={styles.totalTitle}>
                                        <Text style={styles.totalText}>
                                            Total: 
                                        </Text>
                                    </View>
                                    <View style={styles.totalTitle}>
                                        <Text style={[styles.totalText, {fontWeight: 'normal'}]}>
                                            {"Q. " + total} 
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.buttonGoArea}>
                                    <TouchableOpacity style={styles.buttonGo} onPress={()=>{nextStep()}}>
                                        <Text style={styles.buttonText}>{"Realizar " + transaction}</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </ScrollView>
                    
                        
            </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    formArea: {
        //height: '100%',
        width: '100%',
    },
    generalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 15
    },
    generalSubtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        marginBottom: 15
    },
    titleForm: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 15,
    },
    form:{
        //width: '100%',
        //height: '100%',
        backgroundColor: 'white',
    },
    inputArea: {
        width: '90%',
        height: 60,
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        alignContent: 'center',
        paddingHorizontal: 10
    },
    titleInputArea:{
        width: '30%',
        //height: '80%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    titleInput: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    input: {
        color: 'black',
        //textAlign: 'center',
        fontSize: 17,
        //height: '80%',
        height: 50,
        width: '70%',
        padding: 5,
        borderWidth: 2,
        borderRadius: 15
    },
    selectArea: {
        width: '100%',
        height: 160,
        //height: '20%',
        alignItems: 'center'
    },
    radiosArea: {
        width: '50%',
        height: 120
        //height: '80%'
    },
    buttonGoArea:{
        width: '100%',
        height: 80,
        //height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 50
    },
    buttonGo: {
        //width: '80%',
        height: 60,
        width: '60%',
        //height: '80%',
        backgroundColor: '#009688',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        borderRadius: 20
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    dormDetails: {
        width: '100%',
    },
    area1:{
        width: '90%',
        marginTop: 15,
        paddingHorizontal: 10
    },
    inputAreaDetail1:{
        width: '35%',
        flexDirection: 'row'
    },
    inputAreaDetail2:{
        width: '65%',
        flexDirection: 'row'
    },
    totalArea:{
        width: '100%',
        marginTop: 5,
        backgroundColor: '#f4f4f4',
        height: 60,
        flexDirection: 'row',
    },
    totalTitle: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    modalView: {
        margin: 20,
        justifyContent: 'center',
        height: '40%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalheader: {
          width: '100%',
          height: '25%',
          alignItems: 'center',
      },
      modalBody: {
          width: '100%',
          height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      sectionsBody: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      },
      sectBody: {
          width: '50%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
      },
      sectionTtitle:{
          fontSize: 16,
          fontWeight: 'bold',
          color: 'black',
          
      },
      colsModal:{
          width: '95%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
      },
      colModal:{
          width: '50%',
          height: '100%',
          flexDirection: 'column',
      },
      titleColumnModal:{
          fontSize: 13,
          color: 'black',
          textAlign: 'right',
          fontWeight: 'bold'
      },
      totalModal:{
          width: '50%',
          height: '90%',
          alignItems: 'center'
      },
      titleTotal:{
          fontSize: 16,
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'right'
      },
      valueTotal:{
        fontSize: 15,
        color: 'black',
        textAlign: 'left',
        borderBottomWidth: 2
      },
      modalFooter: {
          width: '100%',
          height: '15%',
          justifyContent: 'center',
          alignItems: 'center'
      },
      modalButtonArea:{
          width: '50%',
          height: '100%',
          backgroundColor: '#009688',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15
      },
      modalButton: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
      },
      modalTile:{
          fontSize: 22,
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'center'
      },
      modalSubTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
      }
})