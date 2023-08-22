import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect,useState, useContext } from 'react'
import { Touchable } from 'react-native';
import { AuthContext } from '../Components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../Components/BaseUrl';

const Data = [
    {
        id: '1',
        image: require('../assets/vehicles.png'),
        receivingAddress: 'Vehicles',
        numberItems: '1245 Items',

    },
    {
        id: '2',
        image: require('../assets/subassets.png'),
        receivingAddress: 'Sub-Assets',
        numberItems: '1245 Items',

    },
    {
        id: '3',
        image: require('../assets/telematics.png'),
        receivingAddress: 'Telematics',
        numberItems: '1245 Items',

    },
    {
        id: '4',
        image: require('../assets/fuel.png'),
        receivingAddress: 'Fuel',
        numberItems: '1245 Items',

    },
    {
        id: '5',
        image: require('../assets/drivers.png'),
        receivingAddress: 'Drivers',
        numberItems: '1245 Items',

    },
    {
        id: '6',
        image: require('../assets/contracts.png'),
        receivingAddress: 'Contracts',
        numberItems: '1245 Items',

    },
    {
        id: '7',
        image: require('../assets/usagelogs.png'),
        receivingAddress: 'Usage Logs',
        numberItems: '1245 Items',

    },
    {
        id: '8',
        image: require('../assets/billing.png'),
        receivingAddress: 'Billing',
        numberItems: '1245 Items',

    },
    {
        id: '9',
        image: require('../assets/scans.png'),
        receivingAddress: 'Scans',
        numberItems: '1245 Items',

    },
    {
        id: '10',
        image: require('../assets/settings.png'),
        receivingAddress: 'Settings',
        numberItems: '1245 Items',

    },
    {
        id: '11',
        image: require('../assets/driverassignments.png'),
        receivingAddress: 'Driver Assignments',
        numberItems: '1245 Items',

    },
    {
        id: '12',
        image: require('../assets/documentuploads.png'),
        receivingAddress: 'Documents Uploads',
        numberItems: '1245 Items',

    },
]

const HomeScreen = ({ navigation }) => {

    const { userToken, userInfo, userName } = useContext(AuthContext);
    const parsedData = JSON.parse(userInfo);
    const [menuData, setMenuData] = useState(parsedData)
    useEffect(async() => {
        // Retrieve data from AsyncStorage
       await AsyncStorage.getItem('userDetail')
          .then(data => {
            if (data) {
              const parsedData = JSON.parse(data);
              setMenuData(parsedData.menu_items);
            }
          })
          .catch(error => {
            console.log('Error retrieving data:', error);
          });
      }, []);
    // console.log(menuData, 'menuData')


    const GuestData = ({ item }) => {

        console.log(item,'888888')
        return(


        <ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('Vehicles',{data:item.name})} style={[styles.flatList,{backgroundColor:item.colour}]}>
                <Image source={{uri:item.icon}} style={{ width: wp('12.2%'), height: hp('6%'), }} />
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.textNum}>{item.desc}</Text>
            </TouchableOpacity>
        </ScrollView>
   ) }


    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.topheader}>
                <Text style={styles.txtheader}>Hello,{userName}</Text>
                <View style={styles.bellBorder}>
                    <Image source={require('../assets/bell.png')} style={styles.imageLogo} />
                </View>
            </View>

            <View style={{ marginVertical: 10 }} />
            <FlatList
                data={menuData}
                keyExtractor={(item) => item.id}
                // renderItem={renderItem}
                renderItem={({ item, index }) =>
                (<GuestData item={item} index={index}></GuestData>)}
                numColumns={2}
            />

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10
    },
    topheader: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txtheader: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '500',
        marginLeft: 10
    },
    imageLogo: {
        height: hp('4%'), // Adjust this percentage as needed
        width: wp('5%'),  // Adjust this percentage as needed
        alignSelf: 'center',
        marginVertical: 4,

    },
    bellBorder: {
        backgroundColor: '#f4b41a',
        width: 50,
        height: 40,
        borderRadius: 10,
        alignSelf: 'flex-end',
        marginRight: 10

    },
    flatList: {
        width:wp('46.5%'),
        height:hp('15%'),
        backgroundColor: '#222222',
        margin: 5,
        padding: 20,
        borderRadius: 20
    },
    text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
        marginVertical: 5
    },
    textNum: {
        color: '#aaaaaa',
        fontSize: 12
    }
})