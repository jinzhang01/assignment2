import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import PressableButton from '../component/PressableButton';
import { colors } from '../style/colors';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from '../theme/ThemeContext';
import { writeToDb } from "../firebase/firestoreHelper";

const AddDiet = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [isspecial, setSpecial] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasUserSelected, setHasUserSelected] = useState(false);
  const { theme } = useTheme(); 
  const [record, setRecord] = useState({});


  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background, // Use theme background color
      justifyContent: 'center',
    },
    label: {
      marginBottom: 10,
      color: theme.text, 
      fontWeight: "bold",
    },
   
  });

  //When user press the save button, you should validate user's entries 
  // (e.g. no negative number or letters for calories, no empty submission,...) and show an alertLinks to an external site. indicating if any input has invalid data.
  function handleSave() {
    if (description === '' || calories === '') {
      alert('Please fill in all required fields');
      return false;
    }
    if (isNaN(calories) || calories < 0) {
      alert('Calories must be a positive number');
      return false;
    }
    console.log(`Description: ${description}, Calories: ${calories}, data: ${date}, isSpecial: ${isspecial} `);
    const record = {
      description: description,
      calories: calories,
      date: date,
      isSpecial: isspecial,
    };

    writeToDb(record, "diet");
    
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

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setHasUserSelected(true); 
    setShowDatePicker(false);
  };


  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.upperContainer}>
        <Text style={dynamicStyles.label}>Description *</Text>
        <TextInput 
          style={styles.textInputLarger}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />
        <Text style={dynamicStyles.label}>Calories *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter calories"
          value={calories}
          keyboardType="numeric"
          onChangeText={setCalories}
          onBlur={handlespeical}
        />
        <View >
        <Text style={dynamicStyles.label}>Date *</Text>
            <View style={styles.index}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.dateInput}
              >
              
              {hasUserSelected && <Text>{formatDate(date)}</Text>}
              </TouchableOpacity >
              {showDatePicker && (
                <View style={styles.modalContainer}>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="inline"
                    onChange={onChangeDate} // Use the corrected onChangeDate function
                  />
                </View>
              )}
            </View>  
        </View>
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

  dateInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.lightBackground,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    height: 40,
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
  index: {
    zIndex: 10,
  },
});

export default AddDiet;