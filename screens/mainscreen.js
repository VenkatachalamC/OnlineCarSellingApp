import {Image} from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import Sell from "./sell";
import { useEffect } from "react";
import Account from "./account";
function MainScreen({navigation,route}){

    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    })
    const tab=createBottomTabNavigator();
    return (
        <tab.Navigator screenOptions={{
            headerShown: true,
            tabBarStyle: {
              height: 60,
              paddingHorizontal: 5,
              paddingTop:5,
              paddingBottom:5,
              backgroundColor: 'rgba(34,36,40,1)',
              borderTopWidth: 0,
              keyboardHidesTabBar: true,
          },
        }}>
            <tab.Screen name="HomeScreen" component={HomeScreen} 
            options={{
              headerShown:false,
              title:"Home",
            tabBarIcon: ({ color, size }) => (
              <Image source={require("../photos/home.png")} style={{height:size,width:size}}/>
            )}} />
            <tab.Screen name="Sell" component={Sell} 
            options={{
              title:"Sell Car",
              tabBarIcon: ({ color, size }) => (
                <Image source={require("../photos/sell.png")} style={{height:size,width:size}}/>
              )
              }}/>
              <tab.Screen name="Account" component={Account} options={{
                title:"Account",
                tabBarIcon:({color,size})=>{
                   return( <Image source={require("../photos/account.png")} style={{height:size,width:size}}/>
    )}
              }}/>
            </tab.Navigator>
    )
}

export default MainScreen;