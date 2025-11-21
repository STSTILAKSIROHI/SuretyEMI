
import { Row, Col, Card } from "react-bootstrap";
import { CgFileDocument } from "react-icons/cg";
import { ErrorMessage } from "formik";
import DragableFileSection from "../../component/ui/DragableFileSection/DragableFileSection";
import { FiAlertCircle } from "react-icons/fi";
import { formInstructions } from "./YupSchema";

interface Props {
    values: any;
    setFieldValue?: any;
    handleBlur?: any;
}

const Documents: React.FC<Props> = ({ values, setFieldValue }) => {
    return (
        <>
            <Row className="p-3" >

                <Col sm={9}>
                    <fieldset className="border rounded-3 p-3">
                        <legend className="float-none w-auto px-2 gap-3 text-primary mb-0 text-md fw-semibold">
                            <span className="heading-icon">
                                <CgFileDocument className="text-primary" size={20} />
                            </span>
                            Enter the Distributor Document Image
                        </legend>
                        <Row className="gap-4">

                            {/* Aadhaar Section */}
                            <Col md={5}>
                                <Card style={{ border: '1px solid #ebebebff' }} className="p-3 shadow-sm">
                                    <Card.Title className="mb-3 text-xl d-flex align-items-center gap-2">
                                        <CgFileDocument className="text-primary" /> Aadhaar Card
                                    </Card.Title>

                                    <Row className="g-3 ">
                                        <Col md={6}>
                                            <Card className="p-3 border-dashed">
                                                <DragableFileSection
                                                    file={values.aadhaarFront}
                                                    name="aadhaarFront"
                                                    content="Front Aadhaar Image"
                                                    accepted="png,jpg,jpeg"
                                                    id="aadhaar-front"
                                                    imageicon="https://cdn-icons-png.freepik.com/512/10944/10944234.png?ga=GA1.1.431573938.1752828686"
                                                    onChange={(files) => {
                                                        setFieldValue("aadhaarFront", files)
                                                    }
                                                    }
                                                />
                                                <ErrorMessage
                                                    name="aadhaarFront"
                                                    component="div"
                                                    className="text-danger text-sm"
                                                />
                                            </Card>
                                        </Col>

                                        <Col md={6}>
                                            <Card className="p-3 border-dashed">
                                                <DragableFileSection
                                                    file={values.aadhaarBack}
                                                    name="aadhaarBack"
                                                    content="Back Aadhaar Image"
                                                    accepted="png,jpg,jpeg"
                                                    imageicon="https://cdn-icons-png.flaticon.com/512/10832/10832248.png"
                                                    id="aadhaar-back"
                                                    onChange={(files) =>
                                                        setFieldValue("aadhaarBack", files)
                                                    }
                                                />
                                                <ErrorMessage
                                                    name="aadhaarBack"
                                                    component="div"
                                                    className="text-danger text-sm"
                                                />
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                            {/* PAN Card */}
                            <Col md={3}>
                                <Card style={{ border: '1px solid #ebebebff' }} className="p-3 shadow-sm">
                                    <Card.Title className="mb-3 text-xl d-flex align-items-center gap-2">
                                        <CgFileDocument className="text-primary" /> Pan Card
                                    </Card.Title>

                                    <Card className="p-3 border-dashed">
                                        <DragableFileSection
                                            file={values.panCard}
                                            name="panCard"
                                            content="Upload PAN Card"
                                            imageicon="https://cdn-icons-png.freepik.com/512/1599/1599886.png?ga=GA1.1.431573938.1752828686"
                                            accepted="png,jpg,jpeg"
                                            id="pan-upload"
                                            onChange={(files) => setFieldValue("panCard", files)}
                                        />
                                        <ErrorMessage
                                            name="panCard"
                                            component="div"
                                            className="text-danger text-sm"
                                        />
                                    </Card>
                                </Card>
                            </Col>

                            {/* GST Certificate */}
                            <Col md={3}>
                                <Card style={{ border: '1px solid #ebebebff' }} className="p-3 shadow-sm">
                                    <Card.Title className="mb-3 text-xl d-flex align-items-center gap-2">
                                        <CgFileDocument className="text-primary" /> GST Certificate  Proof
                                    </Card.Title>

                                    <Card className="p-3 border-dashed">
                                        <DragableFileSection
                                            file={values.gstCert}
                                            name="gstCert"
                                            content="Upload GST Certificate"
                                            accepted="png,jpg,jpeg,pdf"
                                            imageicon="https://cdn-icons-png.freepik.com/512/14828/14828015.png?ga=GA1.1.431573938.1752828686"
                                            id="gst-upload"
                                            onChange={(files) => setFieldValue("gstCert", files)}
                                        />
                                        <ErrorMessage
                                            name="gstCert"
                                            component="div"
                                            className="text-danger text-sm"
                                        />
                                    </Card>
                                </Card>
                            </Col>

                            {/* Security Cheque */}
                            <Col md={3}>
                                <Card style={{ border: '1px solid #ebebebff' }} className="p-3 shadow-sm">
                                    <Card.Title className="mb-3 text-xl d-flex align-items-center gap-2">
                                        <CgFileDocument className="text-primary" /> Security Cheque
                                    </Card.Title>

                                    <Card className="p-3 border-dashed">
                                        <DragableFileSection
                                            file={values.securityCheque}
                                            name="securityCheque"
                                            content="Upload Security Cheque"
                                            accepted="png,jpg,jpeg"
                                            imageicon="https://cdn-icons-png.freepik.com/512/4771/4771688.png?ga=GA1.1.431573938.1752828686"
                                            id="security-upload"
                                            onChange={(files) =>
                                                setFieldValue("securityCheque", files)
                                            }
                                        />
                                        <ErrorMessage
                                            name="securityCheque"
                                            component="div"
                                            className="text-danger text-sm"
                                        />
                                    </Card>
                                </Card>
                            </Col>

                            {/* Bank Statement */}
                            <Col md={3}>
                                <Card style={{ border: '1px solid #ebebebff' }} className="p-3 shadow-sm">
                                    <Card.Title className="mb-3 text-xl d-flex align-items-center gap-2">
                                        <CgFileDocument className="text-primary" /> Bank Statement
                                    </Card.Title>

                                    <Card className="p-3 border-dashed">
                                        <DragableFileSection
                                            file={values.bankStatement}
                                            name="bankStatement"
                                            content="Upload Bank Statement"
                                            imageicon="https://cdn-icons-png.freepik.com/512/4807/4807939.png?ga=GA1.1.431573938.1752828686"
                                            accepted="pdf,jpg,png"
                                            id="bank-upload"
                                            onChange={(files) =>
                                                setFieldValue("bankStatement", files)
                                            }
                                        />
                                        <ErrorMessage
                                            name="bankStatement"
                                            component="div"
                                            className="text-danger text-sm"
                                        />
                                    </Card>
                                </Card>
                            </Col>
                        </Row>
                    </fieldset>
                </Col>
                <Col md={3} sm={12}>
                    <div className="p-3 border bg-light rounded">
                        <h6 className="text-primary"> <span><FiAlertCircle /></span> Instructions</h6>
                        {formInstructions[2].map((instruction, i) => (
                            <div key={i} className="mt-3 bg-white rounded-2 d-flex gap-2 px-3 p-3 pt-3">
                                <p className="text-md mb-0"><span className='primary' ><FiAlertCircle /></span> {instruction.apiNm}</p>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>

        </>
    );
};

export default Documents;
