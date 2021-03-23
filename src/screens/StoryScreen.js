import React, {useRef, useState, useEffect} from 'react';
import { Text, View, StyleSheet, Animated, Image } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


const StoryScreen = ({navigation, route}) => {
  const { image, text, setImage } = route.params;
  let animation = useRef(new Animated.Value(0));
  const [onHold, setOnHold] = useState(false);
  const [progress, setProgress] = useState(0);
  useInterval(() => {
    if(progress < 105) {
        if(!onHold){
            setProgress(progress+.5);
        }
    }
    else{
        navigation.navigate('Profile');
    }
  }, 25);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  },[progress])

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })
  return (
    <View onMagicTap={()=>{navigation.navigate('Profile')}} onTouchStart={()=>setOnHold(true)} onTouchEnd={()=>setOnHold(false)} style={{flex: 1, backgroundColor: '#2c405a'}}>
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: "#fff", width }}/>
            </View>
        </View>
        <View style={{flex: 2.5, alignItems: 'center', justifyContent: 'center'}}>
            {image && <Image source={{ uri: image }} resizeMode='contain' style={{width: '80%', height: '60%', borderRadius: 50}}/>}
        </View>
        <View style={{flex: 1.4, alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={{color: 'white', fontSize: 20, maxWidth: 225, textAlign: 'center'}}>{text}</Text>
        </View>
        <Icon name="trash-outline" style={{position: 'absolute', bottom: 20, right: 20, fontSize: 35}} onPress={() => {setImage(null); navigation.navigate('Profile');}} />
    </View>
  );
}

export default StoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: .1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  progressBar: {
    flexDirection: 'row',
    height: 5,
    width: '100%',
    borderColor: '#fff',
    borderWidth: .5,
    borderRadius: 5
  }
});


