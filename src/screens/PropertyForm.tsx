import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { GET_CLINET_ID_API, PROPERTY_DASHBOARD_API } from "../api/apiPath";
import http from "../api/server";
import Footer from "../components/common/Footer";
import PropertyTile from "../components/common/PropertyTile";
import { RootState } from "../store/slices/store";

const PropertyForm = () => {
  const [propertyData, setPropertyData] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<number | null>(null);
  const [inspectionPropertyInfo, setInspectionPropertyInfo] =
    useState<any>(null);
  const userObj = useSelector((state: RootState) => state.user.userObj);
  const navigation = useNavigation<any>();

  const getSearchData = (value: string) => {
    const filteredResults = data?.propertyFields?.filter((item: any) => {
  return (
    typeof item.propertyName === "string" &&
    item.propertyName.toLowerCase().includes(value.toLowerCase())
  );
});

    setPropertyData(filteredResults);
  };

  useEffect(() => {
    if (!userObj) return;

    const fetchData = async () => {
      try {
        const responseClient = await http.get(
          `${GET_CLINET_ID_API}/${userObj?.userId}`
        );
        setUserRole(responseClient?.data?.roleId);

        const response = await http.get(
          `${PROPERTY_DASHBOARD_API}clientId=${responseClient?.data?.clientId}&userId=${userObj.userId}`
        );

        const result = response.data;
        setData(result);
        setPropertyData(result?.propertyFields);
        setInspectionPropertyInfo(result?.InspectionPropertyInfo);
      } catch (err: any) {
        setError(err?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userObj]);

  const gotoDashboard = () => {
    navigation.navigate("Survey"); // Change this to your actual route
  };

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Something went wrong!</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Go back to Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.button} onPress={gotoDashboard}>
          <Text style={styles.buttonText}>+ New Survey</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007acc"
          style={{ marginTop: 40 }}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.summaryRow}>
            {data?.grandTotalDoors >= 0 && (
              <View style={styles.card}>
                <Text style={styles.cardIcon}>🚪</Text>
                {/* <Icon name="door-closed" size={24} color="#333" /> */}
                <Text style={styles.cardValue}>{data?.grandTotalDoors}</Text>
                <Text style={styles.cardLabel}>Total Doors</Text>
              </View>
            )}
            {data?.grandTotalCompliant >= 0 && (
              <View style={styles.card}>
                {/* <Text style={styles.cardIcon}>✅</Text> */}
                <Icon name="check-circle" size={24} color="green" />
                <Text style={styles.cardValue}>
                  {data?.grandTotalCompliant}
                </Text>
                <Text style={styles.cardLabel}>Compliant</Text>
              </View>
            )}
          </View>

          <View style={styles.summaryRow}>
            {data?.grandTotalNonCompliant >= 0 && (
              <View style={styles.card}>
                {/* <Text style={styles.cardIcon}>❌</Text> */}
                <Icon name="times-circle" size={24} color="orange" />
                <Text style={styles.cardValue}>
                  {data?.grandTotalNonCompliant}
                </Text>
                <Text style={styles.cardLabel}>Non-Compliant</Text>
              </View>
            )}
            {data?.grandTotalCritical >= 0 && (
              <View style={styles.card}>
                {/* <Text style={styles.cardIcon}>⚠️</Text> */}
                <Icon name="exclamation-triangle" size={24} color="red" />
                <Text style={styles.cardValue}>{data?.grandTotalCritical}</Text>
                <Text style={styles.cardLabel}>Critical Issues</Text>
              </View>
            )}
          </View>

          <TextInput
            placeholder="Search properties"
            placeholderTextColor="#888"
            style={styles.searchInput}
            onChangeText={getSearchData}
          />

          <FlatList
            data={propertyData}
            keyExtractor={(item) => item.propertyId?.toString()}
            renderItem={({ item }) => (
              <PropertyTile
                data={item}
                userRole={userRole ?? 0} // fallback to 0 if null to avoid TS error
                onViewProperty={(propertyId) => {
                  navigation.navigate("PropertyDetails", { propertyId });
                }}
                onStartSurvey={(propertyId) => {
                  navigation.navigate("Dashboard", {
                    propertyMasterId: propertyId,
                  });
                }}
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 60 }}
            scrollEnabled={true}
          />
           <Footer />
        </ScrollView>
      )}

     
    </SafeAreaView>
  );
};

export default PropertyForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerRow: {
    padding: 16,
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "#007acc",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  card: {
    width: "45%",
    padding: 12,
    backgroundColor: "#eef6ff",
    borderRadius: 10,
    alignItems: "center",
  },
  cardIcon: {
    fontSize: 22,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: "#555",
  },
  searchInput: {
    backgroundColor: "#f2f2f2",
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    color: "#000",
  },
  content: {
    paddingBottom: 60,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  link: {
    color: "#007acc",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
