import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HealthRecord } from '@/services/health';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import Colors from '@/constants/Colors';

interface HealthRecordCardProps {
  record: HealthRecord;
}

const HealthRecordCard: React.FC<HealthRecordCardProps> = ({ record }) => {
  return (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle style={styles.cardTitle}>{record.record_type}</CardTitle>
      </CardHeader>
      <CardContent>
        <View style={styles.row}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{record.description}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{record.record_data}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Follow-up Date:</Text>
          <Text style={styles.value}>{new Date(record.follow_up_date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Symptoms:</Text>
          <Text style={styles.value}>{record.symptoms}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Treatment:</Text>
          <Text style={styles.value}>{record.treatment}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Medication Prescribed:</Text>
          <Text style={styles.value}>{record.medication_prescribed}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Lab Results:</Text>
          <Text style={styles.value}>{record.lab_results}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Notes:</Text>
          <Text style={styles.value}>{record.notes}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{record.status}</Text>
        </View>
      </CardContent>
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
});

export default HealthRecordCard;
