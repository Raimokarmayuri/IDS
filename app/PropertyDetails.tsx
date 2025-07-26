import React from 'react';
import PropertyViewDetails from '../src/screens/PropertyViewDetails'; // reuse your component

export default function LoginPage() {
  return <PropertyViewDetails />;
}


// screens/PropertyDetailsScreen.tsx
// import { useNavigation, useRoute } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, Button, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
// import { useSelector } from 'react-redux';
// import {
//   DOOR_INSPECTION_API,
//   GET_CLINET_ID_API,
//   GET_PROPERTY_COMPLIANCE_SUMMARY,
//   GET_PROPERTY_INFO_WITH_MASTER,
//   GET_PROPERTY_USER_MAPPING,
//   UPDATE_PROPERTY_USER_MAPPING_STATUS
// } from '../src/api/apiPath';
// import http from '../src/api/server';
// import { Statuses, UserRoles } from '../src/components/constants';

// const PropertyDetailsScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { propertyId } = route.params as { propertyId: string };

//   const { userObj } = useSelector((state: any) => state.user);
//   const [loading, setLoading] = useState(true);
//   const [complianceData, setComplianceData] = useState<any>(null);
//   const [propertyInfo, setPropertyInfo] = useState<any>(null);
//   const [userRole, setUserRole] = useState<number | null>(null);
//   const [inspectorInspectionStatus, setInspectorInspectionStatus] = useState(null);
//   const [propertyUserRoleMappingId, setPropertyUserRoleMappingId] = useState<string | null>(null);
//   const [showDownload, setShowDownload] = useState(false);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const clientRes = await http.get(`${GET_CLINET_ID_API}/${userObj.userId}`);
//         setUserRole(clientRes.data.roleId);

//         const complianceRes = await http.get(`${GET_PROPERTY_COMPLIANCE_SUMMARY}?propertyMasterId=${propertyId}`);
//         setComplianceData(complianceRes.data);

//         const infoRes = await http.get(`${GET_PROPERTY_INFO_WITH_MASTER}${propertyId}`);
//         setPropertyInfo(infoRes.data.inspectionPropertyInfo);

//         const mappingRes = await http.get(`${GET_PROPERTY_USER_MAPPING}${propertyId}`);
//         const mapping = mappingRes.data.find((d: any) => d.userId === userObj.userId);
//         setInspectorInspectionStatus(mapping.status);
//         setPropertyUserRoleMappingId(mapping.propertyUserRoleMappingId);
//       } catch (err) {
//         Alert.alert("Error", "Failed to load property details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, []);

//   const submitForApproval = async () => {
//     try {
//       await http.put(`${UPDATE_PROPERTY_USER_MAPPING_STATUS}${propertyUserRoleMappingId}`, {
//         propertyUserRoleMappingId,
//         status: Statuses.COMPLETED,
//         propertyMasterId: propertyId
//       });
//       Alert.alert("Success", "Survey submitted for approval");
//       navigation.goBack();
//     } catch (err) {
//       Alert.alert("Error", "Submission failed");
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       const res = await http.get(DOOR_INSPECTION_API, {
//         params: { propertyId },
//         responseType: 'blob',
//       });

//       const file = new Blob([res.data], { type: 'application/pdf' });
//       const fileURL = URL.createObjectURL(file);
//       Linking.openURL(fileURL);
//     } catch (err) {
//       Alert.alert("Error", "Failed to download PDF");
//     }
//   };

//   if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{complianceData?.propertyName}</Text>
//       <Text>Location: {complianceData?.propertyLocation}</Text>
//       <Text>Inspectors: {complianceData?.inspectors}</Text>
//       <Text>Status: {complianceData?.propertyStatus}</Text>
//       <Text>Submitted: {new Date(complianceData?.submittedDate).toLocaleDateString()}</Text>

//       <View style={styles.stats}>
//         <Text>Total Doors: {complianceData?.totalDoors}</Text>
//         <Text>Compliant: {complianceData?.compliantCount}</Text>
//         <Text>Non-Compliant: {complianceData?.nonCompliantCount}</Text>
//         <Text>Critical: {complianceData?.criticalNonComplianceCount}</Text>
//       </View>

//       {(userRole === UserRoles.INSPECTOR &&
//         inspectorInspectionStatus !== Statuses.COMPLETED) && (
//         <Button title="Submit for Approval" onPress={submitForApproval} />
//       )}

//       {(userRole === UserRoles.ADMIN || userRole === UserRoles.APPROVER) &&
//         propertyInfo?.status === Statuses.COMPLETED && (
//           <Button title="Download Report" onPress={handleDownload} />
//         )}

//       <View style={{ marginTop: 20 }}>
//         <Button title="Back to Properties" onPress={() => navigation.goBack()} />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 16 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
//   stats: { marginVertical: 20 },
// });

// export default PropertyDetailsScreen;
