import { View, Text } from 'react-native'
import React from 'react'

const AddDiet = () => {
  return (
    <View>
      <Text>Description *</Text>
      <Input placeholder="Enter description"  
      />

      <Text>Calories *</Text>
      <Input placeholder="Enter calories"
      />

      
    </View>
  )
}

export default AddDiet