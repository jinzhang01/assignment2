import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import PressableButton from "../component/PressableButton";
import { colors } from "../style/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../theme/ThemeContext";
import { writeToDb, updateDb, deleteFromDb } from "../firebase/firestoreHelper";
import Checkbox from "expo-checkbox";
import { AntDesign } from "@expo/vector-icons";

const AddDiet = ({ navigation, route }) => {
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [isSpecial, setSpecial] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasUserSelected, setHasUserSelected] = useState(false);
  const { theme } = useTheme();
  const [override, setOverride] = useState(false);
  
  const { item } = route.params || {};

  const showCheckbox = (item ? item.isSpecial : false);

  useEffect(() => {
    if (item) {
      setDescription(item.description);
      setCalories(item.calories.toString());
      setSpecial(item.isSpecial);
      setDate(new Date(item.date.seconds * 1000));
      setSpecial(item.isSpecial);
      setHasUserSelected(true);
    }
  }, [item]);

  function confirmDelete() {
    navigation.goBack();
    deleteFromDb(item.id, "diet");
  }

  useEffect(() => {
    if (item) {
      navigation.setOptions({
        headerTitle: "Edit",
        headerRight: () => (
          <PressableButton
            pressedFunction={() => {
              Alert.alert(
                "Delete Activity",
                "Are you sure you want to delete this activity?",
                [
                  {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "Yes", onPress: () => confirmDelete() },
                ]
              );
            }}
          >
            <AntDesign name="delete" size={24} color="black" />
          </PressableButton>
        ),
      });
    }
  }, [navigation, item]);

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background, // Use theme background color
      justifyContent: "center",
    },
    label: {
      marginBottom: 10,
      color: theme.text,
      fontWeight: "bold",
    },
  });

  //When user press the save button, you should validate user's entries
  // (e.g. no negative number or letters for calories, no empty submission,...) and show an alertLinks to an external site. indicating if any input has invalid data.
  const handleSave = async () => {
    if (description === "" || calories === "" || date === null) {
      alert("Please fill in all required fields");
      return false;
    }
    if (isNaN(calories) || calories <= 0) {
      alert("Calories must be a positive number");
      return false;
    }

    const record = {
      description: description,
      calories: calories,
      date: date,
      isSpecial: isSpecial,
    };

    try {
      if (item) {
        // add a confirm dialog to update the activity
        Alert.alert(
          "Important",
          "Are you sure you want to save these changes?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Save",
              onPress: async () => {
                await updateDb(item.id, record, "diet");
                // Alert.alert("Success", "Activity updated successfully");
                console.log("navigation:",navigation);
                navigation.goBack();
              },
            },
          ]
        );
      } else {
        await writeToDb(record, "diet");

        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save activity");
      console.error("Error saving document: ", error);
    }
  };

  useEffect(() => {
    if (!override) {
      if (calories > 800) {
        setSpecial(true);
        console.log("Special");
      } else {
        setSpecial(false);
        console.log("Not Special");
      }
    }
  }, [calories]);


  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      console.error("Date is not a valid Date object:", date);
      // Convert 'date' to a valid Date object or set a default
      date = new Date(); // Set to current date or a default value
    }

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
          onChangeText={(inputValue) => setCalories(inputValue)}
        />
        <View>
          <Text style={dynamicStyles.label}>Date *</Text>
          <View style={styles.index}>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.dateInput}
            >
              {hasUserSelected && <Text>{formatDate(date)}</Text>}
            </TouchableOpacity>
            {showDatePicker && (
              <View style={styles.modalContainer}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="inline"
                  onChange={onChangeDate} 
                />
              </View>
            )}
          </View>
        </View>
      </View>

      {/* checkbox for overridden special and need to save the result to database */}
      <View>
        {item && showCheckbox && (
          <View style={styles.checkboxContainer}>

            <Text style={dynamicStyles.label}>

              This item is marked as special. Select the {"\n"} checkbox if you would like to approve it.
       
            </Text>
            <Checkbox
              style={styles.checkbox}
              value={!isSpecial} 
              onValueChange={(newValue) => {
                console.log('Checkbox clicked', newValue); 
                setSpecial(false);
                setOverride(true);
              }}
              
            />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton pressedFunction={() => navigation.goBack()}>
          <Text style={styles.buttonTextCancel}>Cancel</Text>
        </PressableButton>
        <PressableButton
          pressedFunction={() => {
            handleSave() 
          }}
        >
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
    justifyContent: "center",
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent : "center",

  },
  checkbox: {
    margin: 10,
  },
});

export default AddDiet;
