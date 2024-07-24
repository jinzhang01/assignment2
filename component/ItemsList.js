import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../style/colors';
import { AntDesign } from '@expo/vector-icons';

const ItemsList = ({ contentType, items, onEdit }) => {

  const renderItem = ({ item }) => {
    // Format the date object to a string if it's a Date object
    const formattedDate = item.date instanceof Date ? item.date.toLocaleDateString("en-US") : item.date;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Activity: {item.activity}</Text>
        <Text style={styles.itemText}>Date: {formattedDate}</Text>
        {contentType === 'activity' ? (
          <Text style={styles.itemText}>Duration: {item.duration} min</Text>
        ) : (
          <Text style={styles.itemText}>Calories: {item.calories}</Text>
        )}
        <Text style={styles.itemText}>Special: {item.isSpecial ? 'Yes' : 'No'}</Text>
        <TouchableOpacity onPress={() => onEdit(item)}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
    flexDirection: 'column',
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
  },
});

export default ItemsList;