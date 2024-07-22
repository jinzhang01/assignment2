import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import PressableButton from '../component/PressableButton';
import ItemsList from '../component/ItemsList';
import { colors } from '../style/colors';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

const Activities = ({ navigation }) => {
  useEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <PressableButton pressedFunction={() => navigation.navigate('AddActivity')}>
          <View style={styles.buttonContainer}> 
            <AntDesign name="plus" size={24} color="black" />
            <FontAwesome5 name="running" size={24} color="black" />
          </View>
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
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.Background,
    justifyContent: 'center',
  },
  label: {
    marginBottom: 10,
    color: colors.Dark,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Activities;