import { useEffect, useState,useContext } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { Platform, StatusBar } from "react-native";
import { PermissionsAndroid } from 'react-native';
import { user } from "../contexts/userContext";
export default Login = ({ navigation }) => {
    const userCont=useContext(user)
    const [name, setname] = useState("")
    const [pass, setpass] = useState("")
    const [errormsg, seterrormsg] = useState("")
    const permission = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
    }
    useEffect(()=>{
        navigation.setOptions({
            headerTitleAlign:"center",
            headerTintColor:"white",
            headerStyle:{
                backgroundColor:"rgba(34,36,40,1)"
            }
        })
        permission();
    },[])
    function signIn() {  
        fetch("http:192.168.1.5:8080/signin",{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'  
            },
            body:JSON.stringify({
                name:name,
                password:pass
            })
        }).then(res=>res.text())
        .then(data=>{
            if(data==="ok"){
                userCont.setusername(name);     
                navigation.navigate("Main")
            }
            else{
                seterrormsg(data);
            }
        })  
    }

    return (
        <View style={styles.container}>
            <View style={styles.divider}></View>
            {/* <Image source={require('../assets/cloud.png')} style={styles.img} /> */}
            {errormsg !== "" && <Text style={{ color: "red" }}>{errormsg}</Text>}
            <TextInput
                style={styles.input}
                placeholder="User Name"
                keyboardType="default"
                placeholderTextColor="black"
                value={name}
                onChangeText={(val) => setname(val)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="black"
                keyboardType="default"
                secureTextEntry={true}
                value={pass}
                onChangeText={(val) => setpass(val)}
            />
            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={{ color: "white" }}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <Text style={{ color: "black" }}>New user?</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        margin: 12,
        borderWidth: 1,
        width: 300,
        height: 50,
        padding: 10,
        borderRadius: 20,
        borderColor: "black",
        color: "black"
    },
    button: {
        backgroundColor: "blue",
        alignItems: "center",
        margin: 10,
        height: 40,
        width: 300,
        justifyContent: "center",
        borderRadius: 20
    },
    img: {
        height: 150,
        width: 150
    },
    container: {
        flex: 1,
        padding: Platform.OS == "android" ? StatusBar.currentHeight : 0,
        alignItems: "center",
        justifyContent: "center"
    },
    topic: {
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        marginBottom: 2,
        fontWeight: "bold",
        color: "white"
    },
    divider: {
        margin: 20
    }
})