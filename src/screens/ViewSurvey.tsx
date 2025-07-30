

// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
// import { useSelector } from "react-redux";
// import {
//   GET_DOOR_INSPECTION_DATA,
//   GET_PROPERTY_INFO_WITH_MASTER
// } from "../api/apiPath";
// import http from "../api/server";
// import Toaster from "../components/common/Toaster";

// interface RootState {
//   user: { userObj: { userId: string; userName: string; token: string } };
// }

// interface Props {
//   doorRefNumber: string;
// }

// const COMPLIANCE_CHECK_MASTER = {
//   intumescentStripsId: "927da4a9-3c0b-46a7-8fb2-00af566a41e6",
//   coldSmokeSealsId: "2d46bbc6-3a52-48ee-ad7d-80c3f3cdf352",
//   selfClosingDeviceId: "145baf7e-bcc6-4c8f-b925-070e751ba2d6",
//   fireLockedSignId: "942c7963-7d98-49db-a13e-63ee7b4fcfd1",
//   fireShutSignId: "b7157137-2bfc-423d-b236-6620c527519b",
//   holdOpenDeviceId: "a106ba4e-ef40-4510-851e-09d1315becc5",
//   visibleCertificationId: "99ab902f-794a-491b-a6e3-26c8a57f9527",
//   doorGlazingId: "1b2886cc-a1a3-4573-a5be-7df68c0db109",
//   pyroGlazingId: "c9873267-e600-4c99-bf08-088dee277909",
// };

// const COMPLIANCE_CHECK = {
//   intumescentStrips: true,
//   intumescentStripsTimeline: "Select",
//   intumescentStripsSeverity: "Select",
//   intumescentStripsComments: "",
//   intumescentStripsCategory: "Select",
//   intumescentStripsDueDate: "",
//   intumescentStripsRemediation: "",
//   intumescentStripsName: "Are there intumescent strips?",
//   intumescentStripsId: "927da4a9-3c0b-46a7-8fb2-00af566a41e6",
//   coldSmokeSeals: true,
//   coldSmokeSealsTimeline: "Select",
//   coldSmokeSealsSeverity: "Select",
//   coldSmokeSealsComments: "",
//   coldSmokeSealsCategory: "Select",
//   coldSmokeSealsDueDate: "",
//   coldSmokeSealsRemediation: "",
//   coldSmokeSealsName: "Are there cold smoke seals?",
//   coldSmokeSealsId: "2d46bbc6-3a52-48ee-ad7d-80c3f3cdf352",
//   selfClosingDevice: true,
//   selfClosingDeviceTimeline: "Select",
//   selfClosingDeviceSeverity: "Select",
//   selfClosingDeviceComments: "",
//   selfClosingDeviceCategory: "Select",
//   selfClosingDeviceDueDate: "",
//   selfClosingDeviceRemediation: "",
//   selfClosingDeviceName: "Self closing device?",
//   selfClosingDeviceId: "145baf7e-bcc6-4c8f-b925-070e751ba2d6",
//   fireLockedSign: true,
//   fireLockedSignTimeline: "Select",
//   fireLockedSignSeverity: "Select",
//   fireLockedSignComments: "",
//   fireLockedSignCategory: "Select",
//   fireLockedSignDueDate: "",
//   fireLockedSignRemediation: "",
//   fireLockedSignName: "Fire door Keep Locked sign?",
//   fireLockedSignId: "942c7963-7d98-49db-a13e-63ee7b4fcfd1",
//   fireShutSign: true,
//   fireShutSignTimeline: "Select",
//   fireShutSignSeverity: "Select",
//   fireShutSignComments: "",
//   fireShutSignCategory: "Select",
//   fireShutSignDueDate: "",
//   fireShutSignRemediation: "",
//   fireShutSignName: "Fire door Keep Shut sign?",
//   fireShutSignId: "b7157137-2bfc-423d-b236-6620c527519b",
//   holdOpenDevice: true,
//   holdOpenDeviceName: "Is there a hold open device?",
//   holdOpenDeviceId: "a106ba4e-ef40-4510-851e-09d1315becc5",
//   visibleCertification: true,
//   visibleCertificationName: "Is certification visible on fire door?",
//   visibleCertificationId: "99ab902f-794a-491b-a6e3-26c8a57f9527",
//   doorGlazing: true,
//   doorGlazingName: "Does the door contain glazing?",
//   doorGlazingId: "1b2886cc-a1a3-4573-a5be-7df68c0db109",
//   pyroGlazing: true,
//   pyroGlazingTimeline: "Select",
//   pyroGlazingSeverity: "Select",
//   pyroGlazingComments: "",
//   pyroGlazingCategory: "Select",
//   pyroGlazingDueDate: "",
//   pyroGlazingRemediation: "",
//   pyroGlazingName: "Is glazing pyro glazing?",
//   pyroGlazingId: "c9873267-e600-4c99-bf08-088dee277909",
// };
// const FORM_DATA = {
//   buildingName: "",
//   doorNumber: "",
//   doorType: "Select",
//   doorTypeName: "",
//   doorOther: "",
//   doorPhotos: [],
//   fireResistance: "Select",
//   head: null,
//   headTimeline: "Select",
//   headSeverity: "Select",
//   headComments: "",
//   headCategory: "Select",
//   headDueDate: "",
//   headRemediation: "",
//   headPredefined: "",
//   hinge: null,
//   hingeLocation: "Select",
//   hingeTimeline: "Select",
//   hingeSeverity: "Select",
//   hingeComments: "",
//   hingeCategory: "Select",
//   hingeDueDate: "",
//   hingeRemediation: "",
//   hingePredefined: "",
//   closing: null,
//   closingTimeline: "Select",
//   closingSeverity: "Select",
//   closingComments: "",
//   closingCategory: "Select",
//   closingDueDate: "",
//   closingRemediation: "",
//   closingPredefined: "",
//   threshold: null,
//   thresholdTimeline: "Select",
//   thresholdSeverity: "Select",
//   thresholdComments: "",
//   thresholdCategory: "Select",
//   thresholdDueDate: "",
//   thresholdRemediation: "",
//   thresholdPredefined: "",
//   doorThickness: null,
//   frameDepth: null,
//   doorSize: null,
//   fullDoorsetSize: null,
// };
// const BASE_MEASURES = {
//   head: 3,
//   hinge: 3,
//   closing: 3,
//   threshold: 3,
// };
// const BASE_MEASURES_COMP = {
//   intumescentStrips: true,
//   coldSmokeSeals: true,
//   fireLockedSign: true,
//   fireShutSign: true,
//   pyroGlazing: true,
// };

// const ACTION_MENU_FLAG = {
//   head: false,
//   hinge: false,
//   closing: false,
//   threshold: false,
//   intumescentStrips: false,
//   coldSmokeSeals: false,
//   selfClosingDevice: false,
//   fireLockedSign: false,
//   fireShutSign: false,
//   pyroGlazing: false,
// };
// const ACTION_MENU_IMAGES = {
//   head: [],
//   hinge: [],
//   closing: [],
//   threshold: [],
//   intumescentStrips: [],
//   coldSmokeSeals: [],
//   selfClosingDevice: [],
//   fireLockedSign: [],
//   fireShutSign: [],
//   pyroGlazing: [],
// };

// const ViewSurvey: React.FC<Props> = ({ doorRefNumber }) => {
//   const userObj = useSelector((state: RootState) => state.user.userObj);

//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState<any>(null);
//   const [propertyInfo, setPropertyInfo] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [toast, setToast] = useState<{ show: boolean; type: string; text: string }>({
//     show: false,
//     type: "default",
//     text: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const resp = await http.get(GET_DOOR_INSPECTION_DATA + doorRefNumber);
//         if (!resp.status) throw new Error("Error loading door inspection");
//         const body = resp.data;
//         setData(body);

//         const propResp = await http.get(GET_PROPERTY_INFO_WITH_MASTER + body.propertyInfo.propertyMasterId);
//         if (!propResp.status) throw new Error("Error loading property info");
//         setPropertyInfo(propResp.data);
//       } catch (err: any) {
//         setError(err.message || "Unknown error");
//         setToast({ show: true, type: "failure", text: err.message });
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [doorRefNumber]);

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorTitle}>Something went wrong!</Text>
//         <Text>{error}</Text>
//       </View>
//     );
//   }

//   if (isLoading) return <ActivityIndicator size="large" style={styles.center} />;

//   if (!data || !propertyInfo) {
//     return (
//       <View style={styles.center}>
//         <Text>No data available.</Text>
//       </View>
//     );
//   }

//   const { inspectedDoorDto, physicalMeasurement, complianceChecks } = data;
//   const building = propertyInfo.propertyMaster.propertyName;

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       <Toaster
//         show={toast.show}
//         toastType={toast.type as any}
//         title={toast.text}
//         theme="dark"
//         position="top-center"
//         closeButton={() => setToast({ show: false, type: "", text: "" })}
//       />

//       <Text style={styles.header}>Property: {building}</Text>
//       <Text style={styles.subheader}>Door Ref: {doorRefNumber}</Text>

//       <Text style={styles.sectionTitle}>Physical Measurements</Text>
//       {["head", "hinge", "closing", "threshold"].map((field) => (
//         <View key={field} style={styles.row}>
//           <Text style={styles.key}>{field}</Text>
//           <Text style={styles.value}>{physicalMeasurement[field]?.value ?? "-"}</Text>
//         </View>
//       ))}

//       <Text style={styles.sectionTitle}>Compliance Checks</Text>
//      {complianceChecks.map((chk: any, idx: number) => (
//   <View key={idx} style={styles.row}>
//     <Text style={styles.key}>{chk.name || chk.complianceCheckMasterID}</Text>
//     <Text style={styles.value}>{chk.isCompliant ? "Compliant" : "Non-compliant"}</Text>
//   </View>
// ))}


//       <Text style={styles.sectionTitle}>Door Photos</Text>
//      {inspectedDoorDto.doorPhoto &&
//   Object.entries(inspectedDoorDto.doorPhoto).map(([key, uri]) => (
//     <Image key={key} source={{ uri: uri as string }} style={styles.image} />
//   ))}

//       <View style={styles.buttonContainer}>
//         <Button title="Back" onPress={() => {/* navigation logic here */}} />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   errorTitle: { fontSize: 18, color: "red", marginBottom: 10 },
//   header: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
//   subheader: { fontSize: 18, marginBottom: 20 },
//   sectionTitle: { fontSize: 20, marginTop: 20, marginBottom: 10 },
//   row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
//   key: { fontWeight: "600" },
//   value: {},
//   image: { width: "100%", height: 200, marginBottom: 10 },
//   buttonContainer: { marginTop: 20 },
// });

// export default ViewSurvey;
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import "../styles/FormComponents.css";
import FormComponent from './FormComponent'; // Adjust path if needed
// ==== INTERFACES ====

interface BasicFormData {
  buildingName: string;
  uniqueRef: string;
  date: string;
  location: string;
  floor: number;
  floorPlan: string[];
  comment: string;
}

interface FormData {
  doorNumber: string;
  doorType: string;
  doorOther: string;
  head: number;
  hingeLocation: string;
  hinge: number;
  closing: number;
  threshold: number;
  doorThickness: number;
  frameDepth: number;
  doorSize: number;
  fullDoorsetSize: number;
  doorPhotos: string[];
}

interface ComplianceCheck {
  intumescentStrips: boolean;
  coldSmokeSeals: boolean;
  selfClosingDevice: boolean;
  fireLockedSign: boolean;
  fireShutSign: boolean;
  holdOpenDevice: boolean;
  visibleCertification: boolean;
  doorGlazing: boolean;
  pyroGlazing: boolean;
}

interface ActionMenuFlag {
  [key: string]: boolean;
}

interface ActionImages {
  [key: string]: string[];
}

interface ViewSurveyProps {
  doorRefNumber: string;
}

// ==== VIEW SURVEY COMPONENT ====

const ViewSurvey: React.FC<ViewSurveyProps> = ({ doorRefNumber }) => {
  const [basicFormData, setBasicFormData] = useState<BasicFormData>({
    buildingName: '',
    uniqueRef: '',
    date: '',
    location: '',
    floor: 0,
    floorPlan: [],
    comment: '',
  });

  const [formData, setFormData] = useState<FormData>({
    doorNumber: '',
    doorType: '',
    doorOther: '',
    head: 0,
    hingeLocation: '',
    hinge: 0,
    closing: 0,
    threshold: 0,
    doorThickness: 0,
    frameDepth: 0,
    doorSize: 0,
    fullDoorsetSize: 0,
    doorPhotos: [],
  });

  const [complianceCheck, setComplianceCheck] = useState<ComplianceCheck>({
    intumescentStrips: false,
    coldSmokeSeals: false,
    selfClosingDevice: false,
    fireLockedSign: false,
    fireShutSign: false,
    holdOpenDevice: false,
    visibleCertification: false,
    doorGlazing: false,
    pyroGlazing: false,
  });

  const [actionmenuFlag, setActionMenuFlag] = useState<ActionMenuFlag>({});
  const [actionImages, setActionImages] = useState<ActionImages>({});
  const [floorPlanImages, setFloorPlanImages] = useState<string[]>([]);
  const [isView, setIsView] = useState(true);
  const [ShowScanQRCode, setShowScanQRCode] = useState(false);
  const [resetCaptureFlag, setResetCaptureFlag] = useState(false);
  const [isColdSeals, setIsColdSeals] = useState(true);
  const [isGlazing, setIsGlazing] = useState(true);
  const [isFireKeepLocked, setIsFireKeepLocked] = useState(true);
  const [doorOtherFlag, setDoorOtherFlag] = useState(false);
  const [validationFlag, setValidationFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [doorTypesOption] = useState([
    { doorTypeId: 1, doorTypeName: 'Wood' },
    { doorTypeId: 2, doorTypeName: 'Metal' },
    { doorTypeId: 99, doorTypeName: 'Other' },
  ]);

  const mandatoryFieldRef = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await fetchSurveyDataByRef(doorRefNumber);
      if (response) {
        setBasicFormData(response.basicInfo);
        setFormData(response.doorData);
        setComplianceCheck(response.compliance);
        setActionMenuFlag(response.actionMenuFlags);
        setActionImages(response.images);
        setFloorPlanImages(response.floorPlanImages);
      }
    };

    fetchData();
  }, [doorRefNumber]);

  // Dummy fetch (replace with your real API call)
  const fetchSurveyDataByRef = async (ref: string) => {
    return {
      basicInfo: {
        buildingName: 'Sample Building',
        uniqueRef: 'SB-001',
        date: '2025-07-29',
        location: 'Level 3',
        floor: 3,
        floorPlan: ['floor1.jpg'],
        comment: 'Fire door checked.',
      },
      doorData: {
        doorNumber: 'D101',
        doorType: '1',
        doorOther: '',
        head: 3,
        hingeLocation: '1',
        hinge: 2,
        closing: 2,
        threshold: 1,
        doorThickness: 44,
        frameDepth: 110,
        doorSize: 2040,
        fullDoorsetSize: 2100,
        doorPhotos: ['door.jpg'],
      },
      compliance: {
        intumescentStrips: true,
        coldSmokeSeals: true,
        selfClosingDevice: false,
        fireLockedSign: true,
        fireShutSign: false,
        holdOpenDevice: false,
        visibleCertification: true,
        doorGlazing: true,
        pyroGlazing: true,
      },
      actionMenuFlags: {},
      images: {},
      floorPlanImages: ['additional1.jpg'],
    };
  };

  // Handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBasicFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGapsChange = handleFormDataChange;

  const handleComplianceToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setComplianceCheck((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImagesChange = (images: string[], field: string) => {
    console.log('images changed for', field, images);
  };

  const handleImagesChangeMini = handleImagesChange;

  const handleDeleteImages = (index: number, field: string) => {
    console.log(`delete image at ${index} for ${field}`);
  };

  const handleResetAction = (field: string, type: string) => {
    console.log('reset', field, type);
  };

  const handleActionFieldsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    type: string
  ) => {
    console.log('action field changed', field, type, e.target.value);
  };

  const generateQRCode = () => {
    console.log('QR Code generated');
  };

  const handleCancel = () => {
    console.log('Form canceled');
  };

  const handleValidationOnSave = (status: string) => {
    console.log('Save with status:', status);
  };

  return (
    <FormComponent
      isView={isView}
      basicFormData={basicFormData}
      formData={formData}
      complianceCheck={complianceCheck}
      actionmenuFlag={actionmenuFlag}
      actionImages={actionImages}
      floorPlanImages={floorPlanImages}
      resetCaptureFlag={resetCaptureFlag}
      isColdSeals={isColdSeals}
      isGlazing={isGlazing}
      isFireKeepLocked={isFireKeepLocked}
      ShowScanQRCode={ShowScanQRCode}
      doorOtherFlag={doorOtherFlag}
      doorTypesOption={doorTypesOption}
      validationFlag={validationFlag}
      isLoading={isLoading}
      mandatoryFieldRef={mandatoryFieldRef}
      handleChange={handleChange}
      handleFormDataChange={handleFormDataChange}
      handleGapsChange={handleGapsChange}
      handleComplianceToggle={handleComplianceToggle}
      handleImagesChange={handleImagesChange}
      handleImagesChangeMini={handleImagesChangeMini}
      handleDeleteImages={handleDeleteImages}
      handleResetAction={handleResetAction}
      handleActionFieldsChange={handleActionFieldsChange}
      generateQRCode={generateQRCode}
      setShowScanQRCode={setShowScanQRCode}
      handleCancel={handleCancel}
      handleValidationOnSave={handleValidationOnSave}
    />
  );
};

export default ViewSurvey;
