import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { createMedication } from '@/services/medication';

interface AddMedicationModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (medication: Medication) => void;
  appointment: {
    user_id: string;
    appointment_id: string;
    doctor_id: string;
  };
}

interface Medication {
  medication_name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
  reminders: boolean;
  prescribed_by: string;
  side_effects: string;
}

const AddMedicationModal: React.FC<AddMedicationModalProps> = ({ visible, onClose, onSave, appointment }) => {
  const [medication, setMedication] = useState<Medication>({
    medication_name: '',
    dosage: '',
    frequency: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    reminders: true,
    prescribed_by: '',
    side_effects: '',
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (field: keyof Medication, value: string) => {
    setMedication({ ...medication, [field]: value });
  };

  const handleDateChange = (field: keyof Medication, event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setMedication({ ...medication, [field]: selectedDate.toISOString().split('T')[0] });
    }
    field === 'start_date' ? setShowStartDatePicker(false) : setShowEndDatePicker(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const newMedication = {
        ...medication,
        user_id: appointment.user_id,
        appointment_id: appointment.appointment_id,
        prescribed_by: appointment.doctor_id,
      };
      await createMedication(newMedication);
      onSave(newMedication);
      onClose();
    } catch (error) {
      console.error('Error adding medication:', error);
      // You can show an error message here if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Medication</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Input
              label="Medication Name"
              value={medication.medication_name}
              onChangeText={(text) => handleInputChange('medication_name', text)}
            />
            <Input
              label="Dosage"
              value={medication.dosage}
              onChangeText={(text) => handleInputChange('dosage', text)}
            />
            <Input
              label="Frequency"
              value={medication.frequency}
              onChangeText={(text) => handleInputChange('frequency', text)}
            />
            <View  style={styles.dateStyle}>
            <Button
              variant="outline"
              onPress={() => setShowStartDatePicker(true)}
            >
              Start Date: {medication.start_date}
            </Button>
            {showStartDatePicker && (
              <DateTimePicker
                value={new Date(medication.start_date)}
                mode="date"
                display="default"
                onChange={(event, date) => handleDateChange('start_date', event, date)}
              />
            )}
            </View>
          
            <View style={styles.dateStyle}>
            <Button
              variant="outline"
              onPress={() => setShowEndDatePicker(true)}
            >
              End Date: {medication.end_date}
            </Button>
            {showEndDatePicker && (
              <DateTimePicker
                value={new Date(medication.end_date)}
                mode="date"
                display="default"
                onChange={(event, date) => handleDateChange('end_date', event, date)}
              />
            )}
            </View>
            <Input
              label="Side Effects"
              value={medication.side_effects}
              onChangeText={(text) => handleInputChange('side_effects', text)}
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button variant="outline" style={styles.button} onPress={onClose}>
              Cancel
            </Button>
            <Button variant="default" style={styles.button} onPress={handleSave} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : 'Save'}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%', // Ensure the modal doesn't exceed 80% of the screen height
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.light.primary,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  dateStyle: {
    marginBottom: 10,
  },
});

export default AddMedicationModal;
