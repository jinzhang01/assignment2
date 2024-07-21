import { View, Text } from 'react-native'
import React, { useEffect }  from 'react'
import PressableButton from '../component/PressableButton';

const Diet = ({navigation}) => {

  useEffect(() => {
    navigation.setOptions({
      title: 'Diet',
      headerRight: () => (
        <PressableButton pressedFunction={() => navigation.navigate('AddDiet')}>
          <Text>Add</Text>
        </PressableButton>
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>Diet</Text>
    </View>
  )
}

export default Diet