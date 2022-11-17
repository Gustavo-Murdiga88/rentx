import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
  runOnUI
} from "react-native-reanimated";
import { Text, StyleSheet } from "react-native";
import react from 'react';
import { Container } from "./styles";

import Logo from '../../assets/logo.svg'
import X from '../../assets/brand.svg'
import { useNavigation } from "@react-navigation/native";

export function Splash() {
  const navigation = useNavigation();
  const splahAnimation = useSharedValue(0);

  const AnimatedStylesX =  useAnimatedStyle(() => {
    return {
      opacity: interpolate(splahAnimation.value, [0,25,50], [1, 0.5,0], Extrapolate.CLAMP),
      transform: [{
        translateX: interpolate(splahAnimation.value, [0, 25, 50], [0, -50, -100], Extrapolate.CLAMP)
      }]
    }
  })

  const AnimatedStylesLogo =  useAnimatedStyle(() => {
    if(splahAnimation.value === 50){
      runOnJS(goHome)();
    }
    return {
      opacity: interpolate(splahAnimation.value, [0,25,40], [0, 0.6,1], Extrapolate.CLAMP), 
      transform: [{
        translateX: interpolate(splahAnimation.value, [0,25,40], [-50, -25, 0], Extrapolate.CLAMP )
      }]
    }
  })

  function goHome(){
    navigation.navigate('SingIn' as never)
  }

  useEffect(() => {
     splahAnimation.value = withTiming(50, {
      duration: 1000,
     }, () => {
      'worklet'
      runOnJS(goHome)()
     })
  },[])
  
  return (
    <Container>
      <Animated.View style={[{position: 'absolute'}, AnimatedStylesX]}>
        <X width={80} height={50}/>
      </Animated.View>
      <Animated.View style={[{position: 'absolute'}, AnimatedStylesLogo]}>
        <Logo />
      </Animated.View>
    </Container>
  );
}