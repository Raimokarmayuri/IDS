import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "../src/styles/verificationStyles";

export default function VerificationCodeScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleResend = () => {
    // Call API to resend code
    console.log("Resending code...");
  };

  const handleSubmit = () => {
    const code = otp.join("");
    console.log("Submitted OTP:", code);
    router.push('/NewPasswordScreen'); // Navigate to next screen
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../src/assets/img/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Inspectra</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Verification Code</Text>
          <Text style={styles.subTitle}>
            A code has been sent on your registered mail ID. Please enter below
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(text) => {
                  const newOtp = [...otp];
                  newOtp[index] = text;
                  setOtp(newOtp);

                  if (text && index < 3) {
                    inputs.current[index + 1]?.focus();
                  }

                  // Dismiss keyboard when last digit is filled
                  if (index === 3 && text) {
                    Keyboard.dismiss();
                  }
                }}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    otp[index] === "" &&
                    index > 0
                  ) {
                    inputs.current[index - 1]?.focus();
                  }
                }}
              />
            ))}
          </View>

          <Text style={styles.resendText}>
            Didn’t receive code?{" "}
            <Text style={styles.resendLink} onPress={handleResend}>
              Resend Code
            </Text>
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
