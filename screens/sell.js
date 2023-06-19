import {View,Text, TextInput, TouchableOpacity,StyleSheet,Image, ToastAndroid} from "react-native";
import { useContext, useEffect, useState } from "react";
import { launchImageLibrary} from "react-native-image-picker";
import { user } from "../contexts/userContext";
const Sell=({navigation,route})=>{
    const userCont=useContext(user);
    const [img,setimg]=useState(null)
    const [itemName,setitemName]=useState("")
    const [price,setprice]=useState("")
    const [kms,setkms]=useState("")
    const [phno,setphno]=useState("")
    const [location,setlocation]=useState("")
    useEffect(()=>{
        navigation.setOptions({
            headerTitleAlign:"center",
            headerTintColor:"white",
            headerStyle:{
                backgroundColor:"rgba(34,36,40,1)"
            }
        })
    },[])

    async function selectImage(){
        const image=await launchImageLibrary();
        console.log(image.assets[0].uri);
        setimg(image.assets[0]);
    }
    function sell(){
        //apicall to sell.
        const form=new FormData();
        form.append("image",{
            name:img.fileName,
            uri:img.uri,
            type:img.type
        })
        form.append("itemName",itemName);
        form.append("price",price);
        form.append("phno",phno);
        form.append("location",location);
        form.append("kms",kms);
        form.append("ownerName",userCont.username)
        fetch("http://192.168.1.5:8080/item",{
            method:"POST",
            body:form,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then(res=>res.json())
        .then(data=>{
            ToastAndroid.show("Item posted successfully..",ToastAndroid.LONG);
            setimg(null);
            setitemName("");
            setkms("");
            setlocation("");
            setphno("")
            setprice("");

        })
    }

    return <View style={styles.container}>
        {img && <Image source={{uri:img.uri}} style={{height:150,width:300,borderRadius:10}}/>}
        <TouchableOpacity onPress={selectImage} style={styles.select}>
           { img!=null?<Text style={{color:"white"}}>change photo</Text>: <Text style={{color:"white"}}>upload photo</Text>}
        </TouchableOpacity>
        <TextInput placeholder="Car Model" style={styles.input} placeholderTextColor="black" value={itemName} onChangeText={(text)=>setitemName(text)}/>
        <TextInput placeholder="kms Driven" style={styles.input} placeholderTextColor="black" value={kms} onChangeText={(text)=>setkms(text)}/>
        <TextInput placeholder="Price" style={styles.input} placeholderTextColor="black" value={price} onChangeText={(text)=>setprice(text)}/>
        <TextInput placeholder="Phone Number" style={styles.input} placeholderTextColor="black" value={phno} onChangeText={(text)=>setphno(text)}/>
        <TextInput placeholder="Location" style={styles.input} placeholderTextColor="black" value={location} onChangeText={(text)=>setlocation(text)}/>
        <TouchableOpacity style={styles.btn} onPress={sell}>
            <Text style={{color:"white",fontSize:20,fontWeight:"400"}}>Sell</Text>
        </TouchableOpacity>
    </View>
}
export default Sell;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"flex-start",
        marginTop:30
    },
    input:{
        borderColor:"black",
        borderWidth:2,
        width:350,
        margin:5,
        borderRadius:8,
        color:"black"
    },
    btn:{
        backgroundColor:"green",
        width:200,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:8,
        margin:20
    },
    select:{
        backgroundColor:"blue",
        height:40,
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:8,
        margin:10
    }
})