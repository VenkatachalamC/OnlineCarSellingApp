
import { useEffect, useState } from "react";
import {View,Text,TextInput,Image,FlatList,StyleSheet,Pressable} from "react-native";
const Home=({navigation,route})=>{
    const [data,setdata]=useState([])
    useEffect(()=>{
        navigation.setOptions({
            headerTitleAlign:"center",
            headerTintColor:"white",
            headerStyle:{
                backgroundColor:"rgba(34,36,40,1)"
            }
        })
        //api call to fetch data.
        fetch("http://192.168.1.5:8080/items")
        .then(res=>res.json())
        .then(data=>setdata(data))
    },[data])
    // const data=[
    //     {
    //         itemName:"pencil",
    //         price:100,
    //         ownerName:"kowshick",
    //         image:"../photos/photo.jpg",
    //         phno:"7449240301",
    //         location:"madurai",
    //         kms:300
    //     },
    //     {
    //         itemName:"pennnnnnnnnnnnnnnnnnnnnnnu",
    //         price:200,
    //         ownerName:"Venkat",
    //         image:"../photos/photo.jpg",
    //         phno:"7449240301",
    //         location:"madurai",
    //         kms:300
    //     },
    //     {
    //         itemName:"Innova",
    //         price:300,
    //         ownerName:"Kileer",
    //         image:"../photos/photo.jpg",
    //         phno:"7449240301",
    //         location:"madurai",
    //         kms:300
    //     }
    // ]
    return (
        <View>
            <FlatList data={data} renderItem={({item})=>{
                return (
                    <Pressable onPress={()=>navigation.navigate("Details",{"details":item})}>
                    <View style={styles.card}>
                        <Image source={{uri:`http://192.168.1.5:8080/${item.fileName}`}} style={styles.img} />
                        <View style={{flex:1,alignItems:"flex-start",justifyContent:"center",width:170,paddingLeft:5}}>
                        <Text style={styles.name}>{item.itemName}</Text>
                        </View>
                        <View style={styles.content}>
                        <Text style={styles.desc}>{item.price}</Text>
                        <Text style={styles.desc}>{item.user.userName}</Text>
                        </View>     
                    </View>
                    </Pressable>
                )
            }} numColumns={2}/>
        </View>
    )
}

export default Home;

const styles=StyleSheet.create({
    card:{
        height:300,
        width:170,
        margin:10,
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white",
        borderRadius:5
    },
    content:{
        flex:1,
        width:175,
        paddingLeft:10,
        alignItems:"flex-start",
        justifyContent:"center"
    },
    name:{
        fontSize:20,
        fontWeight:"bold",
        color:"black",
    },
    desc:{
        flex:1,
        fontSize:13,
        color:"black",
        fontWeight:"500"
    },
    img:{
        height:150,
        width:150
    }
})