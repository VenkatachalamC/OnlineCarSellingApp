import { View, TextInput, TouchableOpacity, Text, Image,StyleSheet, ToastAndroid } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useState,useEffect } from "react";
const SignUp=({navigation,route})=>{
    const [name,setname]=useState("")
    const [pass,setpass]=useState("")
    const [pass2,setpass2]=useState("")
    const [img,setimg]=useState(null)
    const [error,seterror]=useState("")
    useEffect(()=>{
        navigation.setOptions({
            headerTitleAlign:"center",
            headerTintColor:"white",
            headerStyle:{
                backgroundColor:"rgba(34,36,40,1)"
            },
            headerTitle:"Sign Up"
        })
    },[])
    function signUp(){
        if(pass===pass2){
            const form=new FormData();
            form.append("dp",{
                name:img.fileName,
                uri:img.uri,
                type:img.type
            })
            form.append("userName",name)
            form.append("password",pass)
            fetch("http://192.168.1.5:8080/user",{
                method:"POST",
                body:form,
                headers:{
                    "Content-Type":"multipart/formdata"
                }
            }).then(res=>res.json())
            .then(data=>{
                ToastAndroid.show("user created successfully",ToastAndroid.LONG);
                navigation.navigate("login")
                setimg(null);
                setname("");
                setpass("");
                setpass2("");
                seterror("")
            })
        }
        else{
            seterror("Passwords do not match.")
        }
    }

    async function addDp(){
        const image=await launchImageLibrary();
        setimg(image.assets[0]);
    }
    return (
        <View style={styles.container}>
            <View style={styles.procont}>
            {img!==null?<Image source={{uri:img.uri}} style={styles.img}/>:<Image source={require("../photos/tempdp.png")} style={styles.img}/>}
            <TouchableOpacity style={styles.changedp} onPress={addDp}>
            <Image source={require('../photos/camera.png')} style={styles.cam}/>
            </TouchableOpacity>
            </View>
            {error && <Text>{error}</Text>}
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
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="black"
                keyboardType="default"
                secureTextEntry={true}
                value={pass2}
                onChangeText={(val) => setpass2(val)}
            />
            <TouchableOpacity style={styles.button} onPress={signUp}>
                <Text style={{ color: "white" }}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUp;


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
    },
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
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
})