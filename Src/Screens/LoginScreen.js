import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BaseUrl from '../Components/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from "../Components/AuthContext"

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState(null)   // for email value get
    const [pass, setPassword] = useState(null)   // for password value get
    const { login, userToken,userData,getusername } = useContext(AuthContext);
    const isValidPassword = password => password.length >= 6; // Minimum 6 characters


    const isValidEmail = (email) => {
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const loginUser = () => {
        if (!isValidEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        } else if (!(pass)) {
            Alert.alert('Password Required', 'Please enter your password.');
            return;
        } else if (!isValidPassword(pass)) {
            Alert.alert('Invalid Password', 'Password must be at least 6 characters long.');
            return;
        } else {
            let formData = new FormData();
            formData.append('apicall', 'login')
            formData.append('email', email)
            formData.append('password', pass)
            // webUIcommand/admin/web/apis/fscommand_apiv1.00.php?apicall=login&email=appdev@upwork.com&password=3ks9aah
            fetch(BaseUrl + '/webUIcommand/admin/web/apis/fscommand_apiv1.00.php?apicall=login&email=' + email + '&password=' + pass, {
                method: 'Post',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "apikey":"bA8dRfGhJkLmNpQrStUvWxYz12ABCD3EFGH5IJKL7MOPQ9RSTU0VWXY6ZaNcEdXwv"
                },
                body: formData
            }).then((result) => {
                result.json().then((response) => {
                   
                    const apiResponseString = JSON.stringify(response);
                    console.log("first response" + apiResponseString)
                    if(response.message){
                        login(apiResponseString.token);
                        fetch(BaseUrl + "/webUIcommand/admin/web/apis/fscommand_apiv1.00.php?apicall=menu&token="+response.token, {
                            method: "Post",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "multipart/form-data",
                                "apikey":"bA8dRfGhJkLmNpQrStUvWxYz12ABCD3EFGH5IJKL7MOPQ9RSTU0VWXY6ZaNcEdXwv"
                            },
                
                        }).then((result) => {
                            result.json().then((response) => {
                                const apiResponseString = JSON.stringify(response);
                                console.log("second response" + apiResponseString)
                                userData(JSON.stringify(apiResponseString))
                                getusername(apiResponseString.firstname)
                
                            })
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    // console.log(response, "Response");
                    // userData(JSON.stringify(response))
                    // getusername(response.firstname)
                    
                }).catch((err) => {
                    console.log(err)
                })
            })
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={require('../assets/LogoBorder.png')} style={styles.imageLogo} />
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.headingText}>FLEETSENSE</Text>
                <Text style={styles.headingText2}>COMMAND</Text>
                <Text style={styles.textAlign}>WHERE IT ALL COMES{'\n'}TOGETHER</Text>
                <View style={{ marginVertical: 5 }} />
                <View style={styles.borderInput}>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor={'#ffffff'}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.borderInput}>
                    <TextInput
                        value={pass}
                        onChangeText={setPassword}
                        style={styles.input}
                        placeholder='Password'
                        placeholderTextColor={'#ffffff'}
                        autoCapitalize='none'
                    // secureTextEntry={shouldShow}
                    />
                </View>
                <View style={{ marginVertical: 10 }} />
                <TouchableOpacity onPress={() => loginUser()}>
                    <View style={styles.button}>
                        <Text style={styles.loginText}>Login</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ marginVertical: 5 }} />
                <Text style={styles.textPar}>By continuing you agree to our Terms and Conditions {'\n'}V1.0</Text>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20
    },
    imageLogo: {
        height: hp('23.5%'), // Adjust this percentage as needed
        width: wp('50%'),  // Adjust this percentage as needed
        alignSelf: 'center'
    },
    headingText: {
        color: '#f4b41a',
        fontSize: 60,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    headingText2: {
        color: '#fff',
        fontSize: 60,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 60
    },
    textAlign: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        fontStyle: 'italic',
        padding: 20
    },
    borderInput: {
        backgroundColor: '#222222',
        borderWidth: 1,
        borderRadius: wp('3%'),
        borderColor: '#181E25',
        paddingHorizontal: wp('2%'),
        marginVertical: hp('1%'),
        elevation: 5,
        height: hp('7%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        fontWeight: '500',
        padding: wp('2%'),
        fontSize: wp('4%'),
        color: '#ffffff',
        flex: 1,
    },
    button: {
        backgroundColor: '#f4b41a',
        height: hp('7%'),   // Adjust this percentage as needed
        borderRadius: wp('10%'), // Adjust this percentage as needed
        width: wp('50%'),  // Adjust this percentage as needed
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500',
        padding: 10,
        textAlign: 'center'

    },
    textPar: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        padding: 10
    }
})