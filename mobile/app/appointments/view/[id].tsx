import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack, Link } from 'expo-router';
import { getAppointmentsById, AppointmentDetailsProps } from '@/services/appointment';
import { getMedicationsByAppointmentId, Medication } from '@/services/medication';
import { getHealthRecordsByAppointmentId, HealthRecord } from '@/services/health'; // Import the function
import AppointmentDetails from '@/components/AppointmentDetailsCard';
import MedicationCard from '@/components/MedicationCard';
import HealthRecordCard from '@/components/HealthRecordCard'; // Import the new component
import SuccessModal from '@/components/SuccessModal';
import { Ionicons } from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import { getSymptomsByAppointmentId, Symptom } from '@/services/symptom';
import SymptomCard from "@/components/SymptomCard";

const AppointmentPage: React.FC = () => {
  const { id: appointmentId } = useLocalSearchParams<{ id: string }>();
  const [appointment, setAppointment] = useState<AppointmentDetailsProps | null>(null);
  const [medications, setMedications] = useState<Medication[] | null>(null);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[] | null>(null); // State for health records
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const [symptoms, setSymptoms] = useState<Symptom[] | null>(null);

  const fetchAppointment = async () => {
    try {
      const response = await getAppointmentsById(appointmentId as string);
      setAppointment(response.data);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      console.error('Error fetching appointment:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedications = async () => {
    try {
      const response = await getMedicationsByAppointmentId(appointmentId as string);
      setMedications(response.data);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      console.error('Error fetching medications:', errorMessage);
    }
  };

  const fetchHealthRecords = async () => {
    try {
      const response = await getHealthRecordsByAppointmentId(appointmentId as string);
      setHealthRecords(response.data);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      console.error('Error fetching health records:', errorMessage);
    }
  };

  const fetchSymptoms = async () => {
    try {
      const response = await getSymptomsByAppointmentId(appointmentId as string);
      setSymptoms(response.data);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      console.error('Error fetching symptoms:', errorMessage);
    }
  };

  const handleMedicationAdded = (medication: Medication) => {
    fetchMedications();
    setSuccessMessage('Medication added successfully!');
  };

  const handleMedicationDeleted = (medicationId: string) => {
    fetchMedications();
    setSuccessMessage('Medication deleted successfully!');
  };

  const handleSymptomAdded = (symptom: Symptom) => {
    fetchSymptoms();
    setSuccessMessage('Symptom added successfully!');
  };

  const handleHealthRecordAdded = (record: HealthRecord) => {
    fetchHealthRecords();
    setSuccessMessage('Health record added successfully!');
  };

  const closeSuccessModal = () => {
    setSuccessMessage(null);
  };

  useEffect(() => {
    if (appointmentId) {
      fetchAppointment();
      fetchMedications();
      fetchHealthRecords();
    }
  }, [appointmentId]);

  if (loading) {
    return <View style={styles.loading}><ActivityIndicator size="large" color={Colors.light.primary} /></View>;
  }

  if (error) {
    return <View style={styles.loading}><Text>Error: {error}</Text></View>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: 'Appointment Details',
          headerLeft: () => (
            <Link href={{ pathname: '(auth)/profile' }}>
              <Ionicons name="chevron-back-outline" size={30} />
            </Link>
          ),
        }}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Appointment Details</Text>
        {appointment && (
          <AppointmentDetails
            appointment={appointment}
            onSymptomAdded={handleSymptomAdded}
            onMedicationAdded={handleMedicationAdded}
            onHealthRecordAdded={handleHealthRecordAdded}
          />
        )}
        <Text style={styles.title}>Medications</Text>
        {medications && medications.length > 0 ? (
          medications.map((medication: Medication) => (
            <MedicationCard
              key={medication._id}
              medication={medication}
              onDelete={handleMedicationDeleted}
            />
          ))
        ) : (
          <Text>No Medications Found</Text>
        )}
        <Text style={styles.title}>Health Records</Text>
        {healthRecords && healthRecords.length > 0 ? (
          healthRecords.map((record: HealthRecord) => (
            <HealthRecordCard
              key={record._id}
              record={record}
            />
          ))
        ) : (
          <Text>No Health Records Found</Text>
        )}
        <Text style={styles.title}>Symptoms</Text>
        {symptoms && symptoms.length > 0 ? (
          symptoms.map((symptom: Symptom) => (
            <SymptomCard
              key={symptom._id}
              symptom={symptom}
            />
          ))
        ) : (
          <Text>No Symptoms Found</Text>
        )}
      </ScrollView>
      <SuccessModal
        visible={!!successMessage}
        message={successMessage || ''}
        onClose={closeSuccessModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.light.primary,
  },
  backButton: {
    fontSize: 18,
    color: Colors.light.primary,
    paddingLeft: 10,
  },
});

export default AppointmentPage;
