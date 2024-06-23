import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { getAppointmentsByUserId, Appointment } from '@/services/appointment';
import { useAuth } from '@/hooks/useAuth';
import AppointmentCard from '@/components/AppointmentCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Button from '@/components/Button';
import EmptyCard from '@/components/EmptyCard';

const UserAppointments: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      getAppointmentsByUserId(user._id)
        .then(response => {
          setAppointments(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [user]);

  const handleAddAppointment = () => {
    // router.push('(modal)/addappointment');
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />,
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.addRecord}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Appointments</Text>
        </View>
        {appointments.length === 0 ? (
          <EmptyCard title="No appointments found" />
        ) : (
          appointments.map(appointment => (
            <AppointmentCard key={appointment._id} appointment={appointment} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  addRecord: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default UserAppointments;
