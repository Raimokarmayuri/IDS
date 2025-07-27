import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";
import { FormData } from "../types/surveyTypes";
import { fetchInspectionData, saveSurveyFormData } from "../utils/api";

const ViewSurvey: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: { doorRefNumber: string } }, "params">>();
  const { doorRefNumber } = route.params;

  const [formData, setFormData] = useState<FormData>({
    buildingName: "",
    doorNumber: "",
    doorType: "Select",
    doorTypeName: "",
    doorOther: "",
    doorPhotos: [],
    fireResistance: "Select",
    head: null,
    headTimeline: "Select",
    headSeverity: "Select",
    headComments: "",
    headCategory: "Select",
    headDueDate: "",
    headRemediation: "",
    hinge: null,
    hingeLocation: "Select",
    hingeTimeline: "Select",
    hingeSeverity: "Select",
    hingeComments: "",
    hingeCategory: "Select",
    hingeDueDate: "",
    hingeRemediation: "",
    closing: null,
    closingTimeline: "Select",
    closingSeverity: "Select",
    closingComments: "",
    closingCategory: "Select",
    closingDueDate: "",
    closingRemediation: "",
    threshold: null,
    thresholdTimeline: "Select",
    thresholdSeverity: "Select",
    thresholdComments: "",
    thresholdCategory: "Select",
    thresholdDueDate: "",
    thresholdRemediation: "",
    doorThickness: null,
    frameDepth: null,
    doorSize: null,
    fullDoorsetSize: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (doorRefNumber) {
      loadSurvey();
    }
  }, []);

  const loadSurvey = async () => {
    setIsLoading(true);
    try {
      const response = await fetchInspectionData(doorRefNumber);
      if (response) {
        setFormData(prev => ({
          ...prev,
          ...response,
        }));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch survey data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.buildingName || !formData.doorNumber) {
      Alert.alert("Validation", "Building name and door number are required.");
      return;
    }

    setIsLoading(true);
    try {
      await saveSurveyFormData(formData);
      Alert.alert("Success", "Survey saved successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save survey.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>View Survey</Text>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      <Text style={styles.label}>Building Name</Text>
      <TextInput
        value={formData.buildingName}
        onChangeText={text => setFormData({ ...formData, buildingName: text })}
        style={styles.input}
      />

      <Text style={styles.label}>Door Number</Text>
      <TextInput
        value={formData.doorNumber}
        onChangeText={text => setFormData({ ...formData, doorNumber: text })}
        style={styles.input}
      />

      <Text style={styles.label}>Fire Resistance</Text>
      <TextInput
        value={formData.fireResistance}
        onChangeText={text => setFormData({ ...formData, fireResistance: text })}
        style={styles.input}
      />

      <Text style={styles.label}>Door Thickness (mm)</Text>
      <TextInput
        value={formData.doorThickness?.toString() || ""}
        keyboardType="numeric"
        onChangeText={text => setFormData({ ...formData, doorThickness: parseFloat(text) })}
        style={styles.input}
      />

      <Text style={styles.label}>Has Certification Visible</Text>
      <View style={styles.switchRow}>
        <Text>No</Text>
        <Switch
          value={true}
          onValueChange={() => {}}
        />
        <Text>Yes</Text>
      </View>

      {/* Add other fields as needed */}

      <Button title="Save Survey" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { marginTop: 10, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 4,
    marginTop: 5,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
});

export default ViewSurvey;
