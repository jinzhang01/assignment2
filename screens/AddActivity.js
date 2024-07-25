import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import PressableButton from "../component/PressableButton";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../style/colors";
import { useTheme } from "../theme/ThemeContext";
import { writeToDb, updateDb, deleteFromDb } from "../firebase/firestoreHelper";
import Checkbox from 'expo-checkbox';


const AddActivity = ({ navigation, route }) => {
  const { item } = route.params || {};
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState(item ? item.activity : null);
  const [items, setItems] = useState([
    { label: "Walking", value: "Walking" },
    { label: "Running", value: "Running" },
    { label: "Swimming", value: "Swimming" },
    { label: "Weights", value: "Weights" },
    { label: "Yoga", value: "Yoga" },
  ]);
  const [duration, setDuration] = useState(
    item ? item.duration.toString() : null
  );
  const [isSpecial, setSpecial] = useState(item ? item.isSpecial : false);
  const [date, setDate] = useState(item ? item.date : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasUserSelected, setHasUserSelected] = useState(false);
  const { theme } = useTheme();

  // if the activities from the firsbase database
  // add headerRight button to delete the activity
  if (item) {
    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <PressableButton 
            pressedFunction={() => {
              navigation.goBack();
              deleteFromDb(item.id, "activities");
            }}>
            <Text style={styles.buttonTextCancel}>Delete</Text>
          </PressableButton>
        ),
      });
    }, [navigation]);
  }

  useEffect(() => {
    if (item) {
      setActivity(item.activity);
      setDuration(item.duration.toString());
      setDate(new Date(item.date.seconds * 1000));
      setSpecial(item.isSpecial);
      setHasUserSelected(true);
    }
  }, [item]);

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
      justifyContent: "center",
    },
    label: {
      marginBottom: 10,
      color: theme.text,
      fontWeight: "bold",
    },
  });

  console.log("date:", showDatePicker);

  const checkDuration = (inputValue) => {
    const numericValue = parseInt(inputValue, 10);
    setDuration(inputValue);
    if (numericValue > 60) {
      setSpecial(true);
      console.log("Special");
    } else {
      setSpecial(false);
      console.log("Not Special");
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setHasUserSelected(true);
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      console.error("Date is not a valid Date object:", date);
      // Convert 'date' to a valid Date object or set a default
      date = new Date(); // Set to current date or a default value
    }

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleSave = async () => {
    if (
      activity === null ||
      duration === null ||
      duration === "" ||
      date === null
    ) {
      Alert.alert("Please fill in all required fields");
      return false;
    }
    if (isNaN(duration) || duration < 0) {
      Alert.alert("Duration must be a positive number");
      return false;
    }

    const newRecord = {
      activity: activity,
      duration: parseInt(duration, 10),
      date: date,
      isSpecial: isSpecial,
    };
    console.log("Saving date:", date, "Type:", typeof date);

    try {
      if (item) {
        await updateDb(item.id, newRecord, "activities");
      } else {
        await writeToDb(newRecord, "activities");
      }
      Alert.alert(
        "Success",
        item ? "Activity updated successfully" : "Activity added successfully"
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save activity");
      console.error("Error saving document: ", error);
    }
  };

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

      {/* checkbox for overriden special and need to save the result to databse*/}
      <View>
          {item && isSpecial && (
            <>
              <Text style={dynamicStyles.label}>Special? </Text>
              <Checkbox
                value={isSpecial}
                onValueChange={setSpecial}
                style={styles.checkbox}
                
              />
            </>
          )}
        </View>


      <View style={styles.buttonContainer}>
        <PressableButton pressedFunction={() => navigation.goBack()}>
          <Text style={styles.buttonTextCancel}>Cancel</Text>
        </PressableButton>
        <PressableButton pressedFunction={handleSave}>
          <Text style={styles.buttonTextSave}>{item ? "Update" : "Save"}</Text>
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
    justifyContent: "center",
  },
  upperContainer: {
    marginBottom: 20,
    flex: 10,
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
    marginBottom: 20,
    marginTop: 5,
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
