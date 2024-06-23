import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '@/components/Card';
import { createApplication } from '@/services/application';

interface Document {
  document_type: 'National ID' | 'Medical License' | 'Proof of Address' | 'CV' | 'Passport' | 'Proof of Qualifications';
  document_path: string;
}

interface DoctorApplicationModalProps {
  visible: boolean;
  onClose: (success: boolean) => void;
  userId: string;
}

const documentTypes: Document['document_type'][] = [
  'National ID',
  'Medical License',
  'Proof of Address',
  'CV',
  'Passport',
  'Proof of Qualifications'
];

const DoctorApplicationModal: React.FC<DoctorApplicationModalProps> = ({ visible, onClose, userId }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentType, setDocumentType] = useState<Document['document_type']>(documentTypes[0]);
  const [documentPath, setDocumentPath] = useState<string>('');
  const [specialty, setSpecialty] = useState<string>('');
  const [availability, setAvailability] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddDocument = () => {
    setDocuments([...documents, { document_type: documentType, document_path: documentPath }]);
    setDocumentType(documentTypes[0]);
    setDocumentPath('');
  };

  const handleSubmitApplication = async () => {
    const applicationData = {
      user_id: userId,
      specialty,
      availability,
      documents,
    };

    setLoading(true);
    try {
      const response = await createApplication(applicationData);
      console.log('Application created successfully:', response);
      onClose(true); // Emit success to parent component
    } catch (error) {
      console.error('Error creating application:', error);
      onClose(false); // Emit failure to parent component
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!visible) {
      setDocuments([]);
      setDocumentType(documentTypes[0]);
      setDocumentPath('');
      setSpecialty('');
      setAvailability('');
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle style={styles.modalTitle}>Apply as a Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <TextInput
              style={styles.input}
              placeholder="Specialty"
              value={specialty}
              onChangeText={setSpecialty}
            />
            <TextInput
              style={styles.input}
              placeholder="Availability"
              value={availability}
              onChangeText={setAvailability}
            />
            <Picker
              selectedValue={documentType}
              style={styles.input}
              onValueChange={(itemValue: Document['document_type']) => setDocumentType(itemValue)}
            >
              {documentTypes.map((type, index) => (
                <Picker.Item key={index} label={type} value={type} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Document Path"
              value={documentPath}
              onChangeText={setDocumentPath}
            />
            <Button variant="outline" size="sm" onPress={handleAddDocument}>
              Add Document
            </Button>
            <FlatList
              data={documents}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.documentItem}>
                  <Text>{item.document_type}: {item.document_path}</Text>
                </View>
              )}
            />
          </CardContent>
          <CardFooter style={styles.footer}>
            {loading ? (
              <ActivityIndicator size="large" color={Colors.light.primary} />
            ) : (
              <>
                <Button variant="default" size="sm" onPress={handleSubmitApplication}>
                  Submit Application
                </Button>
                <TouchableOpacity onPress={() => onClose(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </CardFooter>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: '80%',
  },
  modalTitle: {
    color: Colors.light.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  documentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: Colors.light.primary,
  },
});

export default DoctorApplicationModal;
