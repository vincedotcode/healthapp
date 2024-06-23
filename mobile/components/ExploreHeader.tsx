import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

const ExploreHeader = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const handlePickerSelect = (value: string) => {
    setSelectedValue(value);
    setShowDropdown(false);
    if (value === 'logout') {
      handleLogout();
    } else if (value === 'settings') {
      console.log('Settings clicked');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.actionRow}>
        <Text style={styles.greeting}>Hello, {user?.name}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setShowDropdown(true)}>
            <Ionicons name="settings-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={showDropdown} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              onValueChange={(itemValue) => handlePickerSelect(itemValue)}
            >
              <Picker.Item label="Settings" value="settings" />
              <Picker.Item label="Logout" value="logout" />
            </Picker>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowDropdown(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: Colors.light.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExploreHeader;
