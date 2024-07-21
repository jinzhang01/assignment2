import React, { useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import PressableButton from '../component/PressableButton';
import ItemsList from '../component/ItemsList';

const Activities = ({ navigation }) => {
  useEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <PressableButton pressedFunction={() => navigation.navigate('AddActivity')}>
          <Text>Add</Text>
        </PressableButton>
      ),
    });
  }, [navigation]);


  // create a mock list of activities
  const mockActivities = [
    { name: 'Running', date: '2021-10-01', duration: 30 },
    { name: 'Swimming', date: '2021-10-02', duration: 45 },
    { name: 'Weights', date: '2021-10-03', duration: 60 },
    { name: 'Yoga', date: '2021-10-04', duration: 90 },
  ];

  return (
    <View>
      <Text>Activities!!!</Text>

      <FlatList
        renderItem={({ item }) => {
          return (
            <ItemsList contentType="activity" passItem={item} />
          );
        }}
        data={mockActivities}
      />

    </View>
  );
};

export default Activities;