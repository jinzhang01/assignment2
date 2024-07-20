import { View, Text } from 'react-native'
import React from 'react'
import PressableButton from '../component/PressableButton';

const Diet = ({navigation}) => {

  navigation.setOptions({
    title: 'Diet',
    headerRight: () => (
      <PressableButton pressedFunction={() => navigation.navigate('AddDiet')}>
        <Text>Add</Text>
      </PressableButton>

    ),
  });

  return (
    <View>
      <Text>Diet</Text>
    </View>
  )
}

export default Diet