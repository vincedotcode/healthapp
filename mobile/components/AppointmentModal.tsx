import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Button as RNButton } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '@/constants/Colors';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/Card';
import Button from '@/components/Button';

interface AppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  doctorName: string;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ visible, onClose, doctorName }) => {
  const [reason, setReason] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    // Handle the appointment submission logic here
    onClose();
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
            <Button variant="default" size="lg" onPress={handleSubmit}>
              Submit
            </Button>
            <Button variant="destructive" size="lg" onPress={onClose} style={styles.cancelButton}>
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
