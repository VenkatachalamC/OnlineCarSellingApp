import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./home";
import Details from "./details";

const HomeScreen=()=>{
    const stack=createNativeStackNavigator();
    return (
            <stack.Navigator>
                <stack.Screen name="Home" component={Home}/>
                <stack.Screen name="Details" component={Details}/>
            </stack.Navigator>

    )
}
export default HomeScreen;