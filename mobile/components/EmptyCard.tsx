import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface EmptyCardProps {
  title: string;
}

const EmptyCard: React.FC<EmptyCardProps> = ({ title }) => {
  return (
    <View style={styles.card}>
      <Ionicons name="sad-outline" size={48} color={Colors.light.primary} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginTop: 10,
  },
});

export default EmptyCard;
