import { View, Text } from 'react-native';
import React from 'react';

const ItemsList = ({ contentType, passItem }) => {
  return (
    <View>
      <Text> {passItem.name} </Text>
      <Text> {passItem.date} </Text>
      {contentType === 'activity' ? (
        <Text> {passItem.duration} </Text>
      ) : (
        <Text> {passItem.amount} </Text>
      )}
    </View>
  );
};

export default ItemsList;