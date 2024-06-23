import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { PhysicalRecord } from '@/services/physical';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/Card';
import Badge from '@/components/Badge';

interface PhysicalRecordCardProps {
  record: PhysicalRecord;
}

const PhysicalRecordCard: React.FC<PhysicalRecordCardProps> = ({ record }) => {
  return (
    <Card style={styles.card}>
      <CardHeader style={styles.header}>
        <CardTitle style={styles.date}>{new Date(record.date).toLocaleDateString()}</CardTitle>
        <Ionicons name="fitness-outline" size={24} color={Colors.light.primary} />
      </CardHeader>
      <CardContent>
        <View style={styles.row}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>{record.weight} kg</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.value}>{record.height} cm</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>BMI:</Text>
          <Text style={styles.value}>{record.bmi}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Body Fat %:</Text>
          <Badge variant="secondary">{record.body_fat_percentage}%</Badge>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Muscle Mass:</Text>
          <Text style={styles.value}>{record.muscle_mass} kg</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Water %:</Text>
          <Text style={styles.value}>{record.water_percentage}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Waist:</Text>
          <Text style={styles.value}>{record.waist_circumference} cm</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Hip:</Text>
          <Text style={styles.value}>{record.hip_circumference} cm</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Blood Pressure:</Text>
          <Badge variant="destructive">
            {record.blood_pressure.systolic}/{record.blood_pressure.diastolic} mmHg
          </Badge>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Heart Rate:</Text>
          <Text style={styles.value}>{record.heart_rate} bpm</Text>
        </View>
        {record.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.label}>Notes:</Text>
            <Text style={styles.notes}>{record.notes}</Text>
          </View>
        )}
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
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
  notesContainer: {
    marginTop: 16,
  },
  notes: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
    marginTop: 4,
  },
});

export default PhysicalRecordCard;
