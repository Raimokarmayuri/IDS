// import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
// import React, { useEffect, useState } from "react";
// import {
//     ActivityIndicator,
//     Alert,
//     Button,
//     ScrollView,
//     StyleSheet,
//     Switch,
//     Text,
//     TextInput,
//     View,
// } from "react-native";
// import { FormData } from "../types/surveyTypes";
// import { fetchInspectionData, saveSurveyFormData } from "../utils/api";

// const ViewSurvey: React.FC = () => {
//   const navigation = useNavigation();
//   const route = useRoute<RouteProp<{ params: { doorRefNumber: string } }, "params">>();
//   const { doorRefNumber } = route.params;

//   const [formData, setFormData] = useState<FormData>({
//     buildingName: "",
//     doorNumber: "",
//     doorType: "Select",
//     doorTypeName: "",
//     doorOther: "",
//     doorPhotos: [],
//     fireResistance: "Select",
//     head: null,
//     headTimeline: "Select",
//     headSeverity: "Select",
//     headComments: "",
//     headCategory: "Select",
//     headDueDate: "",
//     headRemediation: "",
//     hinge: null,
//     hingeLocation: "Select",
//     hingeTimeline: "Select",
//     hingeSeverity: "Select",
//     hingeComments: "",
//     hingeCategory: "Select",
//     hingeDueDate: "",
//     hingeRemediation: "",
//     closing: null,
//     closingTimeline: "Select",
//     closingSeverity: "Select",
//     closingComments: "",
//     closingCategory: "Select",
//     closingDueDate: "",
//     closingRemediation: "",
//     threshold: null,
//     thresholdTimeline: "Select",
//     thresholdSeverity: "Select",
//     thresholdComments: "",
//     thresholdCategory: "Select",
//     thresholdDueDate: "",
//     thresholdRemediation: "",
//     doorThickness: null,
//     frameDepth: null,
//     doorSize: null,
//     fullDoorsetSize: null,
//   });

//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (doorRefNumber) {
//       loadSurvey();
//     }
//   }, []);

//   const loadSurvey = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetchInspectionData(doorRefNumber);
//       if (response) {
//         setFormData(prev => ({
//           ...prev,
//           ...response,
//         }));
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to fetch survey data.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSave = async () => {
//     if (!formData.buildingName || !formData.doorNumber) {
//       Alert.alert("Validation", "Building name and door number are required.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await saveSurveyFormData(formData);
//       Alert.alert("Success", "Survey saved successfully!");
//       navigation.goBack();
//     } catch (error) {
//       Alert.alert("Error", "Failed to save survey.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.heading}>View Survey</Text>
//       {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

//       <Text style={styles.label}>Building Name</Text>
//       <TextInput
//         value={formData.buildingName}
//         onChangeText={text => setFormData({ ...formData, buildingName: text })}
//         style={styles.input}
//       />

//       <Text style={styles.label}>Door Number</Text>
//       <TextInput
//         value={formData.doorNumber}
//         onChangeText={text => setFormData({ ...formData, doorNumber: text })}
//         style={styles.input}
//       />

//       <Text style={styles.label}>Fire Resistance</Text>
//       <TextInput
//         value={formData.fireResistance}
//         onChangeText={text => setFormData({ ...formData, fireResistance: text })}
//         style={styles.input}
//       />

//       <Text style={styles.label}>Door Thickness (mm)</Text>
//       <TextInput
//         value={formData.doorThickness?.toString() || ""}
//         keyboardType="numeric"
//         onChangeText={text => setFormData({ ...formData, doorThickness: parseFloat(text) })}
//         style={styles.input}
//       />

//       <Text style={styles.label}>Has Certification Visible</Text>
//       <View style={styles.switchRow}>
//         <Text>No</Text>
//         <Switch
//           value={true}
//           onValueChange={() => {}}
//         />
//         <Text>Yes</Text>
//       </View>

//       {/* Add other fields as needed */}

//       <Button title="Save Survey" onPress={handleSave} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 20, backgroundColor: "#fff" },
//   heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
//   label: { marginTop: 10, fontSize: 16 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 4,
//     marginTop: 5,
//   },
//   switchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginVertical: 10,
//   },
// });

// export default ViewSurvey;
/* TypeScript conversion of ViewSurvey.js */

import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import Toaster from "../components/common/Toaster";

// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import Capture from "./Capture";


// Define necessary types
interface RootState {
  user: {
    userObj: {
      userId: string;
      userName: string;
      token: string;
    };
  };
}

interface Params {
  doorRefNumber: string;
}

// Initial constants (same as your existing JS)
const COMPLIANCE_CHECK_MASTER = { /* same as original */ };
const COMPLIANCE_CHECK = { /* same as original */ };
const FORM_DATA = { /* same as original */ };
const BASE_MEASURES = { head: 3, hinge: 3, closing: 3, threshold: 3 };
const BASE_MEASURES_COMP = { intumescentStrips: true, coldSmokeSeals: true, fireLockedSign: true, fireShutSign: true, pyroGlazing: true };
const ACTION_MENU_FLAG = { head: false, hinge: false, closing: false, threshold: false, intumescentStrips: false, coldSmokeSeals: false, selfClosingDevice: false, fireLockedSign: false, fireShutSign: false, pyroGlazing: false };
const ACTION_MENU_IMAGES = { head: [], hinge: [], closing: [], threshold: [], intumescentStrips: [], coldSmokeSeals: [], selfClosingDevice: [], fireLockedSign: [], fireShutSign: [], pyroGlazing: [] };

const ViewSurvey: React.FC = () => {
  const navigate = useNavigation();
  const { doorRefNumber } = useParams<Params>();
  const currentURL = window.location.href;

  const [isView, setIsView] = useState<boolean>(false);
  const [propertyId, setPropertyId] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");
  const [doorOtherFlag, setDoorOtherFlag] = useState<boolean>(false);
  const [isColdSeals, setIsColdSeals] = useState<boolean>(false);
  const [isFireKeepLocked, setFireKeepLocked] = useState<boolean>(false);
  const [isGlazing, setIsGlazing] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [hideSidebar, setHideSidebar] = useState<boolean>(false);
  const [complianceCheck, setComplianceCheck] = useState<any>(COMPLIANCE_CHECK);
  const [validationFlag, setValidationFlag] = useState<boolean>(false);
  const [actionmenuFlag, setActionMenuFlag] = useState<any>([]);
  const [actionImages, setActionImages] = useState<any>(ACTION_MENU_IMAGES);
  const [error, setError] = useState<any>(null);
  const [toastData, setToastData] = useState<any>({ toastShow: false, toastType: "", toastString: "" });
  const [doorTypesOption, setDoorTypesOption] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [ShowScanQRCode, setShowScanQRCode] = useState<boolean>(false);
  const [resetCaptureFlag, setResetCaptureFlag] = useState<boolean>(false);
  const [floorPlanImages, setFloorPlanImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<any>(FORM_DATA);
  const [basicFormData, setBasicFormData] = useState<any>({
    propertyMasterId: "",
    buildingName: "",
    uniqueRef: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
    floor: null,
    comment: "",
    floorPlan: [],
  });
  const mandatoryFieldRef = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>>({});
  const { userObj } = useSelector((state: RootState) => state.user);

  // -- PLACE ALL YOUR EXISTING LOGIC (fetchInspectionDoorData, handleValidationOnSave, etc.) HERE, UNCHANGED EXCEPT FOR TYPES --
  // -- For large functions like `fetchInspectionDoorData`, move them into their own `useEffect` hooks or modular files as needed --

  if (error) {
    return (
      <div className="inCenterDiv">
        <i className="bi bi-exclamation-triangle red"></i>
        <h3>Something went wrong!</h3>
        <p>
          The link you clicked may be broken or it was an invalid QR code.
          Please check the source or try again.
        </p>
        <p>{error?.message}</p>
        <div className="col-sm-12 mb-4 text-center">
          {/* <Link to="/">Go back to Login</Link> */}
        </div>
      </div>
    );
  }

  return (
      <>
      {/* <Header hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} /> */}
      {userObj && (
        <div className="dashboard_body_main d-flex vh-100">
          <Toaster
            show={toastData.toastShow}
            toastType={toastData.toastType}
            title={toastData.toastString}
            theme="dark"
            position="top-center"
            closeButton={() => setToastData({ toastShow: false, toastType: "", toastString: "" })}
          />
          <Loader active={isLoading} />
          {/* {hideSidebar && <Sidebar />} */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <span className="close" onClick={() => setShowModal(false)}>
                  &times;
                </span>
                <h6 className="modal-header">
                  QR Code
                </h6>
                <div className="modal-body">
                  {showLoader ? (
                    <div className="approvalLoader" style={{ marginLeft: "45%" }}></div>
                  ) : (
                    qrCode && (
                      <img
                        src={qrCode}
                        alt="QR Code"
                        style={{ height: "80%", width: "50%" }}
                      />
                    )
                  )}
                  {!showLoader && (
                    <div style={{ marginTop: "20px" }}>
                      <button
                        className="btn btn-primary"
                        style={{ minHeight: "20px" }}
                        onClick={() => {
                          const printWindow = window.open("", "_blank");
                          if (printWindow) {
                            printWindow.document.write(`
                              <html>
                                <head>
                                  <style>
                                    body { font-family: Arial, sans-serif; }
                                    .print-container { text-align: center; }
                                    .modal-header { background-color: gray; color: white; padding: 10px; }
                                  </style>
                                </head>
                                <body>
                                  <div class="print-container" style="margin-top:100px">
                                    <img src="${qrCode}" alt="QR Code" height='400px' width='400px' />
                                    <h3>QR Code</h3>
                                  </div>
                                </body>
                              </html>
                            `);
                            printWindow.document.close();
                            printWindow.print();
                            printWindow.close();
                          }
                        }}
                      >
                        Print
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="d-flex dashboard_body flex-column py-3 " style={{ width: "100%" }}>
            <form className="row m-0">
              <div className="col-sm-12 mb-3">
                <div className="card">
                  <div className="card-body action_btns d-flex justify-content-end gap-3 flex-wrap flex-sm-nowrap">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      // onClick={() => navigate("/property-view-details/" + propertyId)}
                    >
                      Back
                    </button>
                    {!isView && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled={isLoading}
                        onClick={() => alert("Save logic to be added")}
                      >
                        Save & Proceed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
            {/* <Footer /> */}
          </div>
        </div>
      )}
    </>
    
  );
};

export default ViewSurvey;
function useParams<T>(): { doorRefNumber: any; } {
  throw new Error("Function not implemented.");
}

