import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Modal } from 'react-native';
import Listings from "@/components/Listings";
import { Stack, useRouter } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPhysicalRecords, PhysicalRecord } from '@/services/physical';
import PhysicalRecordCard from '@/components/PhysicalRecordCard';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/Button';
import EmptyCard from '@/components/EmptyCard';
import AddPhysicalRecordModal from '@/components/AddPhysicalRecordModal';

const Page: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [records, setRecords] = useState<PhysicalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      getPhysicalRecords(user._id)
        .then(response => {
          setRecords(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [user]);

  const handleAddRecord = () => {
    setModalVisible(true);
  };

  const handleSaveRecord = (newRecord: PhysicalRecord) => {
    setRecords([...records, newRecord]);
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
          <Button onPress={handleAddRecord}>
            Add Record
          </Button>
        </View>
        {records.length === 0 ? (
          <EmptyCard title="No records found" />
        ) : (
          records.map(record => (
            <PhysicalRecordCard key={record._id} record={record} />
          ))
        )}
      </ScrollView>
      <AddPhysicalRecordModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveRecord}
        userId={user ? user._id : ''}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  addRecord: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Page;
