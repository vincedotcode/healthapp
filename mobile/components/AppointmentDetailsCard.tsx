import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/Card';
import Button from './Button';
import Colors from '@/constants/Colors';
import AddMedicationModal from './AddMedicationModal';
import AddSymptomModal from './AddSymptomModal';
import AddHealthRecordModal from './AddHealthRecordModal';
import { AppointmentDetailsProps } from '@/services/appointment';

interface AppointmentDetailsComponentProps {
  appointment: AppointmentDetailsProps;
  onMedicationAdded: (medication: any) => void;
  onSymptomAdded: (symptom: any) => void;
  onHealthRecordAdded: (record: any) => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsComponentProps> = ({ appointment, onMedicationAdded, onSymptomAdded, onHealthRecordAdded }) => {
  const [isMedicationModalVisible, setIsMedicationModalVisible] = useState(false);
  const [isSymptomModalVisible, setIsSymptomModalVisible] = useState(false);
  const [isHealthRecordModalVisible, setIsHealthRecordModalVisible] = useState(false);

  const handleAddMedication = (medication: any) => {
    setIsMedicationModalVisible(false);
    onMedicationAdded(medication);
  };

  const handleAddSymptom = (symptom: any) => {
    setIsSymptomModalVisible(false);
    onSymptomAdded(symptom);
  };

  const handleAddHealthRecord = (record: any) => {
    setIsHealthRecordModalVisible(false);
    onHealthRecordAdded(record);
  };

  return (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle style={styles.cardTitle}>{appointment.user_id.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <View style={styles.row}>
          <Text style={styles.label}>Doctor:</Text>
          <Text style={styles.value}>{appointment.doctor_id.user_id.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Specialty:</Text>
          <Text style={styles.value}>{appointment.doctor_id.specialty}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{new Date(appointment.appointment_date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{appointment.appointment_time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{appointment.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Reason:</Text>
          <Text style={styles.value}>{appointment.reason}</Text>
        </View>
      </CardContent>
      <CardFooter style={styles.footer}>
        <Button variant="default" style={styles.button} onPress={() => setIsMedicationModalVisible(true)}>
          Add Medication
        </Button>
        <Button variant="secondary" style={styles.button} onPress={() => setIsSymptomModalVisible(true)}>
          Add Symptoms
        </Button>
        <Button variant="outline" style={styles.button} onPress={() => setIsHealthRecordModalVisible(true)}>
          Add Health Status
        </Button>
      </CardFooter>
      <AddMedicationModal
        visible={isMedicationModalVisible}
        onClose={() => setIsMedicationModalVisible(false)}
        onSave={handleAddMedication}
        appointment={{ user_id: appointment.user_id._id, appointment_id: appointment._id, doctor_id: appointment.doctor_id.user_id._id }}
      />
      <AddSymptomModal
        visible={isSymptomModalVisible}
        onClose={() => setIsSymptomModalVisible(false)}
        onSave={handleAddSymptom}
        appointment={{ user_id: appointment.user_id._id, appointment_id: appointment._id }}
      />
      <AddHealthRecordModal
        visible={isHealthRecordModalVisible}
        onClose={() => setIsHealthRecordModalVisible(false)}
        onSave={handleAddHealthRecord}
        userId={appointment.user_id._id}
        doctorId={appointment.doctor_id.user_id._id}
        appointmentId={appointment._id}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: Colors.light.card,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    marginVertical: 5,
  },
});

export default AppointmentDetails;
