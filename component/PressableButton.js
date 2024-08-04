import { View, Pressable, StyleSheet } from 'react-native';
import React from 'react';

// include visual feedback when user press the button
// the button will change opacity and text size when pressed

const PressableButton = ({ children, pressedFunction }) => {
  return (
    <Pressable 
      onPress={pressedFunction}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1, 
        },
      ]}
      >
      <View>
        {children}
      </View>
    </Pressable>
  );
};


export default PressableButton;