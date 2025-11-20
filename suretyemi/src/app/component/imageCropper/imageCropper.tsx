import React, { useState, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "./ImageEditor.module.css";
import { BiRotateLeft, BiRotateRight, BiReset } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import CustomButton from "../ui/customButton/CustomButton";

interface ImageEditorProps {
    show: boolean;
    onHide: () => void;
    imageSrc: string;
    onSave?: any; // Optional callback to get the result
}

const ImageEditor: React.FC<ImageEditorProps> = ({ show, onHide, imageSrc, onSave }) => {
    const [scale, setScale] = useState<number>(1);
    // TypeScript specific: Typed ref for the cropper instance
    const cropperRef = useRef<ReactCropperElement>(null);

    // Typed direction
    const onRotate = (direction: 'left' | 'right') => () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            let angle = 0;
            const angleConfig: Record<string, number> = { left: -45, right: 45 };
            angle = angleConfig[direction] ?? 0;
            cropper.rotate(angle);
        }
    };

    // Typed event handler
    const onScale = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const scaleValue = parseFloat(e.target.value);
            setScale(scaleValue);
            cropper.scale(scaleValue);
        }
    };

    const onReset = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.reset();
            setScale(1);
        }
    };

    const handleSave = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper && onSave) {
            // Get the cropped image as a base64 string
            const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
            onSave(croppedDataUrl);
            onHide(); // Close modal after save
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered // Opens in center
            size="lg" // Large modal for better editing area
            backdrop="static"
            className="image-editor-modal"
        >
            <Modal.Header closeButton className="border-0">
                <h5 className="mb-0">Edit Image</h5>
            </Modal.Header>

            <Modal.Body className="p-0 bg-dark">
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                    <Cropper
                        src={imageSrc}
                        style={{ height: 400, width: "100%" }}
                        initialAspectRatio={16 / 9}
                        guides={true}
                        ref={cropperRef}
                        viewMode={1}
                        background={false}
                        responsive={true}
                    />
                </div>
            </Modal.Body>

            <Modal.Footer className="d-flex flex-column align-items-stretch gap-3">
                {/* Controls Block */}
                <div className={`${styles.controlsBlock} d-flex justify-content-between align-items-center w-100 px-2`}>
                    <div className="d-flex gap-2">
                        <CustomButton
                            type="button"
                            className="btn-light"
                            icon={<BiRotateLeft size={24} />}
                            onClick={onRotate("left")}
                        />
                        <CustomButton
                            type="button"
                            className="btn-light"
                            icon={<BiRotateRight size={24} />}
                            onClick={onRotate("right")}
                        />
                    </div>

                    <div className="d-flex align-items-center gap-2 flex-grow-1 mx-4">
                        <label htmlFor="scale" className="mb-0 text-muted small">Zoom</label>
                        <input
                            type="range"
                            className="form-range"
                            min="0.2"
                            max="3"
                            step="0.1"
                            value={scale}
                            aria-label="scale"
                            id="scale"
                            onChange={onScale}
                        />
                    </div>

                    <CustomButton
                        type="button"
                        className="btn-light"
                        icon={<BiReset size={24} />}
                        onClick={onReset}
                    />
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-end gap-2 w-100 border-top pt-3">
                    <CustomButton
                        text="Cancel"
                        onClick={onHide}
                        variant="transparent"
                        type="button"
                        className="px-4"
                    />
                    <CustomButton
                        text="Save Changes"
                        onClick={handleSave}
                        className="bg-btn px-4"
                        type="button"
                    />
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ImageEditor;