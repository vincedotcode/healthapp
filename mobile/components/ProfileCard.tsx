import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { UserProfile } from '@/services/profile';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import DoctorApplicationModal from '@/components/DoctorApplicationModal';
import { useRouter } from 'expo-router';

interface ProfileCardProps {
  profile: UserProfile;
  onApplicationSuccess: (success: boolean) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onApplicationSuccess }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleApplyAsDoctor = () => {
    setModalVisible(true);
  };

  const handleCloseModal = (success: boolean) => {
    setModalVisible(false);
    onApplicationSuccess(success);
  };

  const handleViewAppointments = () => {
    router.push(`/appointments/${profile.doctorProfile?._id}`);
  };

  return (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle style={styles.cardTitle}>{profile.user.name}</CardTitle>
        <CardDescription style={styles.cardDescription}>{profile.user.role}</CardDescription>
        {profile.doctorProfile && (
          <Badge variant="secondary" style={styles.badge}>{profile.doctorProfile.approval_status}</Badge>
        )}
      </CardHeader>
      <CardContent>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile.user.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{profile.user.phone_number}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{profile.user.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{new Date(profile.user.date_of_birth).toLocaleDateString()}</Text>
        </View>
        {profile.doctorProfile && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Specialty:</Text>
              <Text style={styles.value}>{profile.doctorProfile.specialty}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Availability:</Text>
              <Text style={styles.value}>{profile.doctorProfile.availability}</Text>
            </View>
          </>
        )}
      </CardContent>
      <CardFooter>
        {profile.user.role !== 'doctor' ? (
          <Button variant="default" size="lg" onPress={handleApplyAsDoctor}>
            Apply as a doctor
          </Button>
        ) : (
          <Button variant="default" size="lg" onPress={handleViewAppointments}>
            View Appointments
          </Button>
        )}
      </CardFooter>
      <DoctorApplicationModal visible={modalVisible} onClose={handleCloseModal} userId={profile.user._id} />
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
  cardDescription: {
    fontSize: 14,
    color: Colors.light.primary,
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
});

export default ProfileCard;
