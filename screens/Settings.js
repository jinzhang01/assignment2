import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import PressableButton from '../component/PressableButton';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    backgroundStyle: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      color: theme.text,
      backgroundColor: theme.button,
      padding: 10,
      borderRadius: 10,
    },

  });

  return (
    <View style={styles.backgroundStyle}>
    <PressableButton pressedFunction={toggleTheme} style={styles.textStyle}>
      <Text style={styles.textStyle}>Toggle Theme</Text>
    </PressableButton>
    </View>
  );
};

export default Settings;