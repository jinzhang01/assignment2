import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { colors } from '../style/colors';
import PressableButton from '../component/PressableButton';

const Settings = () => {
  const { darkTheme, toggleTheme } = useTheme();

  const backgroundStyle = {
    flex: 1,
    backgroundColor: darkTheme ? colors.Darkmode : colors.Background,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textStyle = {
    color: darkTheme ? colors.WhiteText : colors.BlackText,
  };

  return (
    <View style={backgroundStyle}>
      <PressableButton pressedFunction={toggleTheme}>
        <Text style={textStyle}>Toggle Theme</Text>
      </PressableButton>
    </View>
  );
};

export default Settings;