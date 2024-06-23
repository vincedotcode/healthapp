import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Appointment } from '@/services/appointment';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/Card';
import Badge from '@/components/Badge';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle style={styles.cardTitle}>Appointment with Dr. {appointment.doctor_id.user_id.name}</CardTitle>
        <CardDescription style={styles.cardDescription}>{new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.appointment_time}</CardDescription>
      </CardHeader>
      <CardContent>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Badge variant={getStatusVariant(appointment.status)}>{appointment.status}</Badge>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Reason:</Text>
          <Text style={styles.value}>{appointment.reason}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Specialty:</Text>
          <Text style={styles.value}>{appointment.doctor_id.specialty}</Text>
        </View>
      </CardContent>
    </Card>
  );
};

const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'Scheduled':
      return 'secondary';
    case 'Completed':
      return 'default';
    case 'Cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
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
  cardDescription: {
    fontSize: 14,
    color: Colors.light.destructive,
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

export default AppointmentCard;
