import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../style/colors';

const ItemsList = ({ contentType, passItem }) => {
  return (
    <View style={styles.container}>
      <Text> {passItem.name} </Text>
      <Text> {passItem.date} </Text>
      {contentType === 'activity' ? (
        <Text> {passItem.duration} </Text>
      ) : (
        <Text> {passItem.calories} </Text>
      )}
    </View>
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

