import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { createSymptom } from '@/services/symptom';

interface AddSymptomModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (symptom: Symptom) => void;
  appointment: {
    user_id: string;
    appointment_id: string;
  };
}

interface Symptom {
  symptoms: string;
  analysis_date: string;
  result: string;
  severity: string;
  recommendations: string;
  follow_up_date: string;
}

const AddSymptomModal: React.FC<AddSymptomModalProps> = ({ visible, onClose, onSave, appointment }) => {
  const [symptom, setSymptom] = useState<Symptom>({
    symptoms: '',
    analysis_date: new Date().toISOString().split('T')[0],
    result: '',
    severity: '',
    recommendations: '',
    follow_up_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  const [showAnalysisDatePicker, setShowAnalysisDatePicker] = useState(false);
  const [showFollowUpDatePicker, setShowFollowUpDatePicker] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (field: keyof Symptom, value: string) => {
    setSymptom({ ...symptom, [field]: value });
  };

  const handleDateChange = (field: keyof Symptom, event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setSymptom({ ...symptom, [field]: selectedDate.toISOString().split('T')[0] });
    }
    field === 'analysis_date' ? setShowAnalysisDatePicker(false) : setShowFollowUpDatePicker(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const newSymptom = {
        ...symptom,
        user_id: appointment.user_id,
        appointment_id: appointment.appointment_id,
      };
      await createSymptom(newSymptom);
      onSave(newSymptom);
      onClose();
    } catch (error) {
      console.error('Error adding symptom:', error);
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
          <Text style={styles.modalTitle}>Add Symptom</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Input
              label="Symptoms"
              value={symptom.symptoms}
              onChangeText={(text) => handleInputChange('symptoms', text)}
            />
            <Input
              label="Result"
              value={symptom.result}
              onChangeText={(text) => handleInputChange('result', text)}
            />
            <Input
              label="Severity"
              value={symptom.severity}
              onChangeText={(text) => handleInputChange('severity', text)}
            />
            <Input
              label="Recommendations"
              value={symptom.recommendations}
              onChangeText={(text) => handleInputChange('recommendations', text)}
            />
            <View style={styles.dateStyle}>
              <Button
                variant="outline"
                onPress={() => setShowAnalysisDatePicker(true)}
              >
                Analysis Date: {symptom.analysis_date}
              </Button>
              {showAnalysisDatePicker && (
                <DateTimePicker
                  value={new Date(symptom.analysis_date)}
                  mode="date"
                  display="default"
                  onChange={(event, date) => handleDateChange('analysis_date', event, date)}
                />
              )}
            </View>
            <View style={styles.dateStyle}>
              <Button
                variant="outline"
                onPress={() => setShowFollowUpDatePicker(true)}
              >
                Follow-Up Date: {symptom.follow_up_date}
              </Button>
              {showFollowUpDatePicker && (
                <DateTimePicker
                  value={new Date(symptom.follow_up_date)}
                  mode="date"
                  display="default"
                  onChange={(event, date) => handleDateChange('follow_up_date', event, date)}
                />
              )}
            </View>
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

export default AddSymptomModal;
