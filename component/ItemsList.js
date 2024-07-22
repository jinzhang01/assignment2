import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../style/colors';

const ItemsList = ({ contentType, items }) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text> {item.name} </Text>
          <Text> {item.date} </Text>
          {contentType === 'activity' ? (
            <Text> {item.duration} </Text>
          ) : (
            <Text> {item.calories} </Text>
          )}
        </View>
      )}
      keyExtractor={item => item.name}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.light,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default ItemsList;