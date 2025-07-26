// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// // import { RootStackParamList } from '../navigation/types';
// import {
//   GET_CLINET_ID_API,
//   GET_PROPERTY_COMPLIANCE_SUMMARY,
//   GET_PROPERTY_INFO_WITH_MASTER,
//   GET_PROPERTY_USER_MAPPING,
//   UPDATE_PROPERTY_USER_MAPPING_STATUS
// } from '../src/api/apiPath';
// import http from '../src/api/server';
// import { Statuses, UserRoles } from '../src/components/constants';

// // import RNFetchBlob from 'rn-fetch-blob';

// import Toast from 'react-native-toast-message';


// const Dashboard = () => {
//   // const route = useRoute<RouteProp<RootStackParamList, 'Dashboard'>>();
//   // const navigation = useNavigation();
//   // const { propertyId } = route.params;

//    const route = useRoute();
//     const navigation = useNavigation();
//     const { propertyId } = route.params as { propertyId: string };

//   const [loading, setLoading] = useState(true);
//   const [complianceData, setComplianceData] = useState<any>(null);
//   const [propertyInfo, setPropertyInfo] = useState<any>(null);
//   const [userRole, setUserRole] = useState<number | null>(null);
//   const [inspectorInspectionStatus, setInspectorInspectionStatus] = useState<string | null>(null);
//   const [propertyUserRoleMappingId, setPropertyUserRoleMappingId] = useState<number | null>(null);

//   const fetchData = async () => {
//     try {
//       const userData = await AsyncStorage.getItem('user');
//       const parsedUser = userData ? JSON.parse(userData) : null;
//       const userId = parsedUser?.userId;

//       const userResp = await http.get(`${GET_CLINET_ID_API}/${userId}`);
//       setUserRole(userResp.data.roleId);

//       const complianceResp = await http.get(`${GET_PROPERTY_COMPLIANCE_SUMMARY}?propertyMasterId=${propertyId}`);
//       setComplianceData(complianceResp.data);

//       const infoResp = await http.get(`${GET_PROPERTY_INFO_WITH_MASTER}${propertyId}`);
//       setPropertyInfo(infoResp.data.inspectionPropertyInfo);

//       const mappingResp = await http.get(`${GET_PROPERTY_USER_MAPPING}${propertyId}`);
//       const currentUser = mappingResp.data.find((d: any) => d.userId === userId);

//       setInspectorInspectionStatus(currentUser.status);
//       setPropertyUserRoleMappingId(currentUser.propertyUserRoleMappingId);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSubmitApproval = async () => {
//     try {
//       const payload = {
//         propertyUserRoleMappingId,
//         status: Statuses.COMPLETED,
//         propertyMasterId: propertyId,
//       };

//       const response = await http.put(
//         `${UPDATE_PROPERTY_USER_MAPPING_STATUS}${propertyUserRoleMappingId}`,
//         payload
//       );

//       if (response.status === 200) {
//         Toast.show({ type: 'success', text1: 'Submitted for approval' });
//         fetchData();
//       } else {
//         Toast.show({ type: 'error', text1: 'Failed to submit' });
//       }
//     } catch (err) {
//       console.error(err);
//       Toast.show({ type: 'error', text1: 'Something went wrong' });
//     }
//   };

//   // const handleDownloadPdf = async () => {
//   //   try {
//   //     const { config, fs } = RNFetchBlob;
//   //     const { dirs } = fs;
//   //     const path = `${dirs.DownloadDir}/door_inspection_${propertyId}.pdf`;

//   //     await config({ path }).fetch('GET', DOOR_INSPECTION_API, {
//   //       propertyId: propertyId.toString(),
//   //     });

//   //     Toast.show({ type: 'success', text1: 'Downloaded PDF to Downloads folder' });
//   //   } catch (err) {
//   //     console.error(err);
//   //     Toast.show({ type: 'error', text1: 'Failed to download PDF' });
//   //   }
//   // };

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#007acc" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>{complianceData?.propertyName}</Text>
//       <Text>Location: {complianceData?.propertyLocation}</Text>
//       <Text>Status: {complianceData?.propertyStatus}</Text>
//       <Text>Total Doors: {complianceData?.totalDoors}</Text>
//       <Text>Compliant: {complianceData?.compliantCount}</Text>
//       <Text>Non-Compliant: {complianceData?.nonCompliantCount}</Text>

//       {(userRole === UserRoles.INSPECTOR && inspectorInspectionStatus !== Statuses.COMPLETED) && (
//         <TouchableOpacity onPress={handleSubmitApproval} style={styles.button}>
//           <Text style={styles.buttonText}>Submit for Approval</Text>
//         </TouchableOpacity>
//       )}

//       {(userRole === UserRoles.APPROVER || userRole === UserRoles.ADMIN) &&
//         propertyInfo?.status === Statuses.COMPLETED && (
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Download Report</Text>
//           </TouchableOpacity>
//         )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#007acc',
//     padding: 10,
//     marginTop: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
// });

// export default Dashboard;
import React from 'react';
import Dashboard from '../src/screens/Dashboard'; // reuse your component

export default function LoginPage() {
  return <Dashboard />;
}
