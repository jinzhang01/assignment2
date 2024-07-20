import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const Activities = ({ navigation }) => {
  // Use useLayoutEffect to set navigation options
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate('AddActivity')} title="Add" />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>Activities</Text>
    </View>
  );
};

export default Activities;