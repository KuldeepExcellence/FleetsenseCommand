import { ImageBackground, SafeAreaView, Dimensions, StyleSheet, Image, View, StatusBar } from 'react-native';
import React from 'react';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Welcome = () => {
    return (
        <>
            <StatusBar backgroundColor='#000' />
            <View style={styles.mainView}>
                <Image source={require('../assets/LogoBorder.png')} style={styles.Mainlogo} resizeMode='contain' />
            </View>
        </>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Mainlogo: {
        height: HEIGHT * 0.2,
        width: WIDTH * 0.4,
    }
});
