import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useSelector } from "react-redux";
import {
  GENERATEQRCODE_API,
  GET_NEXT_REF_NUMBER,
  GET_PROPERTY_INFO_WITH_MASTER,
} from "../api/apiPath";
import http from "../api/server";
import QrScanner from "../components/common/QrScanner";
import MiniCapture from "./MiniCapture";

const Dashboard = () => {
  const route = useRoute<any>();
  const { propertyMasterId } = route.params;
  const userObj = useSelector((state: any) => state.user.userObj);
  const [isGlazing, setIsGlazing] = useState<boolean>(false);
  const [doorOtherFlag, setDoorOtherFlag] = useState(false);
  const [doorOptions, setDoorOptions] = useState<DoorTypeOption[]>([]);
  const [loading, setLoading] = useState(true);
  // const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [showScanQRCode, setShowScanQRCode] = useState(false);
  const [loadingQR, setLoadingQR] = useState(false);

  // const [actionImages, setActionImages] = useState<{
  //   [key: string]: { url: string; name: string }[];
  // }>({});

  const [actionImages, setActionImages] = useState<Record<string, string[]>>(
    {}
  );

  const [complianceCheck, setComplianceCheck] = useState({
    intumescentStrips: true, // default Yes
    coldSmokeSeals: true, // default Yes if shown
    selfClosingDevice: true,
    fireLockedSign: true,
    fireShutSign: true,
    holdOpenDevice: true,
    visibleCertification: true,
    doorGlazing: true,
    pyroGlazing: true,
  });

  const [basicInfo, setBasicInfo] = useState({
    buildingName: "",
    uniqueRef: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
    floor: "",
    floorPlan: "",
  });

  type FormData = {
    doorNumber: string;
    doorType: string;
    doorTypeName: string;
    doorOther: string;
    doorPhoto: string;
    fireResistance: string;
    head: string;
    hingeLocation: string;
    hinge: string;
    closing: string;
    threshold: string;
    doorThickness: string;
    frameDepth: string;
    doorSize: string;
    fullDoorsetSize: string;
  };

  const [formData, setFormData] = useState<FormData>({
    doorNumber: "",
    doorType: "",
    doorTypeName: "",
    doorOther: "",
    doorPhoto: "",
    fireResistance: "",
    head: "",
    hingeLocation: "Select",
    hinge: "",
    closing: "",
    threshold: "",
    doorThickness: "",
    frameDepth: "",
    doorSize: "",
    fullDoorsetSize: "",
  });
  type FormDataKey = keyof FormData;

  const key: FormDataKey = "doorNumber"; // Example, adjust accordingly

  //   const [actionmenuFlag, setActionMenuFlag] = useState({
  //   head: false,
  //   hinge: false,
  //   closing: false,
  //   threshold: false,
  //   doorThickness: false,
  //   frameDepth: false,
  //   doorSize: false,
  //   fullDoorsetSize: false
  // });

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date) => {
    // Format to DD/MM/YYYY
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false); // Hide calendar after selection
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const [isColdSeals, setIsColdSeals] = useState(false);
  const [actionmenuFlag, setActionMenuFlag] = useState<{
    [key: string]: boolean;
  }>({
    head: false,
    hinge: false,
    closing: false,
    threshold: false,
    doorThickness: false,
    frameDepth: false,
    doorSize: false,
    fullDoorsetSize: false,
  });

  const resetCaptureFlag = false;
  // const mandatoryFieldRef = useRef({});

  type DoorTypeOption = {
    doorTypeId: string;
    doorTypeName: string;
  };

  useEffect(() => {
    if (userObj && propertyMasterId) {
      fetchInitialData();
    }
    setDoorOptions([
      { doorTypeId: "1", doorTypeName: "Fire Door" },
      { doorTypeId: "2", doorTypeName: "Steel Door" },
      { doorTypeId: "3", doorTypeName: "Wooden Door" },
      { doorTypeId: "4", doorTypeName: "Other" },
    ]);
  }, [userObj, propertyMasterId]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const propRes = await http.get(
        `${GET_PROPERTY_INFO_WITH_MASTER}${propertyMasterId}`
      );
      const refRes = await http.get(
        `${GET_NEXT_REF_NUMBER}${propertyMasterId}/${userObj.userId}`
      );

      const property = propRes.data.propertyMaster;
      const nextRef = refRes.data.nextRefNumber;

      const initials = (str: string) =>
        str
          .split(" ")
          .filter(Boolean)
          .map((w: string) => w[0].toUpperCase())
          .join("");

      const doorRef = `${initials(userObj.userName)}-${initials(
        property.propertyName
      )}-DRN-${String(nextRef).padStart(4, "0")}`;

      setBasicInfo((prev) => ({
        ...prev,
        buildingName: property.propertyName,
        uniqueRef: property.uniqueRefNo,
        location: property.propertyLocation,
      }));

      setFormData((prev) => ({
        ...prev,
        doorNumber: doorRef,
      }));
    } catch (e) {
      console.error("Failed to load property details:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleComplianceToggle = (name: string, value: boolean) => {
    setComplianceCheck((prev: any) => ({ ...prev, [name]: value }));
    if (name === "doorGlazing") {
      setIsGlazing(value);
    }
    setActionMenuFlag((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFormDataChange = (name: string, value: string) => {
    if (name === "doorType") {
      const selectedType = doorOptions.find((opt) => opt.doorTypeId === value);
      const selectedName = selectedType?.doorTypeName || "";

      setFormData((prev) => ({
        ...prev,
        doorType: value,
        doorTypeName: selectedName,
      }));

      setDoorOtherFlag(selectedName === "Other");
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const pickImage = async (type: "floorPlan" | "doorPhoto") => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 0.6 });
    if (!result.canceled && result.assets[0].uri) {
      const uri = result.assets[0].uri;
      if (type === "floorPlan") {
        setBasicInfo((prev) => ({ ...prev, floorPlan: uri }));
      } else {
        setFormData((prev) => ({ ...prev, doorPhoto: uri }));
      }
    }
  };

  const BASE_MEASURES: { [key: string]: number } = {
    head: 3,
    hinge: 3,
    closing: 3,
    threshold: 3,
  };

  const handleFireResistanceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      fireResistance: value,
    }));

    const thresholdVal = Number(formData.threshold);

    if (value === "1") {
      setActionMenuFlag({
        threshold: !!formData.threshold && thresholdVal < 10,
      });
    } else {
      setActionMenuFlag({
        threshold:
          !!formData.threshold && thresholdVal !== BASE_MEASURES.threshold,
      });
    }

    if (["5", "6", "7"].includes(value)) {
      setIsColdSeals(true);
    } else {
      setIsColdSeals(false);
    }
  };

  const handleGapsChange = (name: string, value: string) => {
    resetIndividualField(name); // currently a placeholder

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const numericValue = parseFloat(value);
    const threshold = BASE_MEASURES[name];

    if (name === "threshold") {
      if (formData.fireResistance === "1") {
        setActionMenuFlag((prev) => ({
          ...prev,
          [name]: numericValue < 10,
        }));
      } else {
        setActionMenuFlag((prev) => ({
          ...prev,
          [name]: numericValue > threshold,
        }));
      }
    } else {
      setActionMenuFlag((prev) => ({
        ...prev,
        [name]: numericValue > threshold,
      }));
    }
  };

  const handleImagesChangeMini = async (
    newImages: string[],
    field: string
  ): Promise<void> => {
    const imgArr = actionImages[field] || [];
    const combined = [...imgArr, ...newImages];

    setActionImages((prev) => ({
      ...prev,
      [field]: combined,
    }));
  };

  const handleResetAction = (
    field: string,
    section: "PHYSICAL" | "COMPLIANCE"
  ) => {
    const fieldKeys = [
      "Timeline",
      "Severity",
      "Comments",
      "Category",
      "DueDate",
      "Remediation",
    ];
    const resetFields = Object.fromEntries(
      fieldKeys.map((key) => [
        `${field}${key}`,
        key === "Comments" ? "" : "Select",
      ])
    );

    if (section === "PHYSICAL") {
      setFormData((prev) => ({
        ...prev,
        ...resetFields,
      }));
    } else if (section === "COMPLIANCE") {
      setComplianceCheck((prev) => ({
        ...prev,
        ...resetFields,
      }));
    }
  };

  const removeSpecialCharacters = (input: string) => {
    return input.replace(/[^a-zA-Z0-9 !?.,"'() & :; -]/g, ""); // Keeps letters, numbers, and spaces
  };

  // const mandatoryFieldRef = useRef({});
  // const mandatoryFieldRef = useRef<Record<string, TextInput | null>>({
  //   hingeLocation: null,
  // });
  const mandatoryFieldRef = useRef<Record<string, TextInput | null>>({});

  const resetIndividualField = (field: string | number) => {
    mandatoryFieldRef.current[field] != null
      ? mandatoryFieldRef.current[field]
      : null;
  };

  const handleActionFieldsChange = (
    e: any,
    field: string,
    section: "PHYSICAL" | "COMPLIANCE"
  ) => {
    resetIndividualField(e.target.name);
    const name = `${field}${e.target.name}`;
    const value =
      e.target.name === "Comments"
        ? removeSpecialCharacters(e.target.value)
        : e.target.value;

    if (section === "PHYSICAL") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setComplianceCheck({
        ...complianceCheck,
        [name]: value,
      });
    }
  };

//   const getSeverityDate = (sev: React.ChangeEvent<HTMLInputElement>): string => {
//   switch (sev.target.value) {
//     case "1":
//       return new Date().toISOString().split("T")[0];
//     case "2":
//       return new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0];
//     case "3":
//       return new Date(new Date().setDate(new Date().getDate() + 90)).toISOString().split("T")[0];
//     case "4":
//       return new Date(new Date().setDate(new Date().getDate() + 180)).toISOString().split("T")[0];
//     default:
//       return new Date().toISOString().split("T")[0];
//   }
// };

// const handleActionFieldsChange = (
//   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
//   field: string,
//   section: "PHYSICAL" | "COMPLIANCE"
// ) => {
//   resetIndividualField(e.target.name);

//   const baseName = e.target.name;
//   const name = `${baseName}${field}`;
//   let value: string = e.target.value;
//   let severityDueDate = "";

//   if (field === "Comments") {
//     value = removeSpecialCharacters(value);
//   }

//   if (field === "Severity") {
//     severityDueDate = getSeverityDate(e);
//   }

//   if (field === "Category") {
//     const isReplacement = value === "5";
//     const remediationText = isReplacement
//       ? "Remediation - Fire Door Replacement required"
//       : "";

//     if (section === "PHYSICAL") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//         [`${baseName}Remediation`]: remediationText,
//       }));
//     } else {
//       setComplianceCheck((prev) => ({
//         ...prev,
//         [name]: value,
//         [`${baseName}Remediation`]: remediationText,
//       }));
//     }
//   } else {
//     if (section === "PHYSICAL") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//         ...(field === "Severity" && {
//           [`${baseName}DueDate`]: severityDueDate,
//         }),
//       }));
//     } else {
//       setComplianceCheck((prev) => ({
//         ...prev,
//         [name]: value,
//         ...(field === "Severity" && {
//           [`${baseName}DueDate`]: severityDueDate,
//         }),
//       }));
//     }
//   }
// };


  const handleDeleteImages = (index: number, field: string) => {
    const imgArr = actionImages[field];
    const imageToDelete = imgArr[index];
    const updatedImages = imgArr.filter((_, i) => i !== index);

    setActionImages({
      ...actionImages,
      [field]: updatedImages,
    });

    // Optional: call delete API if needed
    // deleteImageAPI(imageToDelete);
  };

  const [qrCodeImage, setQrCodeImage] = useState<string>("");
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const generateQRCode = async () => {
    try {
      setShowLoader(true);
      const doorLink = `${window.location.origin}/editSurvey/${formData.doorNumber}`;
      const res = await http.get(`${GENERATEQRCODE_API}${doorLink}`);

      if (res.data && res.data.qrCode) {
        setQrCodeImage(res.data.qrCode); // ✅ base64 string
      } else {
        console.warn("QR code not found in response");
      }
    } catch (err) {
      console.error("QR generation error:", err);
    } finally {
      setShowLoader(false);
      setShowModal(true);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <Text style={styles.label}>Building Name</Text>
          <TextInput
            style={styles.input}
            value={basicInfo.buildingName}
            editable={false}
          />

          <Text style={styles.label}>Unique Building Reference</Text>
          <TextInput
            style={styles.input}
            value={basicInfo.uniqueRef}
            editable={false}
          />

          {/* <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={basicInfo.date}
            editable={false}
          /> */}
           <Text style={{ marginBottom: 5 }}>Date</Text>

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            height: 45,
            backgroundColor: "#fff",
          }}
          value={formatDate(date)}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            multiline
            value={basicInfo.location}
            editable={false}
          />

          <Text style={styles.label}>Floor*</Text>
          <TextInput
            style={styles.input}
            value={basicInfo.floor}
            onChangeText={(text) =>
              setBasicInfo((prev) => ({ ...prev, floor: text }))
            }
          />

          <Text style={styles.label}>Upload Floor Plan*</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pickImage("floorPlan")}
          >
            <Text>Choose File</Text>
            <Text style={styles.cameraIcon}>📷</Text>
          </TouchableOpacity>
          {basicInfo.floorPlan && (
            <Image
              source={{ uri: basicInfo.floorPlan }}
              style={styles.preview}
            />
          )}

          <Text style={styles.label}>Door Number</Text>
          <TextInput
            style={styles.input}
            value={formData.doorNumber}
            editable={false}
          />

          <Text style={styles.label}>Door Type*</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.doorType}
              onValueChange={(value) => handleFormDataChange("doorType", value)}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              {doorOptions.map((opt) => (
                <Picker.Item
                  key={opt.doorTypeId}
                  label={opt.doorTypeName}
                  value={opt.doorTypeId}
                />
              ))}
            </Picker>
          </View>

          {doorOtherFlag && (
            <>
              <Text style={styles.label}>Other Door Type*</Text>
              <TextInput
                style={styles.input}
                value={formData.doorOther}
                onChangeText={(t) =>
                  setFormData((prev) => ({ ...prev, doorOther: t }))
                }
              />
            </>
          )}

          <Text style={styles.label}>Upload Door Photo*</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pickImage("doorPhoto")}
          >
            <Text>Choose File</Text>
            <Text style={styles.cameraIcon}>📷</Text>
          </TouchableOpacity>
          {formData.doorPhoto && (
            <Image
              source={{ uri: formData.doorPhoto }}
              style={styles.preview}
            />
          )}
        </View>

        {/* QR CODE SECTION */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>QR Code</Text>

          <TouchableOpacity style={styles.button} onPress={generateQRCode}>
            <Text>Generate QR Code</Text>
          </TouchableOpacity>
          {loadingQR && <ActivityIndicator style={{ marginTop: 10 }} />}
          {showLoader ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            qrCodeImage && (
              <Image
                source={{ uri: qrCodeImage }}
                style={{
                  height: 200,
                  width: 200,
                  alignSelf: "center",
                  marginTop: 20,
                }}
              />
            )
          )}

          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={() => setShowScanQRCode((prev) => !prev)}
          >
            <Text>{showScanQRCode ? "Close QR Scanner" : "Scan QR Code"}</Text>
          </TouchableOpacity>

          {showScanQRCode && (
            <View style={{ height: 400 }}>
              <QrScanner />
            </View>
          )}
        </View>

        <Text style={styles.label}>Fire Rating and Certification*</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formData.fireResistance}
            onValueChange={(value) => handleFireResistanceChange(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="FD30" value="1" />
            <Picker.Item label="FD60" value="2" />
            <Picker.Item label="FD90" value="3" />
            <Picker.Item label="FD120" value="4" />
            <Picker.Item label="FD30S" value="5" />
            <Picker.Item label="FD60S" value="6" />
            <Picker.Item label="FD90S" value="7" />
            <Picker.Item label="FD120S" value="8" />
          </Picker>
        </View>
        {/* Physical Measurements Section */}
        {[
          { key: "head", label: "Head (mm)" },
          { key: "hinge", label: "Hinge (mm)" },
          { key: "closing", label: "Closing (mm)" },
          { key: "threshold", label: "Threshold (mm)" },
          { key: "doorThickness", label: "Door Thickness (mm)" },
          { key: "frameDepth", label: "Frame Depth (mm)" },
          { key: "doorSize", label: "Door Size (mm)" },
          { key: "fullDoorsetSize", label: "Full Doorset Size (mm)" },
        ].map(({ key, label }) => (
          <View key={key}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>
                {label} <Text style={{ color: "red" }}>*</Text>
              </Text>

              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={formData[key as FormDataKey]}
                onChangeText={(val) => {
                  const filteredVal = val.replace(/[-eE]/g, "");
                  handleGapsChange(key, filteredVal);
                }}
                placeholder={label}
                ref={(ref) => {
                  if (ref) mandatoryFieldRef.current[key] = ref;
                }}
              />

              {actionmenuFlag[key] && (
                <View style={styles.captureBox}>
                  <MiniCapture
                    fieldValue={key}
                    formData={formData}
                    onImagesChange={(images) =>
                      handleImagesChangeMini(images, key)
                    }
                    onResetChange={() => handleResetAction(key, "PHYSICAL")}
                    onHandleActionFieldsChange={(val, type) =>
                      handleActionFieldsChange(
                        { target: { name: type, value: val } },
                        key,
                        "PHYSICAL"
                      )
                    }
                    onImageDelete={(index) => handleDeleteImages(index, key)}
                    reset={resetCaptureFlag}
                    mandatoryFieldRef={mandatoryFieldRef}
                    isView={false}
                    savedImages={[]}
                  />
                </View>
              )}
            </View>

            {/* 👇 Add hingeLocation Picker just after 'head' field */}
            {key === "head" && (
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>
                  Hinge Location <Text style={{ color: "red" }}>*</Text>
                </Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={formData.hingeLocation}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, hingeLocation: value }))
                    }
                    style={styles.picker}
                  >
                    <Picker.Item label="Select" value="Select" />
                    <Picker.Item label="Left" value="1" />
                    <Picker.Item label="Right" value="2" />
                  </Picker>
                </View>
              </View>
            )}
          </View>
        ))}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Compliance Check</Text>

          {(() => {
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
            const complianceItems: {
              key: ComplianceKey;
              label: string;
              show?: boolean;
            }[] = [
              {
                key: "intumescentStrips",
                label: "Are there intumescent strips?",
              },
              {
                key: "coldSmokeSeals",
                label: "Are there cold smoke seals?",
                show:
                  formData.fireResistance === "5" ||
                  formData.fireResistance === "6" ||
                  formData.fireResistance === "7",
              },
              { key: "selfClosingDevice", label: "Self closing device?" },
              { key: "fireLockedSign", label: "Fire door Keep Locked sign?" },
              { key: "fireShutSign", label: "Fire door Keep Shut sign?" },
              { key: "holdOpenDevice", label: "Is there a hold open device?" },
              {
                key: "visibleCertification",
                label: "Is certification visible on fire door?",
              },
              { key: "doorGlazing", label: "Does the door contain glazing?" },
              {
                key: "pyroGlazing",
                label: "Is glazing pyro glazing?",
                show: isGlazing,
              },
            ];
            return complianceItems
              .filter((item) => item.show === undefined || item.show)
              .map(({ key, label }) => (
                <View key={key} style={styles.complianceRow}>
                  <Text style={styles.label}>{label}</Text>
                  <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>N</Text>
                    <Switch
                      value={!!complianceCheck[key]}
                      onValueChange={(val) => handleComplianceToggle(key, val)}
                    />
                    <Text style={styles.switchLabel}>Y</Text>
                  </View>
                </View>
              ));
          })()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  captureBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#222",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
    color: "#333",
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
    fontSize: 20,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    minHeight: 70,
    textAlignVertical: "top",
    marginTop: 10,
    fontSize: 20,
  },
  complianceForm: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  preview: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 6,
  },
  button: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cameraIcon: {
    marginLeft: 8,
    fontSize: 20,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
    height: 48,
    justifyContent: "center",
  },
  inputWrapper: {
    marginBottom: 12,
  },
  picker: {
    height: 48,
    paddingHorizontal: 10,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 6,
  },
  switchLabel: {
    fontSize: 20,
  },
  complianceRow: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
});

export default Dashboard;
