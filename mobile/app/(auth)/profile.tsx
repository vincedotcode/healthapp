import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import ProfileCard from '@/components/ProfileCard';
import ApplicationCard from '@/components/ApplicationCard';
import { getUserProfile, UserProfile } from '@/services/profile';
import { getApplicationsByUserId, Application } from '@/services/application';
import { useAuth } from '@/hooks/useAuth';
import Colors from '@/constants/Colors';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleHeader from '@/components/TitleHeader';

const ProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [applicationSuccess, setApplicationSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const profileData = await getUserProfile(user._id);
          setProfile(profileData.data);
        } catch (err) {
          const errorMessage = (err as Error).message;
          setError(errorMessage);
          console.error('Error fetching profile:', errorMessage);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const fetchApplication = async () => {
        try {
          const applicationData = await getApplicationsByUserId(user._id);
          if (applicationData.data.length > 0) {
            setApplication(applicationData.data[0]);
          }
        } catch (err) {
          const errorMessage = (err as Error).message;
          setError(errorMessage);
          console.error('Error fetching application:', errorMessage);
        }
      };

      fetchApplication();
    }
  }, [user, applicationSuccess]);

  const handleApplicationSuccess = (success: boolean) => {
    setApplicationSuccess(success);
  };

  if (loading) {
    return <View style={styles.loading}><ActivityIndicator size="large" color={Colors.light.primary} /></View>;
  }

  if (error) {
    return <View style={styles.loading}><Text>Error: {error}</Text></View>;
  }

  if (!profile) {
    return <View style={styles.loading}><Text>No profile found</Text></View>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          header: () => <TitleHeader pageName="My Profile" />,
        }}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <ProfileCard profile={profile} onApplicationSuccess={handleApplicationSuccess} />
        {applicationSuccess && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>Application submitted successfully!</Text>
          </View>
        )}
        <Text style={styles.applicationTitle}>My Doctor Application</Text>
        {application ? (
          <ApplicationCard application={application} />
        ) : (
          <Text style={styles.noApplicationText}>No applications found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successMessage: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.light.success,
    borderRadius: 5,
  },
  successText: {
    color: Colors.light.successText,
    textAlign: 'center',
  },
  applicationTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.primary,
    textAlign: 'center',
  },
  noApplicationText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.light.primary,
    textAlign: 'center',
  },
});

export default ProfileScreen;
