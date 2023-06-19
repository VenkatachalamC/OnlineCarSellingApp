import {View,Text,Image,StyleSheet} from "react-native";
import { useEffect } from "react";

const Details=({navigation,route})=>{
    const details=route.params.details;
    console.log(details)
    useEffect(()=>{
        navigation.setOptions({
            headerTitleAlign:"center",
            headerTintColor:"white",
            headerTitle:details.itemName,
            headerStyle:{
                backgroundColor:"rgba(34,36,40,1)"
            }
        })
    },[])

    return (
        <View style={styles.container}>
            <Image source={{uri:`http://192.168.1.5:8080/${details.fileName}`}}  style={styles.image}/>
            <View style={styles.desc}>
            <Text style={styles.itemname}>{details.itemName}</Text>
            <Text style={styles.itemprice}>Rs.{details.price}</Text>
            <Text style={styles.itemprice}>Km-{details.kms} kms</Text>
            <Text style={styles.ownername}>owner name - {details.user.userName}</Text>
            </View>
            <View style={styles.cal}>
            <View style={styles.phCont}>
            <Image source={require("../photos/phone.png")} style={styles.icon}/>
            <Text style={{color:"black"}}>{details.phno}</Text>
            </View>
            <View style={styles.locationCont}>
                <Image source={require("../photos/location.png")} style={styles.icon}/>
            <Text style={{color:"black"}}>{details.location}</Text>
            </View>
            </View>
        </View>
    )
}

export default Details;

const styles=StyleSheet.create({
    image:{
        height:275,
        width:350,
        borderRadius:10,
        alignSelf:"center"
    },
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"flex-start",
        padding:20,
    },
    icon:{
        height:25,
        width:25
    },
    locationCont:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        marginHorizontal:30
    },
    phCont:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        marginHorizontal:30
    },
    cal:{
        marginVertical:20,
        width:350,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start"
    },
    desc:{
        width:350,
        marginTop:10,
        alignItems:"flex-start",
        justifyContent:"center",
    },
    itemname:{
        color:"black",
        fontSize:25,
        fontWeight:"400"
    },
    itemprice:{
        color:"black",
        fontSize:15,
        fontWeight:"400"
    },
    ownername:{
        color:"black",
        fontSize:15,
        fontWeight:"400"
    }
})