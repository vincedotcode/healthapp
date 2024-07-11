import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { createHealthRecord, HealthRecord } from '@/services/health';

interface AddHealthRecordModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (record: HealthRecord) => void;
  userId: string;
  doctorId: string;
  appointmentId: string;
}

interface HealthRecordForm {
  record_type: 'Diagnosis' | 'Treatment' | 'Prescription' | 'Lab Result' | 'Follow-up';
  description: string;
  record_data: string;
  attachment_path: string;
  follow_up_date: string;
  symptoms: string;
  treatment: string;
  medication_prescribed: string;
  lab_results: string;
  notes: string;
  status: 'Pending' | 'Reviewed';
  reviewed_by: string;
}

const AddHealthRecordModal: React.FC<AddHealthRecordModalProps> = ({ visible, onClose, onSave, userId, doctorId, appointmentId }) => {
  const [form, setForm] = useState<HealthRecordForm>({
    record_type: 'Diagnosis',
    description: '',
    record_data: '',
    attachment_path: '',
    follow_up_date: new Date().toISOString().split('T')[0],
    symptoms: '',
    treatment: '',
    medication_prescribed: '',
    lab_results: '',
    notes: '',
    status: 'Reviewed',
    reviewed_by: '',
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (field: keyof HealthRecordForm, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const newRecord = {
        ...form,
        user_id: userId,
        doctor_id: doctorId,
        medication_prescribed: 'Medications Prescribed',
        reviewed_by: doctorId,
        appointment_id: appointmentId,
      };
      const response = await createHealthRecord(newRecord);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding health record:', error);
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
          <Text style={styles.modalTitle}>Add Health Record</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.label}>Record Type</Text>
            <Picker
              selectedValue={form.record_type}
              style={styles.input}
              onValueChange={(itemValue) => handleInputChange('record_type', itemValue)}
            >
              <Picker.Item label="Diagnosis" value="Diagnosis" />
              <Picker.Item label="Treatment" value="Treatment" />
              <Picker.Item label="Prescription" value="Prescription" />
              <Picker.Item label="Lab Result" value="Lab Result" />
              <Picker.Item label="Follow-up" value="Follow-up" />
            </Picker>
            <Input
              label="Description"
              value={form.description}
              onChangeText={(text) => handleInputChange('description', text)}
            />
            <Input
              label="Record Data"
              value={form.record_data}
              onChangeText={(text) => handleInputChange('record_data', text)}
            />
            <Input
              label="Attachment Path"
              value={form.attachment_path}
              onChangeText={(text) => handleInputChange('attachment_path', text)}
            />
            <Input
              label="Symptoms"
              value={form.symptoms}
              onChangeText={(text) => handleInputChange('symptoms', text)}
            />
            <Input
              label="Treatment"
              value={form.treatment}
              onChangeText={(text) => handleInputChange('treatment', text)}
            />
          
            <Input
              label="Lab Results"
              value={form.lab_results}
              onChangeText={(text) => handleInputChange('lab_results', text)}
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
  input: {
    height: 50,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: 5,
  },
});

export default AddHealthRecordModal;
