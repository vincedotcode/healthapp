import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet } from 'react-native';

interface DropdownProps {
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  options: { label: string; value: string }[];
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ selectedValue, onValueChange, options, label }) => (
  <View style={styles.pickerContainer}>
    <Text style={styles.label}>{label}</Text>
    <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={styles.picker}>
      {options.map((option) => (
        <Picker.Item key={option.value} label={option.label} value={option.value} />
      ))}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 5,
  },
});

export default Dropdown;
