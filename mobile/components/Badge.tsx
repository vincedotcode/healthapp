import React from 'react';
import { Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import Colors from '@/constants/Colors';

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'default', style, textStyle, children }) => {
  const variantStyles = styles[variant];

  return (
    <View style={[styles.base, variantStyles, style]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  default: {
    backgroundColor: Colors.light.primary,
    borderColor: 'transparent',
  },
  secondary: {
    backgroundColor: Colors.light.secondary,
    borderColor: 'transparent',
  },
  destructive: {
    backgroundColor: Colors.light.destructive,
    borderColor: 'transparent',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: Colors.light.border,
    borderWidth: 1,
  },
});

export default Badge;
