import { View, Text } from 'react-native'
import React, {useState} from 'react'
import PressableButton from '../component/PressableButton';
import DropDownPicker from 'react-native-dropdown-picker';



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


  return (
    <View>
      <View> 
        <Text>Activity*</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
    </View>
  )
}

export default AddActivity