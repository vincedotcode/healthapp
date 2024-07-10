import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { createPhysicalRecord, PhysicalRecord } from '@/services/physical';

interface AddPhysicalRecordModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (record: PhysicalRecord) => void;
  userId: string;
}

interface PhysicalRecordForm {
  weight: string;
  height: string;
  body_fat_percentage: string;
  muscle_mass: string;
  water_percentage: string;
  waist_circumference: string;
  hip_circumference: string;
  systolic: string;
  diastolic: string;
  heart_rate: string;
  notes: string;
}

const AddPhysicalRecordModal: React.FC<AddPhysicalRecordModalProps> = ({ visible, onClose, onSave, userId }) => {
  const [form, setForm] = useState<PhysicalRecordForm>({
    weight: '',
    height: '',
    body_fat_percentage: '',
    muscle_mass: '',
    water_percentage: '',
    waist_circumference: '',
    hip_circumference: '',
    systolic: '',
    diastolic: '',
    heart_rate: '',
    notes: '',
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (field: keyof PhysicalRecordForm, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const newRecord = {
        ...form,
        weight: parseFloat(form.weight),
        height: parseFloat(form.height),
        body_fat_percentage: parseFloat(form.body_fat_percentage),
        muscle_mass: parseFloat(form.muscle_mass),
        water_percentage: parseFloat(form.water_percentage),
        waist_circumference: parseFloat(form.waist_circumference),
        hip_circumference: parseFloat(form.hip_circumference),
        blood_pressure: {
          systolic: parseFloat(form.systolic),
          diastolic: parseFloat(form.diastolic),
        },
        heart_rate: parseFloat(form.heart_rate),
        user_id: userId,
      };
      const response = await createPhysicalRecord(newRecord);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding physical record:', error);
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
          <Text style={styles.modalTitle}>Add Physical Record</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Input
              label="Weight (kg)"
              value={form.weight}
              onChangeText={(text) => handleInputChange('weight', text)}
              keyboardType="numeric"
            />
            <Input
              label="Height (cm)"
              value={form.height}
              onChangeText={(text) => handleInputChange('height', text)}
              keyboardType="numeric"
            />
            <Input
              label="Body Fat Percentage (%)"
              value={form.body_fat_percentage}
              onChangeText={(text) => handleInputChange('body_fat_percentage', text)}
              keyboardType="numeric"
            />
            <Input
              label="Muscle Mass (kg)"
              value={form.muscle_mass}
              onChangeText={(text) => handleInputChange('muscle_mass', text)}
              keyboardType="numeric"
            />
            <Input
              label="Water Percentage (%)"
              value={form.water_percentage}
              onChangeText={(text) => handleInputChange('water_percentage', text)}
              keyboardType="numeric"
            />
            <Input
              label="Waist Circumference (cm)"
              value={form.waist_circumference}
              onChangeText={(text) => handleInputChange('waist_circumference', text)}
              keyboardType="numeric"
            />
            <Input
              label="Hip Circumference (cm)"
              value={form.hip_circumference}
              onChangeText={(text) => handleInputChange('hip_circumference', text)}
              keyboardType="numeric"
            />
            <Input
              label="Systolic Blood Pressure (mmHg)"
              value={form.systolic}
              onChangeText={(text) => handleInputChange('systolic', text)}
              keyboardType="numeric"
            />
            <Input
              label="Diastolic Blood Pressure (mmHg)"
              value={form.diastolic}
              onChangeText={(text) => handleInputChange('diastolic', text)}
              keyboardType="numeric"
            />
            <Input
              label="Heart Rate (bpm)"
              value={form.heart_rate}
              onChangeText={(text) => handleInputChange('heart_rate', text)}
              keyboardType="numeric"
            />
            <Input
              label="Notes"
              value={form.notes}
              onChangeText={(text) => handleInputChange('notes', text)}
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
    maxHeight: '80%', 
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
});

export default AddPhysicalRecordModal;
