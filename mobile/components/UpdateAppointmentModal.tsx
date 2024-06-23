import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '@/components/Card';

interface UpdateAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (status: string) => void;
  currentStatus: string;
}

const statuses = ['Scheduled', 'Completed', 'Cancelled'];

const UpdateAppointmentModal: React.FC<UpdateAppointmentModalProps> = ({ visible, onClose, onUpdate, currentStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleUpdate = () => {
    onUpdate(selectedStatus);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle style={styles.modalTitle}>Update Appointment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Picker style={styles.input} selectedValue={selectedStatus} onValueChange={(itemValue) => setSelectedStatus(itemValue)}>
              {statuses.map((status, index) => (
                <Picker.Item key={index} label={status} value={status} />
              ))}
            </Picker>
          </CardContent>
          <CardFooter style={styles.footer}>
            <Button variant="default" size="lg" onPress={handleUpdate}>
              Update
            </Button>
            <Button variant="outline" size="lg" onPress={onClose}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: '80%',
  },
  modalTitle: {
    color: Colors.light.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default UpdateAppointmentModal;
