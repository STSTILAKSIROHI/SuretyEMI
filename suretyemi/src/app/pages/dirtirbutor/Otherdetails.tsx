import React from 'react'
import Row from 'react-bootstrap/esm/Row';
import Textfield from '../../component/TextInput';
import { ErrorMessage } from 'formik';
import { Col } from 'react-bootstrap';
import { FiAlertCircle } from 'react-icons/fi';
import { formInstructions } from './YupSchema';
interface Props {
    values: any;
    setFieldValue?: any;
    handleBlur?: any;
}
const Otherdetails: React.FC<Props> = ({ values, setFieldValue }) => {
    return (
        <>
            <Row className='p-3' >
                <Col md={9} xs={12}>
                    <fieldset className="border rounded-3 p-3">
                        <legend className="float-none w-auto px-2 text-primary mb-0 text-md fw-semibold">
                            <span className="heading-icon">👤</span> Enter the Distirbutor bank details
                        </legend>
                        <Row>
                            <Col className='mb-2' md={4} xs={12}>
                                <Textfield
                                    label="Account Holder Name"
                                    name="accountHolderName"
                                    type='text'
                                    maxLength={40}
                                    placeholder="Enter account holder name"
                                    value={values.accountHolderName}
                                    onChange={(e) => setFieldValue("accountHolderName", e.target.value)}
                                    required
                                />
                                <ErrorMessage
                                    name="accountHolderName"
                                    component="div"
                                    className="text-danger text-sm"
                                />
                            </Col>
                            <Col className='mb-2' md={4} xs={12}>
                                <Textfield
                                    label="Bank Name "
                                    name="bankName"
                                    type='text'
                                    maxLength={40}
                                    placeholder="Enter bank name"
                                    value={values.bankName}
                                    onChange={(e) => setFieldValue("bankName", e.target.value)}
                                    required
                                />
                                <ErrorMessage
                                    name="bankName"
                                    component="div"
                                    className="text-danger text-sm"
                                />
                            </Col>
                            <Col className='mb-2' md={4} xs={12}>
                                <Textfield
                                    label="Account Number"
                                    name="accountNumber"
                                    type='text'
                                    maxLength={18}
                                    placeholder="Enter account number"
                                    value={values.accountNumber}
                                    onChange={(e) => setFieldValue("accountNumber", e.target.value)}
                                    required
                                />
                                <ErrorMessage
                                    name="accountNumber"
                                    component="div"
                                    className="text-danger text-sm"
                                />
                            </Col>
                            <Col className='mb-2' md={4} xs={12}>
                                <Textfield
                                    label="IFSC Code"
                                    name="ifscCode"
                                    type='text'
                                    maxLength={11}
                                    placeholder="Enter IFSC code"
                                    value={values.ifscCode}
                                    onChange={(e) => setFieldValue("ifscCode", e.target.value)}
                                    required
                                />
                                <ErrorMessage
                                    name="ifscCode"
                                    component="div"
                                    className="text-danger text-sm"
                                />
                            </Col>
                            <Col className='mb-2' md={4} xs={12}>
                                <Textfield
                                    label="UPI ID (If any)"
                                    name="upiId"
                                    type='text'
                                    maxLength={50}
                                    placeholder="Enter UPI ID"
                                    value={values.upiId}
                                    onChange={(e) => setFieldValue("upiId", e.target.value)}
                                    required
                                />
                                <ErrorMessage
                                    name="upiId"
                                    component="div"
                                    className="text-danger text-sm"
                                />
                            </Col>
                        </Row>
                    </fieldset>
                    <fieldset className="border rounded-3 p-3 mt-3">
                        <legend className="float-none w-auto px-2 text-primary mb-0 text-md fw-semibold"> Please Enter the reference details</legend>
                        <Row>
                            <Col className='mb-2' md={4} xs={12}>
                                <Textfield
                                    label="Reference Person Name"
                                    name="referencePersonName"
                                    type='text'
                                    maxLength={50}
                                    placeholder="Enter reference person name"
                                    value={values.referencePersonName}
                                    onChange={(e) => setFieldValue("referencePersonName", e.target.value)}
                                    required
                                />
                                <ErrorMessage
                                    name="referencePersonName"
                                    component="div"
                                    className="text-danger text-sm"
                                />
                            </Col>
                            <Col className='mb-2' md={4} xs={12}>
                                <Textfield
                                    label="Reference Contact Number "
                                    name="referenceContactNumber"
                                    type='text'
                                    maxLength={10}
                                    placeholder="Enter reference contact number"
                                    value={values.referenceContactNumber}
                                    onChange={(e) => setFieldValue("referenceContactNumber", e.target.value)}
                                    required
                                />
                                <ErrorMessage
                                    name="referenceContactNumber"
                                    component="div"
                                    className="text-danger text-sm"
                                />
                            </Col>
                            <Col className='mb-2' md={4} xs={12}>
                                <Textfield
                                    label="Address1"
                                    name="address1"
                                    type='text'
                                    maxLength={100}
                                    placeholder="Enter address1"
                                    value={values.address1}
                                    onChange={(e) => setFieldValue("address1", e.target.value)}
                                    required
                                />
                                <ErrorMessage
                                    name="address1"
                                    component="div"
                                    className="text-danger text-sm"
                                />
                            </Col>
                        </Row>
                    </fieldset>
                </Col>
                <Col md={3} sm={12}>
                    <div className="p-3 border bg-light rounded">
                        <h6 className="text-primary"> <span><FiAlertCircle /></span> Instructions</h6>
                        {formInstructions[3].map((instruction, i) => (
                            <div key={i} className="mt-3 bg-white rounded-2 d-flex gap-2 px-3 p-3 pt-3">
                                <p className="text-md mb-0"><span className='primary' ><FiAlertCircle /></span> {instruction.apiNm}</p>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Otherdetails
