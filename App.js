
import {View,Text,TextInput,Image} from "react-native";
import Home from "./screens/home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Sell from "./screens/sell";
import HomeScreen from "./screens/HomeScreen";
import UserContext from "./contexts/userContext";
import Login from "./screens/login";
import MainScreen from "./screens/mainscreen";
import SignUp from "./screens/signup";
const App=()=>{
  const stackMain=createNativeStackNavigator();
  return (
    <UserContext>
    <NavigationContainer>
      <stackMain.Navigator>
      <stackMain.Screen name="login" component={Login}/>
      <stackMain.Screen name="Main" component={MainScreen}/>
      <stackMain.Screen name="signup" component={SignUp}/>
      </stackMain.Navigator>
    </NavigationContainer>
    </UserContext>
  )
}
export default App;
