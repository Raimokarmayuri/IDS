import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import loginStyles from '../src/styles/loginStyles';

const NewPasswordScreen = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProceed = () => {
    if (!newPassword || !confirmPassword) {
      alert('Please enter both passwords.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Call API or logic to set new password
    alert('Password changed successfully');
    navigation.navigate('login' as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={loginStyles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={loginStyles.content}>
          <View style={loginStyles.logoContainer}>
            <Image
              source={require('../src/assets/img/Logo.png')}
              style={loginStyles.logo}
            //   resizeMode="contain"
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 38,
                fontWeight: 'bold',
                marginBottom:4,
              }}
            >
              Inspectra
            </Text>
          </View>
<View style={loginStyles.container}>
          <Text style={loginStyles.title}>Forget Password</Text>
          <Text style={loginStyles.subTitle}>
            Don’t remember your password? Enter your registered email ID below
          </Text>

          <TextInput
            style={loginStyles.input}
            placeholder="Enter New Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <TextInput
            style={loginStyles.input}
            placeholder="Re-enter New Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={loginStyles.loginBtn} onPress={handleProceed}>
            <Text style={loginStyles.loginBtnText}>Proceed</Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewPasswordScreen;
