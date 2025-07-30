// screens/PropertyDetailsScreen.tsx
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import {
  DOOR_INSPECTION_API,
  GET_CLINET_ID_API,
  GET_PROPERTY_COMPLIANCE_SUMMARY,
  GET_PROPERTY_INFO_WITH_MASTER,
  GET_PROPERTY_USER_MAPPING,
  UPDATE_PROPERTY_USER_MAPPING_STATUS,
} from "../api/apiPath";
import http from "../api/server";
import { Statuses, UserRoles } from "../components/common/constants";
import DataGridTable from "../components/common/DataGridTable"; // adjust path if needed
import Footer from "../components/common/Footer";


const PropertyDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { propertyId } = route.params as { propertyId: string };

  const { userObj } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(true);
  const [complianceData, setComplianceData] = useState<any>(null);
  const [propertyInfo, setPropertyInfo] = useState<any>(null);
  const [userRole, setUserRole] = useState<number | null>(null);
  const [inspectorInspectionStatus, setInspectorInspectionStatus] =
    useState(null);
  const [propertyUserRoleMappingId, setPropertyUserRoleMappingId] = useState<
    string | null
  >(null);
  const [showDownload, setShowDownload] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const clientRes = await http.get(
          `${GET_CLINET_ID_API}/${userObj.userId}`
        );
        setUserRole(clientRes.data.roleId);

        const complianceRes = await http.get(
          `${GET_PROPERTY_COMPLIANCE_SUMMARY}?propertyMasterId=${propertyId}`
        );
        setComplianceData(complianceRes.data);

        const infoRes = await http.get(
          `${GET_PROPERTY_INFO_WITH_MASTER}${propertyId}`
        );
        setPropertyInfo(infoRes.data.inspectionPropertyInfo);

        const mappingRes = await http.get(
          `${GET_PROPERTY_USER_MAPPING}${propertyId}`
        );
        const mapping = mappingRes.data.find(
          (d: any) => d.userId === userObj.userId
        );
        setInspectorInspectionStatus(mapping.status);
        setPropertyUserRoleMappingId(mapping.propertyUserRoleMappingId);
      } catch (err) {
        Alert.alert("Error", "Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  const paginatedDoorDetails = complianceData?.doorComplianceDetails
    ?.sort(
      (a: any, b: any) =>
        new Date(b.doorInspectionDate).getTime() -
        new Date(a.doorInspectionDate).getTime()
    )
    ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(
    complianceData?.doorComplianceDetails?.length / itemsPerPage
  );

  const submitForApproval = async () => {
    try {
      await http.put(
        `${UPDATE_PROPERTY_USER_MAPPING_STATUS}${propertyUserRoleMappingId}`,
        {
          propertyUserRoleMappingId,
          status: Statuses.COMPLETED,
          propertyMasterId: propertyId,
        }
      );
      Alert.alert("Success", "Survey submitted for approval");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "Submission failed");
    }
  };

  const handleDownload = async () => {
    try {
      const res = await http.get(DOOR_INSPECTION_API, {
        params: { propertyId },
        responseType: "blob",
      });

      const file = new Blob([res.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      Linking.openURL(fileURL);
    } catch (err) {
      Alert.alert("Error", "Failed to download PDF");
    }
  };

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerText}>
          {complianceData?.propertyName || "Property Name"}
        </Text>
        <Text>
          <Text style={styles.bold}>Location:</Text>{" "}
          {complianceData?.propertyLocation}
        </Text>
        <Text>
          <Text style={styles.bold}>Inspectors:</Text>{" "}
          {complianceData?.inspectors}
        </Text>
        <Text>
          <Text style={styles.bold}>Status:</Text>{" "}
          {complianceData?.propertyStatus === Statuses.INREVIEW
            ? "In Progress"
            : complianceData?.propertyStatus}
        </Text>
        <Text>
          <Text style={styles.bold}>Submitted Date:</Text>{" "}
          {new Date(complianceData?.submittedDate).toLocaleDateString()}
        </Text>
        {/* {isCompleted && (
          <Text><Text style={styles.bold}>Approval Date:</Text> {new Date(complianceData?.approvalDate).toLocaleDateString()}</Text>
        )} */}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Compliance Summary</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{complianceData?.totalDoors}</Text>
            <Text style={styles.statLabel}>Total Doors</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: "green" }]}>
              {complianceData?.compliantCount}
            </Text>
            <Text style={styles.statLabel}>Compliant</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: "red" }]}>
              {complianceData?.nonCompliantCount}
            </Text>
            <Text style={styles.statLabel}>Non-Compliant</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {complianceData?.criticalNonComplianceCount}
            </Text>
            <Text style={styles.statLabel}>Critical Issues</Text>
          </View>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.smallLabel}>
            Overall Compliance Rate :{" "}
            {isNaN(complianceData?.complianceRate)
              ? complianceData?.complianceRate
              : Math.round(Number(complianceData?.complianceRate))}
            %
          </Text>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${complianceData?.complianceRate ?? 0}%` },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.card}>
  <Text style={styles.cardTitle}>Door Surveys</Text>

  {complianceData?.doorComplianceDetails?.length > 0 ? (
    <DataGridTable
      tableData={complianceData.doorComplianceDetails.map((item: any) => ({
        doorRefNumber: item.doorRefNumber,
        doorType: item.doorType,
        fireRating: item.fireRating || "-",
        compliance: item.isCompliant,
        comments: item.comments,
      }))}
      userRole={userRole}
      inspectorInspectionStatus={inspectorInspectionStatus}
      propertyInfo={propertyInfo}
    />
  ) : (
    <Text style={{ marginTop: 10 }}>No door survey data available.</Text>
  )}
</View>



      {/* {userRole === UserRoles.INSPECTOR &&
        inspectorInspectionStatus !== Statuses.COMPLETED && (
          <Button title="Submit for Approval" onPress={submitForApproval} />
        )} */}

      {(userRole === UserRoles.ADMIN || userRole === UserRoles.APPROVER) &&
        propertyInfo?.status === Statuses.COMPLETED && (
          <Button title="Download Report" onPress={handleDownload} />
        )}

 <TouchableOpacity
   onPress={() => navigation.goBack()}
        style={[
          styles.button,
          {
            backgroundColor: "#ffffff", // white background
            marginTop: 30,
            marginBottom: 20,
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
            borderWidth: 1, // black border
            borderColor: "#000000",
          },
        ]}
        // onPress={handleSubmit}
      >
        <Text style={{ color: "#000000", fontSize: 16, fontWeight: "600" }}>
           Back
        </Text>
      </TouchableOpacity>
      
      {/* <View style={{ marginTop: 20 }}>
        <Button
          title="Back"
          onPress={() => navigation.goBack()}
        />
      </View> */}

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  stats: { marginVertical: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    color: "#fff",
    fontWeight: "bold",
    width: 200,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  tableCell: {
    width: 200,
    paddingHorizontal: 4,
  },
  iconCell: {
    width: 120,
    textAlign: "center",
    fontSize: 16,
  },

  rowCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  bold: { fontWeight: "bold" },
  actions: {
    flexDirection: "column",
    gap: 8,
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
    color: "#444",
    width: "40%",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statBox: {
    width: "48%",
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  statLabel: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  smallLabel: {
    fontSize: 13,
    color: "#333",
    marginBottom: 6,
  },
  progressBarBackground: {
    height: 8,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: "#4caf50",
    borderRadius: 4,
  },
});

export default PropertyDetailsScreen;
