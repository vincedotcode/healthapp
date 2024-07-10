import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { Doctor } from '@/services/doctor';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/Card';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import AppointmentModal from '@/components/AppointmentModal';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBookAppointment = () => {
    setModalVisible(true);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <View>
      <Card style={styles.card}>
        <CardHeader style={styles.cardHeader}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profilePicture} />
          <View>
            <CardTitle style={styles.cardTitle}>{doctor.user_id.name}</CardTitle>
            <CardDescription style={styles.cardDescription}>{doctor.specialty}</CardDescription>
            <Badge variant="secondary" style={styles.badge}>{doctor.approval_status}</Badge>
          </View>
        </CardHeader>
        <CardContent>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{doctor.user_id.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{doctor.user_id.phone_number}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Availability:</Text>
            <Text style={styles.value}>{doctor.availability}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{doctor.user_id.address}</Text>
          </View>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="lg" onPress={handleBookAppointment}>
            Book Appointment
          </Button>
        </CardFooter>
        <AppointmentModal 
          visible={modalVisible} 
          onClose={() => setModalVisible(false)} 
          doctorName={doctor.user_id.name} 
          doctorId={doctor._id}
          onSuccess={handleSuccess}
        />
      </Card>
      {success && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Appointment booked successfully!</Text>
        </View>
      )}
    </View>
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
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.light.successText,
    marginBottom: 5,
  },
  badge: {
    alignSelf: 'flex-start',
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
    marginHorizontal: 5,
    fontWeight: '500',
    color: '#333',
  },
  successMessage: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    backgroundColor: Colors.light.success,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 1,
  },
  successText: {
    color:  Colors.light.successText,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DoctorCard;
