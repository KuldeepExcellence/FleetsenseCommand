import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [apiData, setApiData] = useState(null);
    const [userName, setUserName] = useState(null);
    const [weightage, setWeightage] = useState(null);


    const login = (data) => {

        setUserToken(data)
        AsyncStorage.setItem('userToken', data)
        console.log("user token set ")
        console.log(data)
    }

    const userData = (data) => {

        setUserInfo(data)
        AsyncStorage.setItem('userDetail', data)
        console.log("user data set ")
        // console.log(data)
    }
    const getusername = (data) => {

        setUserName(data)
        AsyncStorage.setItem('userName', data)
        console.log("user data set ")
        // console.log(data)
    }
    const logout = () => {
        
        setUserToken(null);
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('userDetail')
        AsyncStorage.removeItem('userName')
        console.log("logout presed")

    }
    const isLoggedIn = async () => {
        try {

            let userToken = await AsyncStorage.getItem('userToken');
            let userDetail = await AsyncStorage.getItem('userDetail');
            let username = await AsyncStorage.getItem('userName');
            setUserToken(userToken);
            setUserInfo(userDetail);
            setUserName(username);
        } catch (e) {
            console.log(`isLogged in error ${e}`)
        }
    }
    useEffect(() => {
        isLoggedIn();
    }, []);
    return (
        <AuthContext.Provider value={{ login, getusername,logout,userData, userToken, setUserToken, userName,userInfo }}>
            {children}
        </AuthContext.Provider>
    );
}