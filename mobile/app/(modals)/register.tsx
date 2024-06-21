import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import Input from '@/components/Input';
import DatePicker from '@/components/DatePicker';
import Dropdown from '@/components/Dropdown';
import CustomModal from '@/components/AlertModal'; 
import { register } from '@/services/auth';

interface FormState {
  name: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  role: 'patient' | 'doctor' | 'admin';
  loading: boolean;
}

interface Errors {
  name: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  address: string;
}

const Page: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
    name: '',
    emailAddress: '',
    password: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: new Date(),
    gender: 'male',
    role: 'patient',
    loading: false,
  });

  const [errors, setErrors] = useState<Errors>({
    name: '',
    emailAddress: '',
    password: '',
    phoneNumber: '',
    address: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const onSignUpPress = async () => {
    const { name, emailAddress, password, phoneNumber, address, dateOfBirth, gender, role } = formState;
    let valid = true;

    // Validation checks
    if (name === '') {
      setErrors((prev) => ({ ...prev, name: 'Please enter your name.' }));
      valid = false;
    }

    if (emailAddress === '') {
      setErrors((prev) => ({ ...prev, emailAddress: 'Please enter your email address.' }));
      valid = false;
    } else if (!validateEmail(emailAddress)) {
      setErrors((prev) => ({ ...prev, emailAddress: 'Please enter a valid email address.' }));
      valid = false;
    }

    if (password === '') {
      setErrors((prev) => ({ ...prev, password: 'Please enter your password.' }));
      valid = false;
    } else if (!validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      }));
      valid = false;
    }

    if (!valid) return;

    setFormState({ ...formState, loading: true });
    setErrors({ name: '', emailAddress: '', password: '', phoneNumber: '', address: '' });

    try {
      const credentials = {
        name,
        email: emailAddress,
        password,
        phone_number: phoneNumber,
        address,
        date_of_birth: dateOfBirth.toISOString(),
        gender,
        role,
      };
      const response = await register(credentials);
      setModalMessage('User registered successfully!');
      setModalVisible(true);
      router.replace('/(auth)/');
    } catch (error) {
      setModalMessage('Something went wrong. Please try again.');
      setModalVisible(true);
      setErrors({
        name: '',
        emailAddress: '',
        password: 'Something went wrong. Please try again.',
        phoneNumber: '',
        address: '',
      });
    } finally {
      setFormState({ ...formState, loading: false });
    }
  };

  const handleChange = (field: keyof FormState, value: string | Date) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (field === 'emailAddress' && typeof value === 'string' && validateEmail(value)) {
      setErrors((prev) => ({ ...prev, emailAddress: '' }));
    }
    if (field === 'password' && typeof value === 'string' && validatePassword(value)) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
    if (field !== 'emailAddress' && field !== 'password' && typeof value === 'string' && value.length > 0) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo-dark.png')} style={styles.logo} />
      <Text style={styles.title}>Create an account</Text>
      <ScrollView>
        <View style={{ marginBottom: 20 }}>
          <Input placeholder="John Doe" value={formState.name} error={errors.name} onChangeText={(text) => handleChange('name', text)} />
          <Input placeholder="john@apple.com" value={formState.emailAddress} error={errors.emailAddress} onChangeText={(text) => handleChange('emailAddress', text)} />
          <Input secureTextEntry placeholder="password" value={formState.password} error={errors.password} onChangeText={(text) => handleChange('password', text)} />
          <Input placeholder="Phone Number" value={formState.phoneNumber} error={errors.phoneNumber} onChangeText={(text) => handleChange('phoneNumber', text)} />
          <Input placeholder="Address" value={formState.address} error={errors.address} onChangeText={(text) => handleChange('address', text)} />
          <DatePicker date={formState.dateOfBirth} onDateChange={(date) => handleChange('dateOfBirth', date)} />
          <Dropdown
            selectedValue={formState.gender}
            onValueChange={(value) => handleChange('gender', value)}
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' },
            ]}
            label="Gender"
          />
          <Dropdown
            selectedValue={formState.role}
            onValueChange={(value) => handleChange('role', value)}
            options={[
              { label: 'Patient', value: 'patient' },
              { label: 'Doctor', value: 'doctor' },
              { label: 'Admin', value: 'admin' },
            ]}
            label="Role"
          />
        </View>
        <Button onPress={onSignUpPress} disabled={formState.loading}>
          {formState.loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </ScrollView>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Registration Status"
      >
        <Text>{modalMessage}</Text>
      </CustomModal>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 250,
    height: 50,
    alignSelf: 'center',
    marginVertical: 60,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'mon-sb',
  },
});
