import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Colors from '@/constants/Colors';

interface CardProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

interface CardSectionProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

interface CardTitleProps {
  style?: TextStyle;
  children: React.ReactNode;
}

interface CardDescriptionProps {
  style?: TextStyle;
  children: React.ReactNode;
}

const Card = forwardRef<View, CardProps>(({ style, children }, ref) => (
  <View ref={ref} style={[styles.card, style]}>
    {children}
  </View>
));

const CardHeader = forwardRef<View, CardSectionProps>(({ style, children }, ref) => (
  <View ref={ref} style={[styles.cardHeader, style]}>
    {children}
  </View>
));

const CardTitle = forwardRef<Text, CardTitleProps>(({ style, children }, ref) => (
  <Text ref={ref} style={[styles.cardTitle, style]}>
    {children}
  </Text>
));

const CardDescription = forwardRef<Text, CardDescriptionProps>(({ style, children }, ref) => (
  <Text ref={ref} style={[styles.cardDescription, style]}>
    {children}
  </Text>
));

const CardContent = forwardRef<View, CardSectionProps>(({ style, children }, ref) => (
  <View ref={ref} style={[styles.cardContent, style]}>
    {children}
  </View>
));

const CardFooter = forwardRef<View, CardSectionProps>(({ style, children }, ref) => (
  <View ref={ref} style={[styles.cardFooter, style]}>
    {children}
  </View>
));

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 15,
  },
  cardHeader: {
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.light.border,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.accent,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.light.secondary,
  },
  cardContent: {
    padding: 15,
  },
  cardFooter: {
    padding: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.light.border,
  },
});

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
