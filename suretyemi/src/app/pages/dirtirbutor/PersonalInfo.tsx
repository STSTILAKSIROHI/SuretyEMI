import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import Textfield from '../../component/TextInput';
import person from '../../assests/Ellipse 62.png';
import { ErrorMessage } from 'formik';

interface Props {
    values: any;
    setFieldValue?: any;
    handleBlur?: any;
}

const Instruction = [
    { apiNm: "Enter the distributor's full legal name as per government ID." },
    { apiNm: "Mobile number must be unique and linked with active Aadhaar." },
    { apiNm: "Alternate mobile number is optional but recommended." },
    { apiNm: "Enter valid PAN & Aadhaar details for verification." },
    { apiNm: "Ensure email address is correct for login communication." },
    { apiNm: "Review all information before proceeding to the next step." }
];

const PersonalInfo: React.FC<Props> = ({ values, setFieldValue }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFieldValue("profilePicture", selectedFile);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) {
            setFieldValue("profilePicture", droppedFile);
        }
    };
    return (
        <div className="personal-info-card p-3">

            <Row className="g-4">
                <Col sm={9} >
                    <fieldset className="border rounded-3 p-3">
                        <legend className="float-none w-auto px-2 text-primary mb-0 text-md fw-semibold">
                            <span className="heading-icon">👤</span> Please Enter the distributor personal Information
                        </legend>
                        <Row>
                            <Col xs={12} md={2} className="d-flex justify-content-center">
                                {/* <div className="avatar-wrapper"> */}
                                {/*  */}
                                <div
                                    className={`document-uploader`}
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        name="profilePicture"
                                        hidden
                                        onChange={handleFileChange}
                                    />

                                    <div className={`d-grid rounded align-items-center justify-content-center  ${values.profilePicture ? "border rounded-circle" : "border-0 "}  p-3 py-3 text-center cursor-pointer`}
                                        onClick={() => document.getElementById("profilePicture")?.click()}
                                    >
                                        {
                                            values.profilePicture ?
                                                <Image src={URL.createObjectURL(values.profilePicture)} alt="preview" className='img-fluid' style={{ width: "100px", height: "100px", objectFit: "contain", opacity: 0.7 }}
                                                /> :
                                                <Image src={person} fluid alt="avatar" />
                                        }
                                    </div>
                                </div>
                                {/* </div> */}
                            </Col>
                            <Col md={10} sm={12}>
                                <Row className="g-3  mt-1">
                                    <Col md={4} xs={12}>
                                        <Textfield
                                            label="Full Name"
                                            name="fullName"
                                            placeholder="Enter full name"
                                            value={values.fullName}
                                            onChange={(e) => setFieldValue("fullName", e.target.value)}
                                            required
                                        />
                                        <ErrorMessage
                                            name="fullName"
                                            component="div"
                                            className="text-danger text-sm"
                                        />
                                    </Col>

                                    <Col md={4} xs={12}>
                                        <Textfield
                                            label="Mobile Number"
                                            name="mobile"
                                            placeholder="Enter mobile number"
                                            value={values.mobile}
                                            onChange={(e) => setFieldValue("mobile", e.target.value)}
                                            required
                                        />
                                        <ErrorMessage
                                            name="mobile"
                                            component="div"
                                            className="text-danger text-sm"
                                        />
                                    </Col>

                                    <Col md={4} xs={12}>
                                        <Textfield
                                            label="Alternate Mobile Number"
                                            name="alternateMobile"
                                            placeholder="Enter alternate mobile number"
                                            value={values.alternateMobile}
                                            onChange={(e) => setFieldValue("alternateMobile", e.target.value)}
                                        />
                                        <ErrorMessage
                                            name="alternateMobile"
                                            component="div"
                                            className="text-danger text-sm"
                                        />
                                    </Col>

                                    <Col md={8} xs={12}>
                                        <Textfield
                                            label="Email Address"
                                            name="email"
                                            placeholder="Ex. Hastibank@gmail.com"
                                            value={values.email}
                                            onChange={(e) => setFieldValue("email", e.target.value)}
                                            required
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-danger text-sm"
                                        />
                                    </Col>

                                    <Col md={4} xs={12}>
                                        <Textfield
                                            label="Aadhaar Number"
                                            name="aadhaar"
                                            placeholder="Enter Aadhaar number"
                                            value={values.aadhaar}
                                            onChange={(e) => setFieldValue("aadhaar", e.target.value)}
                                            required
                                        />
                                        <ErrorMessage
                                            name="aadhaar"
                                            component="div"
                                            className="text-danger text-sm"
                                        />
                                    </Col>

                                    <Col md={6} xs={12}>
                                        <Textfield
                                            label="Pan Number"
                                            name="pan"
                                            placeholder="Enter Pan Number"
                                            value={values.pan}
                                            onChange={(e) => setFieldValue("pan", e.target.value)}
                                            required
                                        />
                                        <ErrorMessage
                                            name="pan"
                                            component="div"
                                            className="text-danger text-sm"
                                        />
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                    </fieldset>
                </Col>

                {/* Instructions */}
                <Col md={3} sm={12}>
                    <div className="p-3 border bg-light rounded">
                        <h6 className="text-primary">Instructions</h6>
                        {Instruction.map((instruction, i) => (
                            <div
                                key={i}
                                className="mt-3 bg-white rounded-2 d-flex gap-2 px-3 p-3 pt-3"
                            >
                                <p className="text-md mb-0">{instruction.apiNm}</p>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default PersonalInfo;
