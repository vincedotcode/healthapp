import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/Card';
import Badge from '@/components/Badge';
import { Application } from '@/services/application';

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  return (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle style={styles.cardTitle}>{application.user_id.name}</CardTitle>
        <CardDescription style={styles.cardDescription}>{application.user_id.email}</CardDescription>
        <Badge variant={application.status === 'approved' ? 'secondary' : application.status === 'rejected' ? 'destructive' : 'default'} style={styles.badge}>
          {application.status}
        </Badge>
      </CardHeader>
      <CardContent>
        {application.specialty && (
          <View style={styles.row}>
            <Text style={styles.label}>Specialty:</Text>
            <Text style={styles.value}>{application.specialty}</Text>
          </View>
        )}
        {application.availability && (
          <View style={styles.row}>
            <Text style={styles.label}>Availability:</Text>
            <Text style={styles.value}>{application.availability}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Created At:</Text>
          <Text style={styles.value}>{new Date(application.createdAt).toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Updated At:</Text>
          <Text style={styles.value}>{new Date(application.updatedAt).toLocaleString()}</Text>
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

export default ApplicationCard;
