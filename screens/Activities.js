import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import PressableButton from '../component/PressableButton';

const Activities = ({ navigation }) => {
  useEffect(() => {

    navigation.setOptions({
      title: 'Add An Activity',
      headerRight: () => (
        <PressableButton pressedFunction={() => navigation.navigate('AddActivity')}>
          <Text>Add</Text>
        </PressableButton>
      ),
    });
  }, [navigation]);



  return (
    <View>
      <Text>Activities!!!</Text>
    </View>
  );
};

export default Activities;