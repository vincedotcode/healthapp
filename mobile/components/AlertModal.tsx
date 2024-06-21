import React from 'react';
import { Modal, View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Button from '@/components/Button'; // Assuming you have this Button component

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
  style?: ViewStyle;
  textStyle?: TextStyle;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  theme?: "light" | "dark";
}

const CustomModal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  variant = "default",
  size = "default",
  style,
  textStyle,
  startIcon,
  endIcon,
  theme = "light",
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.centeredView}>
        <View style={[styles.modalView, style]}>
          <Text style={[styles.modalTitle, textStyle]}>{title}</Text>
          <View>{children}</View>
          <Button variant={variant} size={size} onPress={onClose} style={style} textStyle={textStyle} startIcon={startIcon} endIcon={endIcon} theme={theme}>
            Close
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomModal;
