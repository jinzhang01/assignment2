import {View, Text,TextInput,TouchableOpacity,StyleSheet,} from "react-native";
import React, { useState } from "react";
import PressableButton from "../component/PressableButton";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../style/colors";
import { useTheme } from '../theme/ThemeContext'; 
import { writeToDb } from "../firebase/firestoreHelper";



const AddActivity = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState(null);
  const [items, setItems] = useState([
    { label: "Walking", value: "Walking" },
    { label: "Running", value: "Running" },
    { label: "Swimming", value: "Swimming" },
    { label: "Weights", value: "Weights" },
    { label: "Yoga", value: "Yoga" },
  ]);
  const [duration, setDuration] = useState(null);
  const [isSpecial, setSpecial] = useState(false);
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
        color: theme.text, // Use theme text color
        fontWeight: "bold",
      },

    });

  console.log("date:", showDatePicker);

  function checkDuration(inputValue) {
    const numericValue = parseInt(inputValue, 10);
    setDuration(inputValue);
    if (numericValue > 60) {
      setSpecial(true);
      console.log("Special");
    } else {
      setSpecial(false);
      console.log("Not Special");
    }
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setHasUserSelected(true); 
    setShowDatePicker(false);
  };

  
  const formatDate = (date) => {

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

// When user press the save button, you should validate user's entries (e.g. no negative number or letters for duration, no empty submission,...) and show an alertLinks to an external site. indicating if any input has invalid data
  function handleSave() {
    if (activity === null || duration === null || duration === "" || date === null) {
      alert("Please fill in all required fields");
      return false;
    }
    if (isNaN(duration) || duration < 0) {
      alert("Duration must be a positive number");
      return false;
    }
    console.log(`Activity: ${activity}, Duration: ${duration}, Date: ${date}, flag: ${isSpecial}`);
    
    const newRecord = {
      "activity": activity,
      "duration": duration,
      "date": date,
      "isSpecial": isSpecial,
    };

    writeToDb(newRecord, "activities");
    
    return true;
  }

  return (
    <View style={dynamicStyles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.zIndex}>
          <Text style={dynamicStyles.label}>Activity*</Text>
          <DropDownPicker
            open={open}
            value={activity}
            items={items}
            setOpen={setOpen}
            setValue={setActivity}
            setItems={setItems}
            style={styles.dropdown}
            placeholder="Select an item"
          />
        </View>

        <View>
          <Text style={dynamicStyles.label}>Duration(min)*</Text>
          <TextInput
            keyboardType="numeric"
            value={duration}
            onChangeText={checkDuration}
            style={styles.textInput}
          />
        </View>

        <View style={styles.calendarDropdown}>
          <Text style={dynamicStyles.label}>Date *</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.textInput}
          >
            {hasUserSelected && <Text>{formatDate(date)}</Text>}
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="inline"
              onChange={onChangeDate}
            />
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton pressedFunction={() => navigation.goBack()}>
          <Text style={styles.buttonTextCancel}>Cancel</Text>
        </PressableButton>
        <PressableButton
          pressedFunction={() => {
            handleSave() && navigation.goBack()
          }}
        >
          <Text  style={styles.buttonTextSave}>Save</Text>
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
  dropdown: {
    borderWidth: 1,
    borderColor: colors.primary,
    // backgroundColor: colors.light,
    marginBottom: 20,
    marginTop: 5
  },
  dropdownContainer: {
    backgroundColor: colors.light,
    marginTop: 5,
  },
  zIndex: {
    zIndex: 10,
  },

  textInput: {
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
});

export default AddActivity;
