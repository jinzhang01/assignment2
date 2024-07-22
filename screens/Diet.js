import { View, Text, FlatList } from 'react-native'
import React, { useEffect }  from 'react'
import PressableButton from '../component/PressableButton';
import ItemsList from '../component/ItemsList';
import { useTheme } from '../theme/ThemeContext';


const Diet = ({navigation}) => {
  // mock Diet data name, date, calories
  const mockDiet = [
    { name: 'Breakfast', date: '2021-10-01', calories: 300 },
    { name: 'Lunch', date: '2021-10-02', calories: 500 },
    { name: 'Dinner', date: '2021-10-03', calories: 700 },
    { name: 'Snack', date: '2021-10-04', calories: 200},
  ];

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
      <FlatList
        renderItem={({ item }) => {
          return (
            <ItemsList contentType="diet" passItem={item} />
          );
        }}
        data={mockDiet} 
      />

    </View>
  )
}

export default Diet