import { DOOR_INSPECTION_API } from "@/src/api/apiPath";
import http from "@/src/api/server";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Statuses } from "./constants";

interface PropertyTileProps {
  data: any;
  userRole: number | null;
  onViewProperty: (propertyId: string) => void;
  onStartSurvey: (propertyId: string) => void;
  InspectionPropertyInfo?: any;
}

const PropertyTile: React.FC<PropertyTileProps> = ({
  data,
  userRole,
  onViewProperty,
  onStartSurvey,
}) => {
  const [showLoader, setShowLoader] = useState(false);
  const [showNewSurveyIcon, setShowNewSurveyIcon] = useState(true);
  const [showDownloadIcon, setShowDownloadIcon] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const { userObj } = useSelector((state: any) => state.user);

  const handleDownloadClick = async (propertyId: string | number) => {
    setShowLoader(true);
    try {
      const response = await http.get(DOOR_INSPECTION_API, {
        params: { propertyId },
        responseType: "blob",
      });

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      setPdfUrl(fileURL);

      if (isMobile) {
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = `${propertyId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setShowPdfModal(true);
      }
    } catch (error) {
      console.error("Download Failed", error);
    } finally {
      setShowLoader(false);
    }
  };

  const {
    propertyMasterId,
    propertyName,
    propertyLocation,
    inspectedBy,
    lastInspectionDate,
    nextInspectionDueDate,
    status,
    totalAttention,
  } = data;

  // useEffect(() => {
  //   if (!userObj) return;

  //   const checkSurveyPermissions = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://your-ip/api/property-user-mapping/${propertyMasterId}`
  //       );
  //       const mapping = response.data.find(
  //         (d: any) => d.userId === userObj.userId
  //       );
  //       const inspectorStatus = mapping?.status;

  //       const now = new Date();
  //       const nextDate = new Date(nextInspectionDueDate);

  //       const canStartSurvey =
  //         ((status !== Statuses.COMPLETED && status !== Statuses.REJECTED) ||
  //           inspectorStatus !== Statuses.COMPLETED ||
  //           nextDate <= now) &&
  //         userRole === UserRoles.INSPECTOR;

  //       setShowNewSurveyIcon(canStartSurvey);

  //       if (
  //         status === Statuses.COMPLETED &&
  //         (userRole === UserRoles.ADMIN || userRole === UserRoles.APPROVER)
  //       ) {
  //         setShowDownloadIcon(true);
  //       }
  //     } catch (error) {
  //       console.error("Error checking permissions", error);
  //     }
  //   };

  //   checkSurveyPermissions();
  // }, [userObj]);

  // const handleDownloadClick = async () => {
  //   try {
  //     setShowLoader(true);
  //     const response = await axios.get("http://your-ip/api/door-inspection", {
  //       params: { propertyId: propertyMasterId },
  //       responseType: "blob",
  //     });

  //     const file = new Blob([response.data], { type: "application/pdf" });
  //     const fileURL = URL.createObjectURL(file);
  //     setPdfUrl(fileURL);
  //     setShowPdfModal(true);
  //   } catch (error) {
  //     console.error("Download failed", error);
  //   } finally {
  //     setShowLoader(false);
  //   }
  // };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString();
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case Statuses.COMPLETED:
        return { backgroundColor: "green" };
      case Statuses.INREVIEW:
        return { backgroundColor: "#f0ad4e" };
      case Statuses.NOTSTARTED:
        return { backgroundColor: "gray" };
      case Statuses.INPROGRESS:
        return { backgroundColor: "orange" };
      case Statuses.REJECTED:
        return { backgroundColor: "red" };
      default:
        return { backgroundColor: "white" };
    }
  };
  const getStatusProgressWidth = (status: string) => {
    switch (status) {
      case "In Review":
        return "50%";
        case "In Progress":
        return "50%";
      case "Submitted for Approval":
        return "75%";
      case "Completed":
        return "100%";
      case "Rejected":
      case "Pending Approval":
        return "0%";
      default:
        return "0%";
    }
  };

  const getStatusProgressValue = (status: string) => {
    switch (status) {
      case "In Review":
        return 50;
      case "Submitted for Approval":
        return 75;
      case "Completed":
        return 100;
      case "Rejected":
      case "Pending Approval":
        return 0;
      default:
        return 0;
    }
  };

  return (
    <View style={styles.cardWithLine}>
      <View style={styles.line} />
      <View style={styles.cardContent}>
        <View style={styles.card}>
          <View style={styles.row}>
            {/* Left block with icon and info */}
            <View style={styles.columnLeft}>
              <View style={styles.centerIconColumn}>
                <FontAwesome5 name="building" size={32} color="#333" />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{propertyName}</Text>
                <Text style={styles.info}>
                  <Entypo name="location-pin" size={14} /> {propertyLocation}
                </Text>
                <Text style={styles.info}>
                  <Ionicons name="person-circle" size={14} /> {inspectedBy}
                </Text>
                <Text style={styles.info}>
                  <MaterialIcons name="calendar-today" size={14} />{" "}
                  {formatDate(lastInspectionDate)}
                </Text>

                {/* Status bar row */}
                <View style={styles.statusRow}>
                  <View style={[styles.statusDot, getStatusStyle(status)]} />
                  <Text style={styles.statusLabel}>{status}</Text>
                </View>

                {[
                  // "In Review",
                  "In Progress",
                  "Completed",
                  "Pending Approval",
                  "Rejected",
                  "Submitted for Approval",
                ].includes(status) && (
                  <View className="col-12 col-sm-8 col-lg-4 col-lg-4-padding col-sm-8-padding">
                    <View className="d-flex mb-2 align-items-center justify-content-between "></View>

                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: getStatusProgressWidth(status),
                            backgroundColor:
                              status === "Completed"
                                ? "green"
                                // : status === "In Review"
                                // ? "#f0ad4e" // orange
                                 : status === "In Progress"
                                ? "#f0ad4e" // orange
                                : status === "Submitted for Approval"
                                ? "#007bff" // blue
                                : status === "Rejected"
                                ? "red"
                                : "#6c757d", // gray
                          },
                        ]}
                      />
                    </View>
                  </View>
                )}

                {/* <View style={[styles.statusBarLine, getStatusStyle(status)]} /> */}
              </View>
            </View>

            {/* Right block with action buttons */}
            <View style={styles.columnRight}>
              <Text style={styles.issuesText}>
                <MaterialIcons name="warning" size={14} color="red" />{" "}
                {totalAttention} Issue Found
              </Text>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  onPress={() => onViewProperty(propertyMasterId)}
                >
                  <Ionicons name="eye" size={24} color="black" />
                </TouchableOpacity>
                {showNewSurveyIcon && (
                  <TouchableOpacity
                    onPress={() => onStartSurvey(propertyMasterId)}
                  >
                    <Ionicons name="add-circle" size={24} color="blue" />
                  </TouchableOpacity>
                )}

                {/* <TouchableOpacity
                  onPress={() => handleDownloadClick(propertyInfo?.propertyId)}
                >
                  <Icon name="download" size={20} color="black" />
              
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWithLine: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    overflow: "hidden",
  },

  line: {
    width: 6, // line width
    backgroundColor: "#4d0334ff", // change to your desired color
  },

  cardContent: {
    flex: 1,
    padding: 15,
  },

  card: {
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  centerIconColumn: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  columnLeft: {
    flexDirection: "row",
    flex: 1,
    gap: 10,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 2,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statusBarLine: {
    height: 4,
    borderRadius: 3,
    marginTop: 4,
    width: "100%",
  },
  issuesText: {
    fontSize: 16,
    color: "red",
    fontWeight: "500",
    marginBottom: 8,
  },

  statusBar: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 2,
  },
  columnRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  iconRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeBtn: {
    fontSize: 16,
    marginTop: 20,
    color: "red",
  },
  openPdfBtn: {
    marginTop: 30,
    fontSize: 18,
    color: "blue",
    textDecorationLine: "underline",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    width: "100%",
    marginTop: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
});

export default PropertyTile;
