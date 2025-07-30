import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { hostName } from "../../config/config";

interface CaptureProps {
  onImagesChange: (images: string[]) => void;
  reset: boolean;
  onImageDelete: (index: number) => void;
  fieldValue: string;
  singleImageCapture?: boolean;
  isView: boolean;
  savedImages: string[];
  mandatoryFieldRef: React.RefObject<Record<string, any>>;
  allowGallery?: boolean;
}

const Capture: React.FC<CaptureProps> = ({
  onImagesChange,
  reset,
  onImageDelete,
  fieldValue,
  singleImageCapture = false,
  isView,
  savedImages,
  mandatoryFieldRef,
  allowGallery = true,
}) => {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const webcamRef = useRef<Webcam>(null);

  const ImageProxyBaseUrl = `${hostName}api/Inspection/api/image?blobUrl=`;

  useEffect(() => {
    if (reset) {
      setCapturedImages([]);
      onImagesChange([]);
      mandatoryFieldRef?.current?.[fieldValue]?.clear?.();
    }

    if (savedImages?.length > 0) {
      setCapturedImages(savedImages);
    }
  }, [reset, savedImages]);

  const updateImages = (newImages: string[]) => {
    setCapturedImages(newImages);
    onImagesChange(newImages);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const newImages = singleImageCapture
        ? [imageSrc]
        : [...capturedImages, imageSrc];
      updateImages(newImages);
      setShowCamera(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const newImages = singleImageCapture
          ? [base64]
          : [...capturedImages, base64];
        updateImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const newImages = capturedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setCapturedImages(newImages);
    onImageDelete(indexToRemove);
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const closeCamera = () => {
    setShowCamera(false);
  };

  return (
    <div className="d-flex flex-column">
      {!isView && (
        <div className="d-flex gap-3 pb-3 align-items-center">
          {allowGallery && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-control"
              disabled={singleImageCapture && capturedImages.length >= 1}
            />
          )}

          {!showCamera && (
            <i
              className="fa-solid fa-camera fa-xl mainCamera"
              onClick={() => {
                if (!(singleImageCapture && capturedImages.length >= 1)) {
                  setShowCamera(true);
                }
              }}
              title="Open Camera"
              style={{
                cursor:
                  singleImageCapture && capturedImages.length >= 1
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  singleImageCapture && capturedImages.length >= 1 ? 0.5 : 1,
              }}
            ></i>
          )}
        </div>
      )}

      {showCamera && (
        <div className="text-center mb-3">
          <Webcam
            audio={false}
            ref={webcamRef}
            height={280}
            screenshotFormat="image/jpeg"
            width={290}
            videoConstraints={{ width: 640, height: 480, facingMode }}
          />
          <div className="d-flex justify-content-center gap-4 mt-2">
            <i
              className="fa-solid fa-camera fa-xl"
              onClick={capturePhoto}
              style={{ cursor: "pointer" }}
              title="Capture Photo"
            ></i>
            <i
              className="fa-solid fa-camera-rotate fa-xl"
              onClick={switchCamera}
              style={{ cursor: "pointer" }}
              title="Switch Camera"
            ></i>
            <i
              className="fa-solid fa-xmark fa-xl"
              onClick={closeCamera}
              style={{ cursor: "pointer" }}
              title="Close Camera"
            ></i>
          </div>
        </div>
      )}

      {capturedImages.length > 0 && (
        <div className="mt-3">
          <div className="d-flex flex-wrap gap-3">
            {capturedImages.map((img, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "200px",
                  border: "2px solid #000",
                }}
              >
                <img
                  src={
                    img.startsWith("data:image")
                      ? img
                      : ImageProxyBaseUrl + encodeURIComponent(img)
                  }
                  alt={`Captured ${index + 1}`}
                  style={{ width: "100%", height: "auto", display: "block", backgroundColor: '#ffffffff'  }}
                />
                
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => removeImage(index)}
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#fff",
                    color: "#ff0000",
                    border: "2px solid #ff0000",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    zIndex: 10,
                  }}
                  title="Remove Image"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Capture;
