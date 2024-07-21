import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PressableButton from '../component/PressableButton';
import { colors } from '../style/colors';

const AddDiet = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [isspecial, setSpecial] = useState(false);

  //When user press the save button, you should validate user's entries (e.g. no negative number or letters for calories, no empty submission,...) and show an alertLinks to an external site. indicating if any input has invalid data.
  function handleSave() {
    if (description === '' || calories === '') {
      alert('Please fill in all required fields');
      return false;
    }
    if (isNaN(calories) || calories < 0) {
      alert('Calories must be a positive number');
      return false;
    }
    console.log(`Description: ${description}, Calories: ${calories}`);
    return true;
  }

  function handlespeical() {
    if (calories > 800) {
      setSpecial(true);
      console.log('Special');
    } else {
      setSpecial(false);
      console.log('Not Special');
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.label}>Description *</Text>
        <TextInput 
          style={styles.textInputLarger}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Calories *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter calories"
          value={calories}
          keyboardType="numeric"
          onChangeText={setCalories}
          onBlur={handlespeical}
        />

        <Text style={styles.label}>Date *</Text>
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton pressedFunction={() => navigation.goBack()}>
          <Text style={styles.buttonTextCancel}>Cancel</Text>
        </PressableButton>
        <PressableButton pressedFunction={ () => {
          handleSave() && navigation.goBack();
        }}>
          <Text style={styles.buttonTextSave}>Save</Text>
        </PressableButton>
      </View>
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
  upperContainer: {
    marginBottom: 20,
    flex: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    color: colors.Dark,
    fontWeight: "bold",
  },

  textInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.lightBackground,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },

  textInputLarger: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.lightBackground,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    height: 100,
  },


  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonTextSave: {
    color: colors.Text,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonTextCancel: {
    color: colors.Text,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.cancel,
    borderRadius: 5,
  },
});

export default AddDiet;