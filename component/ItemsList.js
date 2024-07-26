import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../style/colors';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const ItemsList = ({ contentType, items, onEdit }) => {

  const renderItem = ({ item }) => {
    // Format the date object to a string if it's a Date object
    // const formattedDate = item.date instanceof Date ? item.date.toLocaleDateString("en-US") : item.date;
    const formattedDate = item.date?.toDate().toLocaleDateString("en-US");
    return (
      <TouchableOpacity onPress={() => onEdit(item)}>
      <View style={styles.itemContainer}>

        <Text style={styles.itemText}>{item.activity}</Text>

        {item.isSpecial && <Entypo name="warning" size={24} color="orange" />} 
        
        <Text style={styles.itemTextBox}>{formattedDate}</Text>

        {contentType === 'activity' ? (
          <Text style={styles.itemTextBox}>{item.duration} min</Text>
        ) : (
          <Text style={styles.itemTextBox}>{item.calories}</Text>
        )}


        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.light,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: colors.Dark,
    padding: 5,
    marginHorizontal: 5,
  },
  itemTextBox: {
    fontSize: 16,
    color: colors.dark,
    backgroundColor: colors.cardBackground, 
    padding: 5,
    marginHorizontal: 5,
  },
});

export default ItemsList;