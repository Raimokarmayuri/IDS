// import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
// import "../styles/FormComponents.css";
// import FormComponent from './FormComponent'; // Adjust path if needed
// // ==== INTERFACES ====

// interface BasicFormData {
//   buildingName: string;
//   uniqueRef: string;
//   date: string;
//   location: string;
//   floor: number;
//   floorPlan: string[];
//   comment: string;
// }

// interface FormData {
//   doorNumber: string;
//   doorType: string;
//   doorOther: string;
//   head: number;
//   hingeLocation: string;
//   hinge: number;
//   closing: number;
//   threshold: number;
//   doorThickness: number;
//   frameDepth: number;
//   doorSize: number;
//   fullDoorsetSize: number;
//   doorPhotos: string[];
// }

// interface ComplianceCheck {
//   intumescentStrips: boolean;
//   coldSmokeSeals: boolean;
//   selfClosingDevice: boolean;
//   fireLockedSign: boolean;
//   fireShutSign: boolean;
//   holdOpenDevice: boolean;
//   visibleCertification: boolean;
//   doorGlazing: boolean;
//   pyroGlazing: boolean;
// }

// interface ActionMenuFlag {
//   [key: string]: boolean;
// }

// interface ActionImages {
//   [key: string]: string[];
// }

// interface ViewSurveyProps {
//   doorRefNumber: string;
// }

// // ==== VIEW SURVEY COMPONENT ====

// const ViewSurvey: React.FC<ViewSurveyProps> = ({ doorRefNumber }) => {
//   const [basicFormData, setBasicFormData] = useState<BasicFormData>({
//     buildingName: '',
//     uniqueRef: '',
//     date: '',
//     location: '',
//     floor: 0,
//     floorPlan: [],
//     comment: '',
//   });

//   const [formData, setFormData] = useState<FormData>({
//     doorNumber: '',
//     doorType: '',
//     doorOther: '',
//     head: 0,
//     hingeLocation: '',
//     hinge: 0,
//     closing: 0,
//     threshold: 0,
//     doorThickness: 0,
//     frameDepth: 0,
//     doorSize: 0,
//     fullDoorsetSize: 0,
//     doorPhotos: [],
//   });

//   const [complianceCheck, setComplianceCheck] = useState<ComplianceCheck>({
//     intumescentStrips: false,
//     coldSmokeSeals: false,
//     selfClosingDevice: false,
//     fireLockedSign: false,
//     fireShutSign: false,
//     holdOpenDevice: false,
//     visibleCertification: false,
//     doorGlazing: false,
//     pyroGlazing: false,
//   });

//   const [actionmenuFlag, setActionMenuFlag] = useState<ActionMenuFlag>({});
//   const [actionImages, setActionImages] = useState<ActionImages>({});
//   const [floorPlanImages, setFloorPlanImages] = useState<string[]>([]);
//   const [isView, setIsView] = useState(true);
//   const [doorPhotos, setDoorimages] = useState<string[]>([]);
//   const [ShowScanQRCode, setShowScanQRCode] = useState(false);
//   const [resetCaptureFlag, setResetCaptureFlag] = useState(false);
//   const [isColdSeals, setIsColdSeals] = useState(true);
//   const [isGlazing, setIsGlazing] = useState(true);
//   const [isFireKeepLocked, setIsFireKeepLocked] = useState(true);
//   const [doorOtherFlag, setDoorOtherFlag] = useState(false);
//   const [validationFlag, setValidationFlag] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const [doorTypesOption] = useState([
//     { doorTypeId: 1, doorTypeName: 'Wood' },
//     { doorTypeId: 2, doorTypeName: 'Metal' },
//     { doorTypeId: 99, doorTypeName: 'Other' },
//   ]);

//   const mandatoryFieldRef = useRef<Record<string, HTMLInputElement | null>>({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const response: any = await fetchSurveyDataByRef(doorRefNumber);
//       if (response) {
//         console.log("👉 Door Photos:", response.doorData.doorPhotos); // 🔍 log
//         console.log("👉 Floor Plan:", response.basicInfo.floorPlan); // 🔍 log

//         setBasicFormData(response.basicInfo);
//         setFormData(response.doorData);
//         setComplianceCheck(response.compliance);
//         setActionMenuFlag(response.actionMenuFlags);
//         setActionImages(response.images);
//         setFloorPlanImages(response.floorPlanImages);
//       }
//     };

//     fetchData();
//   }, [doorRefNumber]);

//   // Dummy fetch (replace with your real API call)
//   const fetchSurveyDataByRef = async (ref: string) => {
//     return {
//       basicInfo: {
//         buildingName: 'Sample Building',
//         uniqueRef: 'SB-001',
//         date: '2025-07-29',
//         location: 'Level 3',
//         floor: 3,
//         floorPlan: [],
//         comment: 'Fire door checked.',
//       },
//       doorData: {
//         doorNumber: 'D101',
//         doorType: '1',
//         doorOther: '',
//         head: 3,
//         hingeLocation: '1',
//         hinge: 2,
//         closing: 2,
//         threshold: 1,
//         doorThickness: 44,
//         frameDepth: 110,
//         doorSize: 2040,
//         fullDoorsetSize: 2100,
//         doorPhotos: [],
//       },
//       compliance: {
//         intumescentStrips: true,
//         coldSmokeSeals: true,
//         selfClosingDevice: false,
//         fireLockedSign: true,
//         fireShutSign: false,
//         holdOpenDevice: false,
//         visibleCertification: true,
//         doorGlazing: true,
//         pyroGlazing: true,
//       },
//       actionMenuFlags: {},
//       images: {},
//       floorPlanImages: ['additional1.jpg'],
//     };
//   };

//   // Handlers
//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setBasicFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormDataChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleGapsChange = handleFormDataChange;

//   const handleComplianceToggle = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = e.target;
//     setComplianceCheck((prev) => ({ ...prev, [name]: checked }));
//   };

//   const handleImagesChange = (images: string[], field: string) => {
//     console.log('images changed for', field, images);
//   };

//   const handleImagesChangeMini = handleImagesChange;

//   const handleDeleteImages = (index: number, field: string) => {
//     console.log(`delete image at ${index} for ${field}`);
//   };

//   const handleResetAction = (field: string, type: string) => {
//     console.log('reset', field, type);
//   };

//   const handleActionFieldsChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     field: string,
//     type: string
//   ) => {
//     console.log('action field changed', field, type, e.target.value);
//   };

//   const generateQRCode = () => {
//     console.log('QR Code generated');
//   };

//   const handleCancel = () => {
//     console.log('Form canceled');
//   };

//   const handleValidationOnSave = (status: string) => {
//     console.log('Save with status:', status);
//   };

// //   const getFloorImage = async (floor: number) => {
// //   if (floor !== 0) {
// //     try {
// //       const response = await http.get(
// //         `${GET_FLOORPLAN_IMAGE}propertyMasterID=${propertyId}&floorNo=${floor}`
// //       );
// //       if (!response.status) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const tempImage = response.data;
// //       setIsFloorFromAPI(tempImage !== "");
// //       setBasicFormData((prev) => ({
// //         ...prev,
// //         floor: floor,
// //         floorPlan: tempImage === "" ? [] : [tempImage],
// //       }));

// //       if (mandatoryFieldRef.current.floorFile) {
// //         mandatoryFieldRef.current.floorFile.value =
// //           tempImage === "" ? "" : "Saved Floor Plan";
// //       }

// //       resetIndvidualField("floorFile");
// //     } catch (error) {
// //       console.error("getFloorImage failed", error);
// //       setError(error?.data || "Image fetch failed");
// //     }
// //   } else {
// //     setBasicFormData((prev) => ({
// //       ...prev,
// //       floor: floor,
// //       floorPlan: [],
// //     }));

// //     if (mandatoryFieldRef.current.floorFile) {
// //       mandatoryFieldRef.current.floorFile.value = "";
// //     }
// //   }
// // };

//   return (
//     <FormComponent
//       isView={isView}
//       basicFormData={basicFormData}
//       formData={formData}
//       complianceCheck={complianceCheck}
//       actionmenuFlag={actionmenuFlag}
//       actionImages={actionImages}
//       doorPhotos={formData.doorPhotos}
//       floorPlanImages={floorPlanImages}
//       resetCaptureFlag={resetCaptureFlag}
//       isColdSeals={isColdSeals}
//       isGlazing={isGlazing}
//       isFireKeepLocked={isFireKeepLocked}
//       ShowScanQRCode={ShowScanQRCode}
//       doorOtherFlag={doorOtherFlag}
//       doorTypesOption={doorTypesOption}
//       validationFlag={validationFlag}
//       isLoading={isLoading}
//       mandatoryFieldRef={mandatoryFieldRef}
//       handleChange={handleChange}
//       handleFormDataChange={handleFormDataChange}
//       handleGapsChange={handleGapsChange}
//       handleComplianceToggle={handleComplianceToggle}
//       handleImagesChange={handleImagesChange}
//       handleImagesChangeMini={handleImagesChangeMini}
//       handleDeleteImages={handleDeleteImages}
//       handleResetAction={handleResetAction}
//       handleActionFieldsChange={handleActionFieldsChange}
//       generateQRCode={generateQRCode}
//       setShowScanQRCode={setShowScanQRCode}
//       handleCancel={handleCancel}
//       handleValidationOnSave={handleValidationOnSave}
//     />
//   );
// };

// export default ViewSurvey;

import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, TextInput } from "react-native";
import {
  GET_CLINET_ID_API,
  GET_DOOR_INSPECTION_DATA,
  GET_PROPERTY_INFO_WITH_MASTER,
} from "../api/apiPath";
import http from "../api/server";
import { Statuses, UserRoles } from "../components/common/constants";
// import { formatDateString } from '../utils/dateUtils';
import { ActionImages, ComplianceCheck, FormData } from "../screens/types";
import FormComponent from "./FormComponent";

export const formatDateString = (date: string | Date): string => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

type ComplianceKey =
  | "intumescentStrips"
  | "coldSmokeSeals"
  | "selfClosingDevice"
  | "fireLockedSign"
  | "fireShutSign"
  | "holdOpenDevice"
  | "visibleCertification"
  | "doorGlazing"
  | "pyroGlazing";

const COMPLIANCE_CHECK_MASTER: Record<`${ComplianceKey}Id`, string> = {
  intumescentStripsId: "927da4a9-3c0b-46a7-8fb2-00af566a41e6",
  coldSmokeSealsId: "2d46bbc6-3a52-48ee-ad7d-80c3f3cdf352",
  selfClosingDeviceId: "145baf7e-bcc6-4c8f-b925-070e751ba2d6",
  fireLockedSignId: "942c7963-7d98-49db-a13e-63ee7b4fcfd1",
  fireShutSignId: "b7157137-2bfc-423d-b236-6620c527519b",
  holdOpenDeviceId: "a106ba4e-ef40-4510-851e-09d1315becc5",
  visibleCertificationId: "99ab902f-794a-491b-a6e3-26c8a57f9527",
  doorGlazingId: "1b2886cc-a1a3-4573-a5be-7df68c0db109",
  pyroGlazingId: "c9873267-e600-4c99-bf08-088dee277909",
};

const PropertyDetailsScreen: React.FC<{
  doorRefNumber: string;
  currentURL: string;
  userObj: any;
}> = ({ doorRefNumber, currentURL, userObj }) => {
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [complianceCheck, setComplianceCheck] = useState<ComplianceCheck>(
    {} as ComplianceCheck
  );
  const [actionImages, setActionImages] = useState<ActionImages>(
    {} as ActionImages
  );
  const mandatoryFieldRef = useRef<Record<string, TextInput | null>>({});

  const [propertyId, setPropertyId] = useState<number | null>(null);
  const [isColdSeals, setIsColdSeals] = useState(false);
  const [isGlazing, setIsGlazing] = useState(false);
  const [fireKeepLocked, setFireKeepLocked] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [doorTypesOption, setDoorTypesOption] = useState<any[]>([]);
  const [basicFormData, setBasicFormData] = useState<any>({});
  const [actionMenuFlag, setActionMenuFlag] = useState<any>({});
  const [floorPlanImages, setFloorPlanImages] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInspectionDoorData();
  }, []);

  const fetchInspectionDoorData = async () => {
    try {
      const response = await http.get(GET_DOOR_INSPECTION_DATA + doorRefNumber);
      const dataResponse = response?.data;

      const responseProperty = await http.get(
        GET_PROPERTY_INFO_WITH_MASTER +
          dataResponse.propertyInfo.propertyMasterId
      );
      const userId = userObj?.userId;

      if (!userId) {
        setError("Missing user ID. Please login again.");
        return;
      }
      const responseClient = await http.get(GET_CLINET_ID_API + "/" + userId);
      const role = responseClient?.data?.roleId;

      const propertyResponse = responseProperty?.data;
      console.log("🚪 formData:", formData);
      console.log("🏢 basicFormData:", basicFormData);

      setPropertyId(dataResponse.propertyInfo.propertyMasterId);

      // View permissions
      if (role === UserRoles.APPROVER || role === UserRoles.ADMIN) {
        if (currentURL.includes("viewSurvey")) {
          setIsView(true);
        } else {
          const status = propertyResponse.inspectionPropertyInfo.status;
          setIsView(
            status === Statuses.COMPLETED ||
              status === Statuses.INPROGRESS ||
              status === Statuses.REJECTED
          );
        }
      } else if (role === UserRoles.INSPECTOR) {
        if (currentURL.includes("viewSurvey")) {
          setIsView(true);
        } else {
          const status = propertyResponse.inspectionPropertyInfo.status;
          setIsView(status === Statuses.COMPLETED);
        }
      } else {
        setIsView(true);
      }

      setDoorTypesOption(propertyResponse?.doorTypes);
      setBasicFormData({
        ...basicFormData,
        propertyMasterId: dataResponse.propertyInfo.propertyMasterId,
        buildingName: propertyResponse.propertyMaster.propertyName,
        uniqueRef: propertyResponse.propertyMaster.uniqueRefNo,
        location: propertyResponse.propertyMaster.propertyLocation,
        date: formatDateString(
          dataResponse.inspectedDoorDto.doorInspectionDate
        ),
        floor: dataResponse.inspectedPropertyFloorsInfo.floorNo,
        floorPlan: [dataResponse.inspectedPropertyFloorsInfo.floorPlanImage],
        floorPlanCratedBy: dataResponse.inspectedPropertyFloorsInfo.createdBy,
        comment: dataResponse.physicalMeasurement.comments,
      });

      const fireRatingId = dataResponse.physicalMeasurement.fireRatingID;
      setIsColdSeals(["5", "6", "7"].includes(fireRatingId));

      const newActionImages: ActionImages = { ...actionImages };
      const newCompData: ComplianceCheck = { ...complianceCheck };
      let isFireLocked = false;
      let isGlazingTemp = false;

      const compArr = [
        "intumescentStrips",
        "coldSmokeSeals",
        "selfClosingDevice",
        "fireLockedSign",
        "fireShutSign",
        "pyroGlazing",
      ];

      compArr.forEach((item) => {
        const filterItem = dataResponse.complianceChecks.find(
          (x: any) =>
            x.complianceCheckMasterID ===
            COMPLIANCE_CHECK_MASTER[
              (item + "Id") as keyof typeof COMPLIANCE_CHECK_MASTER
            ]
        );

        if (item === "selfClosingDevice") {
          if (filterItem?.isCompliant) {
            setFireKeepLocked(false);
            isFireLocked = true;
          } else {
            setFireKeepLocked(true);
          }
        }

        newCompData[item] =
          item === "fireLockedSign"
            ? isFireLocked || filterItem?.isCompliant
            : filterItem?.isCompliant;
        newCompData[item + "Timeline"] = filterItem?.actionItem.timeline;
        newCompData[item + "Severity"] = filterItem?.actionItem.severity;
        newCompData[item + "Comments"] = filterItem?.actionItem.comment;
        newCompData[item + "Remediation"] = filterItem?.actionItem.remediation;
        newCompData[item + "Category"] = filterItem?.actionItem.category;
        newCompData[item + "DueDate"] = filterItem?.actionItem?.dueDate
          ? formatDateString(filterItem?.actionItem?.dueDate)
          : "";
        newCompData[item + "Id"] = filterItem?.complianceCheckMasterID;
        newActionImages[item] = filterItem?.actionItem?.photos;
      });

      ["holdOpenDevice", "visibleCertification", "doorGlazing"].forEach(
        (item) => {
          const filterItem = dataResponse.complianceChecks.find(
            (x: any) =>
              x.complianceCheckMasterID ===
              COMPLIANCE_CHECK_MASTER[
                (item + "Id") as keyof typeof COMPLIANCE_CHECK_MASTER
              ]
          );
          newCompData[item] = filterItem?.isCompliant;
          newCompData[item + "Id"] = filterItem?.complianceCheckMasterID;

          if (item === "doorGlazing") {
            if (filterItem?.isCompliant) {
              setIsGlazing(true);
            } else {
              setIsGlazing(false);
              isGlazingTemp = true;
            }
          }
        }
      );

      setComplianceCheck({ ...newCompData });

      setActionMenuFlag({
        head: dataResponse.physicalMeasurement.head.actionItem !== "no",
        hinge: dataResponse.physicalMeasurement.hinge.actionItem !== "no",
        closing: dataResponse.physicalMeasurement.closing.actionItem !== "no",
        threshold:
          dataResponse.physicalMeasurement.threshold.actionItem !== "no",
        intumescentStrips: !newCompData.intumescentStrips,
        coldSmokeSeals: !newCompData.coldSmokeSeals,
        selfClosingDevice: false,
        fireLockedSign: isFireLocked ? false : !newCompData.fireLockedSign,
        fireShutSign: !newCompData.fireShutSign,
        pyroGlazing: isGlazingTemp ? false : !newCompData.pyroGlazing,
      });

      const newFormData: FormData = { ...formData };
      ["head", "hinge", "closing", "threshold"].forEach((item) => {
        const phys = dataResponse.physicalMeasurement[item];
        newFormData[item] = phys?.value;
        newFormData[item + "Timeline"] = phys?.timeline;
        newFormData[item + "Severity"] = phys?.severity;
        newFormData[item + "Comments"] = phys?.comment;
        newFormData[item + "Category"] = phys?.category;
        newFormData[item + "Remediation"] = phys?.remediation;
        newFormData[item + "DueDate"] = phys?.dueDate
          ? formatDateString(phys?.dueDate)
          : "";
        newActionImages[item] = phys?.photos;
      });

      ["doorThickness", "frameDepth", "doorSize", "fullDoorsetSize"].forEach(
        (item) => {
          newFormData[item] = dataResponse.physicalMeasurement[item]?.value;
        }
      );

      newFormData.doorNumber = doorRefNumber;
      newFormData.doorType = dataResponse.inspectedDoorDto.doorTypeId;
      newFormData.doorTypeName = dataResponse.inspectedDoorDto.doorTypeName;
      newFormData.doorOther = dataResponse.inspectedDoorDto.otherDoorTypeName;
      newFormData.doorLocation = dataResponse.inspectedDoorDto.doorLocation;
      newFormData.fireResistance = fireRatingId;
      newFormData.hingeLocation =
        dataResponse.physicalMeasurement.hingePosition;
      newFormData.doorPhotos = [
        dataResponse.inspectedDoorDto.doorPhoto["Image 1 Path"],
      ];

      setFormData({ ...newFormData });
      setFloorPlanImages(dataResponse.additionalInfos[0]?.imagePath);
      setActionImages({ ...newActionImages });
      setIsloading(false);
    } catch (error: any) {
      setError(error?.data || "Unexpected error occurred");
      setIsloading(false);
      console.error("Failed to load inspection data:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {isLoading || !formData.doorNumber ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FormComponent
          isView={isView}
          basicFormData={basicFormData}
          formData={formData}
          complianceCheck={complianceCheck}
          actionmenuFlag={actionMenuFlag}
          actionImages={actionImages}
          doorPhotos={formData.doorPhotos}
          floorPlanImages={floorPlanImages ? [floorPlanImages] : []}
          resetCaptureFlag={false}
          isColdSeals={isColdSeals}
          isGlazing={isGlazing}
          isFireKeepLocked={fireKeepLocked}
          ShowScanQRCode={false}
          doorOtherFlag={formData.doorType === "99"}
          doorTypesOption={doorTypesOption}
          validationFlag={false}
          isLoading={isLoading}
          mandatoryFieldRef={mandatoryFieldRef}
          handleChange={(name, value) => {}}
          handleFormDataChange={(name, value) => {}}
          handleGapsChange={() => {}}
          handleComplianceToggle={() => {}}
          handleImagesChange={() => {}}
          handleImagesChangeMini={() => {}}
          handleDeleteImages={() => {}}
          handleResetAction={() => {}}
          handleActionFieldsChange={() => {}}
          handleFireResistanceChange={() => {}}
          generateQRCode={() => {}}
          setShowScanQRCode={() => {}}
          handleCancel={() => {}}
          handleValidationOnSave={() => {}}
        />
      )}
    </ScrollView>
  );
};

export default PropertyDetailsScreen;
