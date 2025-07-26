import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/Walkthrough"); // This works if login.tsx exists
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={require("../../src/assets/img/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Inspectra</Text>
      <Text style={styles.footer}>powered by Acache Product Development</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1831",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
   title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    fontWeight: '700', // may be optional if font itself is bold
    color: '#FFFFFF',
    height: 39,
    width: 149,
  },
  footer: {
    position: "absolute",
    color: "#FFFFFF",
    bottom: 20,
    fontSize: 12,
    // color: '#333',
  },
});
