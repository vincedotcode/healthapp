import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DoctorCard from '@/components/DoctorCard';
import EmptyCard from '@/components/EmptyCard';
import { getAllDoctors } from '@/services/doctor';
import { Doctor } from '@/services/doctor';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import TitleHeader from '@/components/TitleHeader';


const DoctorScreen: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors();
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <Stack.Screen
      options={{
        header: () => <TitleHeader pageName="Doctor" />,
      }}
    />
    <ScrollView contentContainerStyle={styles.container}>
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))
      ) : (
        <EmptyCard title="No doctors available" />
      )}
    </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
});
