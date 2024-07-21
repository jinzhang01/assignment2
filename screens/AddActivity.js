import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import PressableButton from "../component/PressableButton";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../style/colors";

const AddActivity = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View >
          <Text style={styles.label}>Activity*</Text>
          <DropDownPicker
            backgroudColor="white"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropdown}
          />
        </View>

        <View>
          <Text style={styles.label}>Duration(min)*</Text>
          <TextInput
            keyboardType="numeric"
            value={duration}
            onChangeText={checkDuration}
            style={styles.inputContainer}
          />
        </View>

        <View>
          <Text style={styles.label}>Date *</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{ borderWidth: 1, borderColor: "black", padding: 10 }}
          >
            <Text>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="inline"
              onChange={onChangeDate}
            />
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton pressedFunction={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </PressableButton>
        <PressableButton
          pressedFunction={() => {
            handleSave();
            navigation.goBack();
          }}
        >
          <Text  style={styles.buttonText}>Save</Text>
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
    backgroundColor: colors.lightBackground,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.lightBackground,
    padding: 10,
    marginBottom: 20,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonText: {
    color: colors.Text,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
});

export default AddActivity;
