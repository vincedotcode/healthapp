import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Button as RNButton, Alert, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '@/constants/Colors';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/Card';
import Button from '@/components/Button';
import { createAppointment } from '@/services/appointment';
import { useAuth } from '@/hooks/useAuth';

interface AppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  doctorName: string;
  doctorId: string;
  onSuccess: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ visible, onClose, doctorName, doctorId, onSuccess }) => {
  const { user } = useAuth();
  const [reason, setReason] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!user || !user._id) {
      Alert.alert('Error', 'User is not authenticated');
      return;
    }

    const appointment = {
      user_id: user._id,
      doctor_id: doctorId,
      appointment_date: date.toISOString().split('T')[0],
      appointment_time: date.toISOString().split('T')[1].split('.')[0],
      reason
    };

    setLoading(true);
    try {
      await createAppointment(appointment);
      setLoading(false);
      onSuccess();
      onClose();
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to create appointment');
      console.error(error);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <Card style={styles.modalContent}>
          <CardHeader>
            <CardTitle style={styles.modalTitle}>Book Appointment with Dr. {doctorName}</CardTitle>
          </CardHeader>
          <CardContent>
            <TextInput
              style={styles.input}
              placeholder="Reason for appointment"
              value={reason}
              onChangeText={setReason}
            />
            <RNButton title="Select Date and Time" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="datetime"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </CardContent>
          <CardFooter style={styles.footer}>
            <Button variant="default" size="lg" onPress={handleSubmit} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : 'Submit'}
            </Button>
            <Button variant="destructive" size="lg" onPress={onClose} style={styles.cancelButton} disabled={loading}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 0,
  },
  modalTitle: {
    fontSize: 18,
    color: Colors.light.primary,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    marginLeft: 10,
  },
});

export default AppointmentModal;
