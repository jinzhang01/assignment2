import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import PressableButton from '../component/PressableButton';

const AddDiet = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');

  const handleSave = () => {
    // Handle save action here without Alert
    console.log(`Description: ${description}, Calories: ${calories}`);
  };

  return (
    <View>
      <Text>Description *</Text>
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />

      <Text>Calories *</Text>
      <TextInput
        placeholder="Enter calories"
        value={calories}
        keyboardType="numeric"
        onChangeText={setCalories}
      />

      <View>
        <PressableButton pressedFunction={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </PressableButton>
        <PressableButton pressedFunction={ () => {
          handleSave();
          navigation.goBack();
        }}>
          <Text>Save</Text>
        </PressableButton>
      </View>
    </View>
  );
};

export default AddDiet;