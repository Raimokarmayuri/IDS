import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import styles from '../src/styles/ResetPasswork';

export default function ResetPasswordScreen() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleProceed = () => {
    // Implement your API call or logic here
    router.push('/Verification'); // Navigate to OTP screen or next step
  };

  return (
    <SafeAreaView style={styles.container}>
         <View style={styles.overlay} />
      <View style={styles.logoContainer}>
          <Image
        source={require('../src/assets/img/Logo.png')} // Replace with your logo
        style={styles.logo}
        resizeMode="contain"
      />
        {/* Title */}
      <Text style={styles.appName}>Inspectra</Text>
      </View>

    
 <View style={styles.form}>
      {/* Subtitle */}
      <Text style={styles.title}>Forget Password</Text>
      <Text style={styles.subTitle}>
        Don’t remember your password? Enter your registered email ID below
      </Text>

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="UserName"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

