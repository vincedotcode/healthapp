import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from './Card';
import Button from './Button';
import Badge from './Badge';
import Colors from '@/constants/Colors';
import { deleteMedicationById } from '@/services/medication'; // Import the delete service

interface Medication {
  _id: string;
  user_id: string;
  appointment_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
  reminders: boolean;
  prescribed_by: {
    _id: string;
    user_id: string;
    specialty: string;
    availability: string;
    approval_status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  side_effects: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MedicationCardProps {
  medication: Medication;
  onDelete: (medicationId: string) => void; // Add onDelete prop to emit deletion event
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medication, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    Alert.alert(
      'Delete Prescription',
      'Are you sure you want to delete this prescription?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteMedicationById(medication._id);
              onDelete(medication._id); // Emit the deletion event
            } catch (error) {
              console.error('Error deleting medication:', error);
              Alert.alert('Error', 'Failed to delete the medication.');
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Card style={styles.card}>
      <CardHeader style={styles.cardHeader}>
        <CardTitle style={styles.cardTitle}>{medication.medication_name}</CardTitle>
        <Badge variant="default" style={styles.badge}>{medication.frequency}</Badge>
      </CardHeader>
      <CardContent style={styles.cardContent}>
        <CardDescription style={styles.cardDescription}>
          <Text style={styles.label}>Dosage:</Text> {medication.dosage}
        </CardDescription>
        <CardDescription style={styles.cardDescription}>
          <Text style={styles.label}>Start Date:</Text> {new Date(medication.start_date).toLocaleDateString()}
        </CardDescription>
        <CardDescription style={styles.cardDescription}>
          <Text style={styles.label}>End Date:</Text> {new Date(medication.end_date).toLocaleDateString()}
        </CardDescription>
        <CardDescription style={styles.cardDescription}>
          <Text style={styles.label}>Side Effects:</Text> {medication.side_effects}
        </CardDescription>
      </CardContent>
      <CardFooter style={styles.cardFooter}>
        <Button
          variant="destructive"
          size="sm"
          theme="light"
          style={styles.button}
          onPress={handleDelete}
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Remove Prescription'}
        </Button>
        {medication.reminders && (
          <Button variant="default" size="sm">
            Reminders On
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: Colors.light.secondary,
    color: '#fff',
    borderRadius: 5,
  },
  cardContent: {
    padding: 15,
  },
  cardDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    marginVertical: 5,
  },
});

export default MedicationCard;
