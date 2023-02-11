import React, { useState } from 'react';
import { View, Text, Picker } from 'react-native';
import handleSignout from './App'
const DropdownExample = (name) => {
  const [selectedValue, setSelectedValue] = useState('java');

  return (
    <View>
      <Text>Hi Name, {name}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={() => {handleSignOut();}}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="javascript" />
        <Picker.Item label="Python" value="python" />
        <Picker.Item label="C++" value="c++" />
      </Picker>
      <Text>You have selected: {selectedValue}</Text>
    </View>
  );
};

export default DropdownExample;
