import { StyleSheet, Text, View, Image, SafeAreaView,TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const Header = ({data}) => {

    const navigation = useNavigation(); // Get the navigation object using the hook

    return (
        <SafeAreaView>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
            <View style={styles.bellBorder}>
                <Image source={require('../../assets/Back.png')} style={styles.imageLogo} />
            </View>
            </TouchableOpacity>
            <Text style={styles.text}>{data}</Text>
            <View style={styles.bellBorder}>
                <Image source={require('../../assets/bell.png')} style={styles.imageLogo} />
            </View>
        </View>

        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({

    imageLogo: {
        height: hp('4%'), // Adjust this percentage as needed
        width: wp('5%'),  // Adjust this percentage as needed
        alignSelf: 'center',
        marginVertical: 4

    },

    bellBorder: {
        backgroundColor: '#f4b41a',
        width: 50,
        height: 40,
        borderRadius: 10,

    },
    container:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    text:{
        color:'#fff',
        fontSize:18,
        fontWeight:'500',
        margin:10
    }
})