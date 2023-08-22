import React,{useState,useEffect} from "react"
import { View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from "./Wellcome";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import Vehicles from "./Vehicles";


const Stack = createStackNavigator();

const Navigation = () => {

    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
             <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="Vehicles" component={Vehicles}></Stack.Screen>  
        </Stack.Navigator>

    )
}
export default Navigation








 export const AuthStack = () => {


    const [showWellcome, setShowWellcome] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShowWellcome(false)
        }, 1000);
    }, []);

    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>

        {showWellcome ? <Stack.Screen name="Welcome" component={Welcome} /> : null}

             <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
        </Stack.Navigator>

    )
}
