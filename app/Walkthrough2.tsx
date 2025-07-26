import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function OnboardingScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../src/assets/img/Walkthrough3.png")} // ⬅️ Replace with your actual image
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.title}>Ready to Shield Your Property?</Text>
      <Text style={styles.description}>
        Let’s secure your property and keep everything under control.
      </Text>
      {/* Pagination Indicator */}
      <View style={styles.pagination}>
        <View style={styles.dotActive} />
        <View style={styles.dot} />
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("login" as never)}
      >
        <Text style={styles.buttonText}>Lets Go</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#fff",
  },
  imageWrapper: {
    width: 280,
    height: 180,
    borderRadius: 80,
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 120,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 40,
  },
  description: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
    maxWidth: 300,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 80,
    marginBottom: 50,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ccc",
  },
  dotActive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
  },
  button: {
    backgroundColor: "#F8B133",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
