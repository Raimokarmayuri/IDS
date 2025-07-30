import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import React, { ChangeEvent } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import QrScanner from "../components/common/QrScanner";
import "../styles/FormComponents.css";
import Capture from "./Capture";
import MiniCapture from "./MiniCapture";
import {
    ActionImages,
    ActionMenuFlag,
    BasicFormData,
    ComplianceCheck,
    FormData,
} from "./types"; // adjust import if needed

export interface FormProps {
  isView: boolean;
  basicFormData: BasicFormData;
  formData: FormData;
  complianceCheck: ComplianceCheck;
  actionmenuFlag: ActionMenuFlag;
  actionImages: ActionImages;
  floorPlanImages: string[];
  resetCaptureFlag: boolean;
  isColdSeals: boolean;
  isGlazing: boolean;
  isFireKeepLocked: boolean;
  ShowScanQRCode: boolean;
  doorOtherFlag: boolean;
  doorTypesOption: { doorTypeId: number; doorTypeName: string }[];
  validationFlag: boolean;
  isLoading: boolean;
  mandatoryFieldRef: React.MutableRefObject<Record<string, TextInput | null>>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFormDataChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleGapsChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleComplianceToggle: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImagesChange: (images: string[], field: string) => void;
  handleImagesChangeMini: (images: string[], field: string) => void;
  handleDeleteImages: (index: number, field: string) => void;
  handleResetAction: (field: string, type: string) => void;
  handleActionFieldsChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    type: string
  ) => void;
  handleFireResistanceChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  generateQRCode: () => void;
  setShowScanQRCode: (show: boolean) => void;
  handleCancel: () => void;
  handleValidationOnSave: (status: string) => void;
}

const FormComponent: React.FC<FormProps> = ({
  isView,
  basicFormData,
  formData,
  complianceCheck,
  actionmenuFlag,
  actionImages,
  floorPlanImages,
  resetCaptureFlag,
  isColdSeals,
  isGlazing,
  isFireKeepLocked,
  ShowScanQRCode,
  doorOtherFlag,
  doorTypesOption,
  validationFlag,
  isLoading,
  mandatoryFieldRef,
  handleChange,
  handleFormDataChange,
  handleGapsChange,
  handleComplianceToggle,
  handleImagesChange,
  handleImagesChangeMini,
  handleDeleteImages,
  handleResetAction,
  handleActionFieldsChange,
  handleFireResistanceChange,
  generateQRCode,
  setShowScanQRCode,
  handleCancel,
  handleValidationOnSave,
}) => {

      const navigation = useNavigation();
    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <form className="row m-0"> */}
        {/* Column 1: Basic Info and Door Info */}
        <View style={styles.card}>
          {/* <div className="col-12 col-sm-6 col-lg-4 mb-3">
        <div className="card">
          <div className="card-body"> */}
          {/* Basic Information */}
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <Text style={styles.label}>Building Name</Text>
          <TextInput
            style={styles.input}
            value={basicFormData.buildingName}
            editable={false}
          />

          {/* <Text style={styles.label}>Building Name</Text> */}
          <Text style={styles.label}>Unique Building Reference</Text>

          {/* <div className="form-floating mb-3"> */}
          <TextInput
            style={styles.input}
            //   disabled
            //   placeholder="JN1234"
            value={basicFormData.uniqueRef}
          />

          {/* </div> */}
          <Text style={styles.label}>Date</Text>

          {/* <div className="form-floating mb-3"> */}
          <TextInput
            style={styles.input}
            //   className="form-control"
            //   id="date"
            //   name="date"
            //   disabled={isView}
            value={basicFormData.date}
            //   onChange={handleChange}
          />
          {/* </div> */}

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            //   className="form-control"
            //   rows={5}
            //   disabled
            //   placeholder="Location"
            //   id="location"
            //   name="location"
            //   onChange={handleChange}
            value={basicFormData.location}
            //   style={{ minHeight: "auto", height: "auto" }}
          />

          <Text style={styles.label}>
            Floor <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            ref={(el) => {
              mandatoryFieldRef.current.floor = el;
            }}
            style={styles.input}
            keyboardType="numeric"
            value={basicFormData.floor}
            onChangeText={(text) =>
              handleChange({ target: { name: "floor", value: text } })
            }
            editable={!isView}
          />

          {/* <div className="form-floating mb-3">
            <div className="d-flex gap-3 flex-wrap"> */}
          <Text style={styles.label}> Floor Plan</Text>
          <span style={{ color: "red" }}>*</span>

          <Capture
            isView={isView}
            savedImages={basicFormData.floorPlan}
            onImagesChange={(images) => handleImagesChange(images, "Floor")}
            reset={resetCaptureFlag}
            onImageDelete={(index) => handleDeleteImages(index, "Floor")}
            mandatoryFieldRef={mandatoryFieldRef}
            fieldValue={"floorFile"}
            singleImageCapture
          />
          {/* </div>
          </div> */}

          {/* Door Section */}
          <Text style={styles.label}>Door Number</Text>
          {/* <div className="col-sm-12 mb-3 border p-3 rounded"> */}
          {/* <div className="form-floating mb-3"> */}
          <TextInput
            style={styles.input}
            value={formData.doorNumber}
            editable={false}
          />

          {/* </div> */}
          <Text style={styles.label}>Door Type*</Text>
          {/* <div className="form-floating mb-3"> */}
          <Picker
            ref={(el) => (mandatoryFieldRef.current.doorType = el)}
            className="form-select"
            name="doorType"
            id="doorType"
            value={formData.doorType}
            onChange={handleFormDataChange}
            disabled={isView}
          >
            <option value="">Select</option>
            {doorTypesOption.map((type) => (
              <option key={type.doorTypeId} value={type.doorTypeId}>
                {type.doorTypeName}
              </option>
            ))}
          </Picker>

          {/* </div> */}

          {doorOtherFlag && (
            <>
              <Text style={styles.label}>Other Door Type*</Text>
              <TextInput
                style={styles.input}
                disabled={isView}
                type="text"
                ref={(el) => (mandatoryFieldRef.current.doorOther = el)}
                className="form-control"
                id="doorOther"
                name="doorOther"
                value={formData.doorOther}
              />
            </>
          )}

          {/* <div className="form-floating mb-3">
              <div className="d-flex gap-3 flex-wrap"> */}
          <Text style={styles.label}>Upload Door Photo*</Text>
          <Capture
            savedImages={formData.doorPhotos}
            isView={isView}
            onImagesChange={(images) => handleImagesChange(images, "Door")}
            reset={resetCaptureFlag}
            onImageDelete={(index) => handleDeleteImages(index, "Door")}
            mandatoryFieldRef={mandatoryFieldRef}
            fieldValue={"doorFile"}
            singleImageCapture
          />
          {/* </div>
            </div> */}

          <div className="col-sm-12">
            <div className="d-flex gap-3 flex-wrap">
              <button
                disabled={isView}
                type="button"
                className="btn btn-secondary flex-grow-1"
                onClick={generateQRCode}
              >
                Generate QR Code
              </button>
              <button
                disabled={isView}
                type="button"
                className="btn btn-secondary flex-grow-1"
                onClick={() => setShowScanQRCode(!ShowScanQRCode)}
              >
                {ShowScanQRCode ? "Close Scan QR Code" : "Scan QR Code"}
              </button>
              {ShowScanQRCode && <QrScanner renderInComponent />}
            </div>
          </div>
          {/* </div> */}
          {/* </div>
        </div>
      </div> */}
        </View>

        {/* Column 2: Fire Rating and Physical Measurements */}
        {/* <div className="col-12 col-sm-6 col-lg-4 mb-3"> */}
          {/* Fire Rating Card */}
          {/* <div className="card mb-4">
            <div className="card-body"> */}
              <Text style={styles.label}>Fire Rating and Certification*</Text>{" "}
              <View style={styles.pickerWrapper}>
                <select
                  className="form-select"
                  disabled={isView}
                  id="fireResistance"
                  value={(formData as any).fireResistance}
                  onChange={handleFireResistanceChange}
                >
                  <option value="">Select</option>
                  <option value="1">FD30</option>
                  <option value="2">FD60</option>
                  <option value="3">FD90</option>
                  <option value="4">FD120</option>
                  <option value="5">FD30S</option>
                  <option value="6">FD60S</option>
                  <option value="7">FD90S</option>
                  <option value="8">FD120S</option>
                </select>
                {/* <label htmlFor="fireResistance">Fire Resistance</label> */}
               
              </View>
            {/* </div>
          </div> */}

          {/* Physical Measurements Card */}
          {/* <div className="card">
            <div className="card-body"> */}
              <Text style={styles.label}>Physical Measurements – Gaps</Text>

              {/* Head */}
              {/* <div className="form-floating mb-3"> */}
              <Text style={styles.label}>
                  Head(mm)<span style={{ color: "red" }}>*</span>
                </Text>
                <TextInput
                  type="number"
                    style={styles.input}
                  inputMode="decimal"
                  pattern="[0-9]*"
                  onKeyDown={(e) => {
                    if (["-", "e"].includes(e.key)) e.preventDefault();
                  }}
                  disabled={isView}
                  className="form-control"
                  id="head"
                  name="head"
                  ref={(el) => (mandatoryFieldRef.current.head = el)}
                  placeholder="Head(mm)"
                  value={formData.head}
                  onChange={handleGapsChange}
                  min={0}
                />
               
              {/* </div> */}
              {actionmenuFlag.head && (
                <MiniCapture
                  isView={isView}
                  fieldValue="head"
                  savedImages={actionImages.head}
                  formData={formData}
                  onImagesChange={(images) =>
                    handleImagesChangeMini(images, "head")
                  }
                  onResetChange={() => handleResetAction("head", "PHYSICAL")}
                  onHandleActionFieldsChange={(e, field) =>
                    handleActionFieldsChange(e, field, "PHYSICAL")
                  }
                  onImageDelete={(index) => handleDeleteImages(index, "head")}
                  reset={resetCaptureFlag}
                  mandatoryFieldRef={mandatoryFieldRef}
                />
              )}

              {/* Hinge Location */}
               <Text style={styles.label}>
                  Hinge Location<span style={{ color: "red" }}>*</span>
                </Text>
             
              {/* <div className="form-floating mb-3"> */}
                <Picker
                  className="form-select"
                  name="hingeLocation"
                  ref={(el) => (mandatoryFieldRef.current.hingeLocation = el)}
                  disabled={isView}
                  id="hingeLocation"
                  value={formData.hingeLocation}
                  onChange={handleFormDataChange}
                >
                  <option value="">Select</option>
                  <option value="1">Left</option>
                  <option value="2">Right</option>
                </Picker>
                
              {/* </div> */}

              {/* Hinge */}
               <Text style={styles.label}>
                  Hinge(mm)<span style={{ color: "red" }}>*</span>
                </Text>
             
                <TextInput
                style={styles.input}
                  type="number"
                  pattern="[0-9]*"
                  inputMode="decimal"
                  onKeyDown={(e) => {
                    if (["-", "e"].includes(e.key)) e.preventDefault();
                  }}
                  disabled={isView}
                  className="form-control"
                  id="hinge"
                  name="hinge"
                  ref={(el) => (mandatoryFieldRef.current.hinge = el)}
                  placeholder="Hinge(mm)"
                  value={formData.hinge}
                  onChange={handleGapsChange}
                  min={0}
                />
                
              {actionmenuFlag.hinge && (
                <MiniCapture
                  isView={isView}
                  mandatoryFieldRef={mandatoryFieldRef}
                  fieldValue="hinge"
                  savedImages={actionImages.hinge}
                  formData={formData}
                  onImagesChange={(images) =>
                    handleImagesChangeMini(images, "hinge")
                  }
                  onResetChange={() => handleResetAction("hinge", "PHYSICAL")}
                  onHandleActionFieldsChange={(e, field) =>
                    handleActionFieldsChange(e, field, "PHYSICAL")
                  }
                  onImageDelete={(index) => handleDeleteImages(index, "hinge")}
                  reset={resetCaptureFlag}
                />
              )}

              {/* Closing */}
               <Text style={styles.label}>
                   Closing(mm)<span style={{ color: "red" }}>*</span>
                </Text>
                <TextInput
                style={styles.input}
                  type="number"
                  pattern="[0-9]*"
                  inputMode="decimal"
                  onKeyDown={(e) => {
                    if (["-", "e"].includes(e.key)) e.preventDefault();
                  }}
                  disabled={isView}
                  className="form-control"
                  id="closing"
                  name="closing"
                  ref={(el) => (mandatoryFieldRef.current.closing = el)}
                  placeholder="Closing(mm)"
                  value={formData.closing}
                  onChange={handleGapsChange}
                  min={0}
                />
                
              {actionmenuFlag.closing && (
                <MiniCapture
                  isView={isView}
                  mandatoryFieldRef={mandatoryFieldRef}
                  fieldValue="closing"
                  savedImages={actionImages.closing}
                  formData={formData}
                  onImagesChange={(images) =>
                    handleImagesChangeMini(images, "closing")
                  }
                  onResetChange={() => handleResetAction("closing", "PHYSICAL")}
                  onHandleActionFieldsChange={(e, field) =>
                    handleActionFieldsChange(e, field, "PHYSICAL")
                  }
                  onImageDelete={(index) =>
                    handleDeleteImages(index, "closing")
                  }
                  reset={resetCaptureFlag}
                />
              )}

              {/* Threshold */}
              <Text style={styles.label}>
                  Threshold(mm)<span style={{ color: "red" }}>*</span>
                </Text>
                <TextInput
                style={styles.input}
                  type="number"
                  pattern="[0-9]*"
                  inputMode="decimal"
                  onKeyDown={(e) => {
                    if (["-", "e"].includes(e.key)) e.preventDefault();
                  }}
                  disabled={isView}
                  className="form-control"
                  id="threshold"
                  name="threshold"
                  ref={(el) => (mandatoryFieldRef.current.threshold = el)}
                  placeholder="Threshold(mm)"
                  value={formData.threshold}
                  onChange={handleGapsChange}
                  min={0}
                />
               
              {actionmenuFlag.threshold && (
                <MiniCapture
                  isView={isView}
                  mandatoryFieldRef={mandatoryFieldRef}
                  fieldValue="threshold"
                  savedImages={actionImages.threshold}
                  formData={formData}
                  onImagesChange={(images) =>
                    handleImagesChangeMini(images, "threshold")
                  }
                  onResetChange={() =>
                    handleResetAction("threshold", "PHYSICAL")
                  }
                  onHandleActionFieldsChange={(e, field) =>
                    handleActionFieldsChange(e, field, "PHYSICAL")
                  }
                  onImageDelete={(index) =>
                    handleDeleteImages(index, "threshold")
                  }
                  reset={resetCaptureFlag}
                />
              )}

              {/* Thickness, Frame Depth, Door Size, Full Doorset Size */}
              <Text style={styles.label}>
                  Door Thickness(mm)<span style={{ color: "red" }}>*</span>
                </Text>
                <TextInput
                style={styles.input}
                  type="number"
                  pattern="[0-9]*"
                  inputMode="decimal"
                  onKeyDown={(e) => {
                    if (["-", "e"].includes(e.key)) e.preventDefault();
                  }}
                  disabled={isView}
                  className="form-control"
                  id="doorThickness"
                  name="doorThickness"
                  ref={(el) => (mandatoryFieldRef.current.doorThickness = el)}
                  placeholder="Door Thickness(mm)"
                  value={formData.doorThickness}
                  onChange={handleFormDataChange}
                  min={0}
                />
              

              <Text style={styles.label}>
                 Frame Depth(mm)<span style={{ color: "red" }}>*</span>
                </Text>
                <TextInput
                style={styles.input}
                  type="number"
                  pattern="[0-9]*"
                  inputMode="decimal"
                  onKeyDown={(e) => {
                    if (["-", "e"].includes(e.key)) e.preventDefault();
                  }}
                  disabled={isView}
                  className="form-control"
                  id="frameDepth"
                  name="frameDepth"
                  ref={(el) => (mandatoryFieldRef.current.frameDepth = el)}
                  placeholder="Frame Depth(mm)"
                  value={formData.frameDepth}
                  onChange={handleFormDataChange}
                  min={0}
                />
              

              <Text style={styles.label}>
                 Door Size(mm)<span style={{ color: "red" }}>*</span>
                </Text>
                <TextInput
                style={styles.input}
                  type="number"
                  pattern="[0-9]*"
                  inputMode="decimal"
                  onKeyDown={(e) => {
                    if (["-", "e"].includes(e.key)) e.preventDefault();
                  }}
                  disabled={isView}
                  className="form-control"
                  id="doorSize"
                  name="doorSize"
                  ref={(el) => (mandatoryFieldRef.current.doorSize = el)}
                  placeholder="Door Size(mm)"
                  value={formData.doorSize}
                  onChange={handleFormDataChange}
                  min={0}
                />
              

               <Text style={styles.label}>
                   Full Doorset Size(mm)<span style={{ color: "red" }}>*</span>
                </Text>
                <TextInput
                style={styles.input}
                  type="number"
                  pattern="[0-9]*"
                  inputMode="decimal"
                  onKeyDown={(e) => {
                    if (["-", "e"].includes(e.key)) e.preventDefault();
                  }}
                  disabled={isView}
                  className="form-control"
                  id="fullDoorsetSize"
                  name="fullDoorsetSize"
                  ref={(el) => (mandatoryFieldRef.current.fullDoorsetSize = el)}
                  placeholder="Full Doorset Size(mm)"
                  value={formData.fullDoorsetSize}
                  onChange={handleFormDataChange}
                  min={0}
                />
               
            {/* </div>
          </div> */}
        {/* </div> */}

        {/* Column 3: Compliance, Additional Photos, Comments */}
         <View style={styles.card}>
                  <Text style={styles.sectionTitle}>Compliance Check</Text>
              <p className="fs-6 fw-semibold">Compliance Check</p>
              <ul className="complian_list">
                {/* Intumescent Strips */}
                <li>
                  <div>Are there intumescent strips?</div>
                  <div className="d-flex gap-2 align-items-center">
                    <span style={{ fontSize: "13px" }}>N</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        disabled={isView}
                        name="intumescentStrips"
                        checked={complianceCheck.intumescentStrips}
                        onChange={handleComplianceToggle}
                      />
                    </div>
                    <span style={{ fontSize: "13px" }}>Y</span>
                  </div>
                  {actionmenuFlag.intumescentStrips && (
                    <MiniCapture
                      isView={isView}
                      mandatoryFieldRef={mandatoryFieldRef}
                      fieldValue="intumescentStrips"
                      formData={complianceCheck}
                      savedImages={actionImages.intumescentStrips}
                      onImagesChange={(images) =>
                        handleImagesChangeMini(images, "intumescentStrips")
                      }
                      onResetChange={() =>
                        handleResetAction("intumescentStrips", "COMPLIANCE")
                      }
                      onHandleActionFieldsChange={(e, field) =>
                        handleActionFieldsChange(e, field, "COMPLIANCE")
                      }
                      onImageDelete={(index) =>
                        handleDeleteImages(index, "intumescentStrips")
                      }
                      reset={resetCaptureFlag}
                    />
                  )}
                </li>

                {/* Cold smoke seals */}
                {isColdSeals && (
                  <li>
                    <div>Are there cold smoke seals?</div>
                    <div className="d-flex gap-2 align-items-center">
                      <span style={{ fontSize: "13px" }}>N</span>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          disabled={isView}
                          name="coldSmokeSeals"
                          checked={complianceCheck.coldSmokeSeals}
                          onChange={handleComplianceToggle}
                        />
                      </div>
                      <span style={{ fontSize: "13px" }}>Y</span>
                    </div>
                    {actionmenuFlag.coldSmokeSeals && (
                      <MiniCapture
                        isView={isView}
                        mandatoryFieldRef={mandatoryFieldRef}
                        fieldValue="coldSmokeSeals"
                        formData={complianceCheck}
                        savedImages={actionImages.coldSmokeSeals}
                        onImagesChange={(images) =>
                          handleImagesChangeMini(images, "coldSmokeSeals")
                        }
                        onResetChange={() =>
                          handleResetAction("coldSmokeSeals", "COMPLIANCE")
                        }
                        onHandleActionFieldsChange={(e, field) =>
                          handleActionFieldsChange(e, field, "COMPLIANCE")
                        }
                        onImageDelete={(index) =>
                          handleDeleteImages(index, "coldSmokeSeals")
                        }
                        reset={resetCaptureFlag}
                      />
                    )}
                  </li>
                )}

                {/* Self closing device */}
                <li>
                  <div>Self closing device?</div>
                  <div className="d-flex gap-2 align-items-center">
                    <span style={{ fontSize: "13px" }}>N</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        disabled={isView}
                        name="selfClosingDevice"
                        checked={complianceCheck.selfClosingDevice}
                        onChange={handleComplianceToggle}
                      />
                    </div>
                    <span style={{ fontSize: "13px" }}>Y</span>
                  </div>
                </li>

                {/* Fire Keeping Locked */}
                {isFireKeepLocked && (
                  <li>
                    <div>Fire door Keep Locked sign?</div>
                    <div className="d-flex gap-2 align-items-center">
                      <span style={{ fontSize: "13px" }}>N</span>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          disabled={isView}
                          name="fireLockedSign"
                          checked={complianceCheck.fireLockedSign}
                          onChange={handleComplianceToggle}
                        />
                      </div>
                      <span style={{ fontSize: "13px" }}>Y</span>
                    </div>
                    {actionmenuFlag.fireLockedSign && (
                      <MiniCapture
                        isView={isView}
                        mandatoryFieldRef={mandatoryFieldRef}
                        fieldValue="fireLockedSign"
                        formData={complianceCheck}
                        savedImages={actionImages.fireLockedSign}
                        onImagesChange={(images) =>
                          handleImagesChangeMini(images, "fireLockedSign")
                        }
                        onResetChange={() =>
                          handleResetAction("fireLockedSign", "COMPLIANCE")
                        }
                        onHandleActionFieldsChange={(e, field) =>
                          handleActionFieldsChange(e, field, "COMPLIANCE")
                        }
                        onImageDelete={(index) =>
                          handleDeleteImages(index, "fireLockedSign")
                        }
                        reset={resetCaptureFlag}
                      />
                    )}
                  </li>
                )}

                {/* Fire Keep Shut */}
                <li>
                  <div>Fire door Keep Shut sign?</div>
                  <div className="d-flex gap-2 align-items-center">
                    <span style={{ fontSize: "13px" }}>N</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        disabled={isView}
                        name="fireShutSign"
                        checked={complianceCheck.fireShutSign}
                        onChange={handleComplianceToggle}
                      />
                    </div>
                    <span style={{ fontSize: "13px" }}>Y</span>
                  </div>
                  {actionmenuFlag.fireShutSign && (
                    <MiniCapture
                      isView={isView}
                      mandatoryFieldRef={mandatoryFieldRef}
                      fieldValue="fireShutSign"
                      formData={complianceCheck}
                      savedImages={actionImages.fireShutSign}
                      onImagesChange={(images) =>
                        handleImagesChangeMini(images, "fireShutSign")
                      }
                      onResetChange={() =>
                        handleResetAction("fireShutSign", "COMPLIANCE")
                      }
                      onHandleActionFieldsChange={(e, field) =>
                        handleActionFieldsChange(e, field, "COMPLIANCE")
                      }
                      onImageDelete={(index) =>
                        handleDeleteImages(index, "fireShutSign")
                      }
                      reset={resetCaptureFlag}
                    />
                  )}
                </li>

                {/* Hold Open Device */}
                <li>
                  <div>Is there a hold open device?</div>
                  <div className="d-flex gap-2 align-items-center">
                    <span style={{ fontSize: "13px" }}>N</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        disabled={isView}
                        name="holdOpenDevice"
                        checked={complianceCheck.holdOpenDevice}
                        onChange={handleComplianceToggle}
                      />
                    </div>
                    <span style={{ fontSize: "13px" }}>Y</span>
                  </div>
                </li>

                {/* Certification Visibility */}
                <li>
                  <div style={{ textAlign: "left" }}>
                    Is certification visible on fire door?
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <span style={{ fontSize: "13px" }}>N</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        disabled={isView}
                        name="visibleCertification"
                        checked={complianceCheck.visibleCertification}
                        onChange={handleComplianceToggle}
                      />
                    </div>
                    <span style={{ fontSize: "13px" }}>Y</span>
                  </div>
                </li>

                {/* Door Glazing */}
                <li>
                  <div>Does the door contain glazing?</div>
                  <div className="d-flex gap-2 align-items-center">
                    <span style={{ fontSize: "13px" }}>N</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        disabled={isView}
                        name="doorGlazing"
                        checked={complianceCheck.doorGlazing}
                        onChange={handleComplianceToggle}
                      />
                    </div>
                    <span style={{ fontSize: "13px" }}>Y</span>
                  </div>
                </li>

                {isGlazing && (
                  <li>
                    <div>Is glazing pyro glazing?</div>
                    <div className="d-flex gap-2 align-items-center">
                      <span style={{ fontSize: "13px" }}>N</span>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          disabled={isView}
                          name="pyroGlazing"
                          checked={complianceCheck.pyroGlazing}
                          onChange={handleComplianceToggle}
                        />
                      </div>
                      <span style={{ fontSize: "13px" }}>Y</span>
                    </div>
                    {actionmenuFlag.pyroGlazing && (
                      <MiniCapture
                        isView={isView}
                        mandatoryFieldRef={mandatoryFieldRef}
                        fieldValue="pyroGlazing"
                        formData={complianceCheck}
                        savedImages={actionImages.pyroGlazing}
                        onImagesChange={(images) =>
                          handleImagesChangeMini(images, "pyroGlazing")
                        }
                        onResetChange={() =>
                          handleResetAction("pyroGlazing", "COMPLIANCE")
                        }
                        onHandleActionFieldsChange={(e, field) =>
                          handleActionFieldsChange(e, field, "COMPLIANCE")
                        }
                        onImageDelete={(index) =>
                          handleDeleteImages(index, "pyroGlazing")
                        }
                        reset={resetCaptureFlag}
                      />
                    )}
                  </li>
                )}
              </ul>
              </View>
            {/* </div>
          </div> */}

          {/* Additional Comments and Cancel/Save Buttons */}
            <View
                    style={{
                      marginBottom: 24,
                      padding: 16,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
                      Additional Comments
                    </Text>
                <TextInput
                style={{
              height: 120,
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 8,
              textAlignVertical: "top",
              backgroundColor: "#f9f9f9",
            }}
                  className="form-control"
                  id="comments"
                  name="comments"
                  rows={4}
                  disabled={isView}
                  placeholder="Additional comments"
                  value={formData.comments}
                  onChange={handleFormDataChange}
                //   style={{ minHeight: "80px", height: "auto" }}
                />
                <label htmlFor="comments">Additional Comments</label>
              </View>

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
      
              {!isView && (
                <div className="d-flex gap-3 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={() => handleValidationOnSave("save")}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            {/* </div>
          </div> */}
        {/* </div> */}
        {/* </form> */}
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

export default FormComponent;
