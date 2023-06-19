
import {View,Text,Image,StyleSheet,TouchableOpacity, Pressable, Alert} from "react-native";
import { useEffect,useContext,useState,useRef } from "react";
import { user } from "../contexts/userContext";
import { launchImageLibrary } from "react-native-image-picker";
const Account=({navigation,route})=>{
    const userCont=useContext(user);
    const newdp=useRef(null);
    useEffect(()=>{
        navigation.setOptions({
            headerTitleAlign:"center",
            headerTintColor:"white",
            headerStyle:{
                backgroundColor:"rgba(34,36,40,1)"
            }
        })
    })
    async function changedp(){
        const img=await launchImageLibrary();
        newdp.current=img.assets[0]
        const form=new FormData();
        form.append("dp",{
            name: newdp.current.fileName,
            uri: newdp.current.uri,
            type: newdp.current.type
        })
        form.append("userName",userCont.username)
        fetch("http://192.168.1.5:8080/changedp",{
            method:"POST",
            body: form,
            headers: {
                "content-Type": "multipart/form-data"
        }
        }).then(res=>res.json())
        .then(data=>alert("Profile photo changed successfully.."))
    }

    function logout(){
        userCont.logoutuser();
        navigation.navigate("login");
    }

    return (
        <View style={styles.container}>
            <View style={styles.procont}>
            <Image source={{uri:`http://192.168.1.5:8080/dp/${userCont.username}`}} style={styles.img}/>
            </View>
            <Text style={styles.username}>{userCont.username}</Text>
            <TouchableOpacity style={styles.logoutcont} onPress={logout}>
                <Image style={styles.logout} source={require('../photos/logout.png')}/>
            <Text style={styles.logouttxt}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Account;


const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"flex-start",
        padding:10
    },
    img:{
        height:200,
        width:200,
        borderRadius:100,
        margin:20
    },
    cam:{
        height:40,
        width:40
    },
    procont:{
        position:"relative"
    },
    changedp:{
        position:"absolute",
        top:170,
        left:160,
    },
    username:{
        color:"black",
        fontSize:20,
        fontWeight:"400"
    },
    logout:{
        marginLeft:95,
        marginRight:10,
    },
    logoutcont:{
        width:300,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        marginTop:15
    },
    logouttxt:{
        color:"black",
        fontSize:15,
        fontWeight:"400"
    }
})