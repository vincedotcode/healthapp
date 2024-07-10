import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from './Card';
import Colors from '@/constants/Colors';

interface Symptom {
  _id: string;
  user_id: string;
  appointment_id: {
    _id: string;
    user_id: string;
    doctor_id: string;
    appointment_date: string;
    appointment_time: string;
    status: string;
    reason: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  symptoms: string;
  analysis_date: string;
  result: string;
  severity: string;
  recommendations: string;
  follow_up_date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface SymptomCardProps {
  symptom: Symptom;
}

const SymptomCard: React.FC<SymptomCardProps> = ({ symptom }) => {
  return (
    <Card style={styles.card}>
      <CardHeader style={styles.cardHeader}>
        <CardTitle style={styles.cardTitle}>Symptom Analysis</CardTitle>
      </CardHeader>
      <CardContent style={styles.cardContent}>
        <CardDescription style={styles.cardDescription}>
          <Text style={styles.label}>Symptoms:</Text> {symptom.symptoms}
        </CardDescription>
        <CardDescription style={styles.cardDescription}>
          <Text style={styles.label}>Analysis Date:</Text> {new Date(symptom.analysis_date).toLocaleDateString()}
        </CardDescription>
        <CardDescription style={styles.cardDescription}>
          <Text style={styles.label}>Result:</Text> {symptom.result}
        </CardDescription>
        <CardDescription style={styles.cardDescription}>
          <Text style={styles.label}>Severity:</Text> {symptom.severity}
        </CardDescription>
        <CardDescription style={styles.cardDescription}>
          <Text style={styles.label}>Recommendations:</Text> {symptom.recommendations}
        </CardDescription>
        <CardDescription style={styles.cardDescription}>
          <Text style={styles.label}>Follow-Up Date:</Text> {new Date(symptom.follow_up_date).toLocaleDateString()}
        </CardDescription>
      </CardContent>
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
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
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
});

export default SymptomCard;
