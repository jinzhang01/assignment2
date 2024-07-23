import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect }  from 'react'
import PressableButton from '../component/PressableButton';
import ItemsList from '../component/ItemsList';
import { colors } from '../style/colors';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext'; 

const Diet = ({navigation}) => {
  const { theme } = useTheme(); 
  // mock Diet data name, date, calories
  const mockDiet = [
    { name: 'Breakfast', date: '2021-10-01', calories: 300 },
    { name: 'Lunch', date: '2021-10-02', calories: 500 },
    { name: 'Dinner', date: '2021-10-03', calories: 700 },
    { name: 'Snack', date: '2021-10-04', calories: 200},
  ];

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background, // Use theme background color
      justifyContent: 'center',
    },
    label: {
      marginBottom: 10,
      color: theme.text, // Use theme text color
      fontWeight: "bold",
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton pressedFunction={() => navigation.navigate('AddDiet')}>
          <View style={styles.buttonContainer}>
            <AntDesign name="plus" size={24} color="black" />
            <MaterialIcons name="fastfood" size={24} color="black" />
          </View>

        </PressableButton>
      ),
    });
  }, [navigation]);


  return (
    <View style={dynamicStyles.container}>
      <ItemsList contentType="diet" items={mockDiet} />
    </View>
  )
}

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

export default Diet