import { View, Pressable } from 'react-native';
import React from 'react';

const PressableButton = ({ children, pressedFunction }) => {
  return (
    <Pressable onPress={pressedFunction}>
      <View>
        {children}
      </View>
    </Pressable>
  );
};


export default PressableButton;