import React from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSheet } from 'react-native-btr';

function ProfileScreen({ navigation }) {
    const [viewed, setViewed] = useState(false);
    const [visible, setVisible] = useState(false);

    const [storyImage, setStoryImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    
    const name = 'Aman Garg';
    const title = 'Fullstack Developer';
    const refrence = 'www.newzera.com';
    const text = 'Such An Amazing Day! Wedding Season vibes';

    const toggleBottomNavigationView = () => {
      setVisible(!visible);
    };
  
    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status1 } = await ImagePicker.requestCameraPermissionsAsync();
            const { status2 } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status1 !== 'granted' || status2 !== 'granted') {
            alert('Sorry, we need camera and media permissions to make this work!');
            }
        }
        })();
    }, []);

    const pickImage = async ( isProfileImage, isCamera ) => {
        let result;
        if(isCamera){
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: isProfileImage ? [1, 1] : [4, 3],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: isProfileImage ? [1, 1] : [4, 3],
                quality: 1,
            });
        }
        setVisible(false);        

        if (!result.cancelled) {
            if(isProfileImage){
                setProfileImage(result.uri);
                return;
            }
            setStoryImage(result.uri);
            setViewed(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="chevron-back" style={styles.icons}/>
                <Icon name="menu" style={styles.icons}/>
            </View>
            <BottomSheet
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
            >
                <View style={styles.bottomNavigationView}>
                    <TouchableOpacity activeOpacity={.1} style={styles.button}>
                        <Text onPress={() => {pickImage(true, true)}} style={{color: 'white', opacity: 1, padding: '2%', fontSize: 20}}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text onPress={() => {pickImage(true, false)}} style={{color: 'white', opacity: 1, padding: '2%', fontSize: 20}}>Choose from Gallery</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
            <View style={styles.content}>
                
                <View style={styles.decagonRing}>
                    <TouchableOpacity 
                    activeOpacity={.75}
                    onLongPress={toggleBottomNavigationView}
                    onPress={() => {
                        if(storyImage){
                            navigation.navigate('Story', { image: storyImage, text: text, setImage: setStoryImage });
                            setViewed(true);
                        } 
                    }}>
                        {storyImage ? ( 
                            viewed ? <Image source={require('../../assets/decagon-gray.png')} style={styles.decagonRing}/>
                            : <Image source={require('../../assets/decagon.png')} style={styles.decagonRing}/>
                            ) : <Image source={require('../../assets/decagon-white.png')} style={styles.decagonRing}/>
                        }
                        <Image source={require('../../assets/hollow-decagon.png')} style={styles.hollowDecagon} />
                    </TouchableOpacity>
                </View>
                <Image source={profileImage ? {uri: profileImage} : require('../../assets/user.png')} style={styles.profileImage} />
                <Image source={require('../../assets/hollow-decagon.png')} style={styles.profileImageCover} />

                {!storyImage && 
                    <Icon onPress={() => pickImage(false, false)} 
                    name="add-circle" 
                    style={styles.iconsAbsolute}
                    />
                }
                <Text numberOfLines={1} style={styles.textLarge}>{name}</Text>
                <Text numberOfLines={1} style={styles.text}>{title}</Text>
                <Text numberOfLines={1} style={styles.text}>{refrence}</Text>
            </View>

            <LinearGradient 
                colors={['#fff', '#fbba38', '#fff', '#fdd887', '#fff', '#fff', '#fdd887', '#fff', '#fbba38', '#fff']} 
                locations={[0, .1, .4, .42, .47, .53, .58, .6, .9, 1]}
                start={{x:0, y:.5}} end={{x:1, y:.5}} 
                style={styles.line} 
            />

            <View style={styles.footer}>
                <Icon name="square" style={styles.icons}/>
                <Image source={require('../../assets/decagon.png')} style={styles.imageIcon}/>
                <Icon name="triangle" style={styles.icons}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomNavigationView: {
        flex:.3,
        backgroundColor: 'black',
        opacity: .75,
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    textLarge: {
        fontSize: 20,
        margin: 10,
        color: '#868686'
    },
    text: {
        color: '#868686'
    },
    decagonRing: {
        height: 318,
        width: 318,
        bottom: 16,
    },
    hollowDecagon: {
        height: 274,
        width: 274,
        position: 'absolute',
        left: 21.5,
        bottom: 38,
        zIndex: 1,
    },
    profileImageCover: {
        height: 255,
        width: 255,
        position: 'absolute',
        left: 78,
        bottom: 227,
        zIndex: -1,
    },
    profileImage: {
        height: 225,
        width: 225,
        position: 'absolute',
        left: 93,
        bottom: 242,
        zIndex: -1,
    },
    footer: {
        flex: .6,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 35,
    },
    content: {
        flex: 6,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icons: {
        fontSize: 40,
        padding: 20,
        paddingBottom: 0,
        color:'#fbba38',
    },
    iconsAbsolute: {
        fontSize: 40,
        padding: 20,
        color:'#fbba38',
        position: 'absolute',
        bottom: 245,
        left: 255,
        zIndex: 2,
    },
    imageIcon: {
        bottom: 28,
        width: 50,
        height: 50,
    },
    line:{
        height: 1,
    },
})

export default ProfileScreen;