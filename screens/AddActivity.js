import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import PressableButton from '../component/PressableButton';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';



const AddActivity = () => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Walking', value: 'Walking'},
    {label: 'Running', value: 'Running'},
    {label: 'Swimming', value: 'Swimming'},
    {label: 'Weights', value: 'Weights'},
    {label: 'Yoga', value: 'Yoga'},
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
      console.log('Special');
    } else {
      setSpecial(false); 
      console.log('Not Special');
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
    <View>
      <View> 
        <Text>Activity*</Text>
        <DropDownPicker
          backgroudColor="white"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>

      <View>
        <Text>Duration(min)*</Text>
        <TextInput
          keyboardType="numeric"
          value={duration}
          style={{ borderWidth: 1, borderColor: 'black' }}
          onChangeText={checkDuration}
        />
      </View>

      <View>
        <Text>Date *</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={{ borderWidth: 1, borderColor: 'black', padding: 10 }}
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

    <View>
      <PressableButton>
        <Text>Cancel</Text>
      </PressableButton>
      <PressableButton>
        <Text>Save</Text>
      </PressableButton>
    </View>
    </View>
  )
}

export default AddActivity