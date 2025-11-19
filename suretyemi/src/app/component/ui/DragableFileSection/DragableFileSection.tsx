import { Card, Image } from "react-bootstrap";
import { useState } from "react";
// import image from "../../../assests/image 9.png";
import { IoClose, IoDocumentTextOutline } from "react-icons/io5";

interface DragableFileSectionProps {
    accepted?: string;
    maxSize?: number; // in MB
    file: File | null;
    content?: string;
    name: string;
    onChange: (file: File | null) => void;
    id: string;
    tabIndex?: any;
    required?: boolean;
    disabled?: boolean;
    imageicon?: string;
}

const DragableFileSection: React.FC<DragableFileSectionProps> = ({
    file,
    accepted = ".jpg,.jpeg,.png,.gif,.pdf",
    maxSize = 5,
    content,
    id,
    onChange,
    tabIndex,
    name,
    required,
    imageicon,
    disabled = false,
}) => {
    const [error, setError] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState(false);

    const validateFile = (selectedFile: File) => {
        const fileType = selectedFile.name.split(".").pop()?.toLowerCase();
        const allowedTypes = accepted.replace(/\./g, "").split(",");

        if (!allowedTypes.includes(fileType || "")) {
            setError("Invalid file format");
            return false;
        }

        if (selectedFile.size / 1024 / 1024 > maxSize) {
            setError(`File size should not exceed ${maxSize} MB`);
            return false;
        }

        setError(null);
        return true;
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && validateFile(selectedFile)) {
            onChange(selectedFile);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);

        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile && validateFile(droppedFile)) {
            onChange(droppedFile);
        }
    };

    return (
        <div className="drag-drop">

            <div
                className={`document-uploader ${dragOver ? "drag-active" : ""
                    } ${file ? "active" : ""}`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                style={{
                    border: "1px dashed #8f8f8f",
                    borderRadius: "10px",
                    padding: "15px",
                    position: "relative",
                    cursor: disabled ? "not-allowed" : "pointer",
                }}
                onClick={() => !disabled && document.getElementById(id)?.click()}
            >
                <input
                    type="file"
                    id={id}
                    name={name}
                    hidden
                    tabIndex={tabIndex}
                    onChange={handleFileChange}
                    accept={accepted}
                    disabled={disabled}
                />

                {/* Remove Button */}
                {file && !disabled && (
                    <button
                        className="remove-file-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange(null);
                        }}
                        style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            background: "#fff",
                            borderRadius: "50%",
                            border: "1px solid #ccc",
                            width: "22px",
                            height: "22px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <IoClose size={14} />
                    </button>
                )}

                {/* Preview Section */}
                <div className="text-center">
                    {!file ? (
                        <div>
                            <Image src={imageicon} width={50} />
                            <p className="mt-1 text-muted" style={{ fontSize: "12px" }}>
                                Drag your file(s) or{" "}
                                <span className="text-primary">browse</span>
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Image preview */}
                            {file.type.startsWith("image/") ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="preview"
                                    className="img-fluid"
                                    style={{
                                        maxHeight: "60px",
                                        width: "80px",
                                        height: "60px",
                                        objectFit: "contain",
                                        opacity: 0.9,
                                    }}
                                />
                            ) : (
                                <IoDocumentTextOutline size={45} className="text-secondary" />
                            )}

                            {/* File name & size */}
                            <div className="mt-2" style={{ fontSize: "12px" }}>
                                <b>{file.name}</b>
                                <div className="text-muted">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Content Label */}
                {content && (
                    <div
                        className="mt-2 text-center"
                        style={{ fontSize: "12px" }}
                    >
                        <label className={required ? "required" : ""}>
                            {content}
                        </label>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="text-danger mt-2" style={{ fontSize: "12px" }}>
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DragableFileSection;
