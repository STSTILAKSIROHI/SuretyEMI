import React from 'react'
import { Card, Col } from 'react-bootstrap';
import Row from 'react-bootstrap/esm/Row';
import Textfield from '../../component/TextInput';
import CustomSelect from '../../component/ui/CustomSelect/CustomSelect';
import { ErrorMessage } from 'formik';
import { FiAlertCircle } from 'react-icons/fi';
import { IoPersonAdd } from 'react-icons/io5';
import { formInstructions } from './YupSchema';
interface Props {
    values: any;
    setFieldValue?: any;
    handleBlur?: any;
}
const BusinesssDetail: React.FC<Props> = ({ values, setFieldValue, handleBlur }) => {

    return (

        <>
            <div className='p-3'>
                <Row>
                    <Col md={9} className='mb-3' >
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-2 gap-3 text-primary mb-0 text-md fw-semibold">
                                <span className="heading-icon"> <IoPersonAdd /></span>Enter the Distributor Business Details
                            </legend>
                            <Row>
                                <Col lg={3} md={4} sm={6} xs={12}>
                                    <Textfield
                                        label="Business Name"
                                        name="businessName"
                                        type='text'
                                        placeholder="Enter full name"
                                        value={values.businessName}
                                        onChange={(e) => setFieldValue("businessName", e.target.value)}
                                        required
                                    />
                                    <ErrorMessage
                                        name="businessName"
                                        component="div"
                                        className="text-danger text-sm"
                                    />
                                </Col>
                                <Col lg={3} md={4} sm={6} xs={12} className="mb-3">
                                    <CustomSelect
                                        label="type of Business"
                                        placeholder="Select type"
                                        name="typeofBusiness"
                                        required
                                        value={
                                            values.typeofBusiness
                                                ? { value: values.typeofBusiness, label: values.typeofBusinesslbl }
                                                : null
                                        }
                                        options={[
                                            { value: "Sole Proprietorship", label: "Sole Proprietorship" },
                                            { value: "Partnership", label: "Partnership" },
                                            { value: "Limited Liability Partnership", label: "Limited Liability Partnership" },
                                            { value: "Private Limited Company", label: "Private Limited Company" },
                                            { value: "Public Limited Company", label: "Public Limited Company" },
                                            { value: "One Person Company", label: "One Person Company" },
                                            { value: "Other", label: "Other" }
                                        ]}
                                        onChange={(option) => {
                                            if (option && !Array.isArray(option)) {
                                                setFieldValue("typeofBusiness", option.value);
                                                setFieldValue("typeofBusinesslbl", option.label);
                                            }
                                        }}
                                    />
                                    <ErrorMessage
                                        name="typeofBusiness"
                                        component="div"
                                        className="text-danger text-sm"
                                    />
                                </Col>
                                <Col lg={3} md={4} sm={6} xs={12}>
                                    <Textfield
                                        label="Business GST No."
                                        name="businessGSTNo"
                                        type='text'
                                        maxLength={25}
                                        placeholder="Enter GST number"
                                        value={values.businessGSTNo}
                                        onChange={(e) => setFieldValue("businessGSTNo", e.target.value)}
                                        required
                                    />
                                    <ErrorMessage
                                        name="businessGSTNo"
                                        component="div"
                                        className="text-danger text-sm"
                                    />
                                </Col>
                                <Col lg={3} md={4} sm={6} xs={12}>
                                    <Textfield
                                        label="Business License NO."
                                        name="businessLicenseNo"
                                        type='text'
                                        maxLength={70}
                                        placeholder="Enter License number"
                                        value={values.businessLicenseNo}
                                        onChange={(e) => setFieldValue("businessLicenseNo", e.target.value)}
                                        required
                                    />
                                    <ErrorMessage
                                        name="businessLicenseNo"
                                        component="div"
                                        className="text-danger text-sm"
                                    />
                                </Col>
                                <Col lg={3} md={4} sm={6} xs={12}>
                                    <Textfield
                                        label="Business Email."
                                        name="businessEmail"
                                        type='text'
                                        maxLength={60}
                                        placeholder="Enter Email"
                                        value={values.businessEmail}
                                        onChange={(e) => setFieldValue("businessEmail", e.target.value)}
                                        required
                                    />
                                    <ErrorMessage
                                        name="businessEmail"
                                        component="div"
                                        className="text-danger text-sm"
                                    />
                                </Col>
                                <Col lg={3} md={4} sm={6} xs={12}>
                                    <Textfield
                                        label="Business Contact No."
                                        name="businessContactNo"
                                        type='text'
                                        maxLength={10}
                                        placeholder="Enter Contact number"
                                        value={values.businessContactNo}
                                        onChange={(e) => setFieldValue("businessContactNo", e.target.value)}
                                        required
                                    />
                                    <ErrorMessage
                                        name="businessContactNo"
                                        component="div"
                                        className="text-danger text-sm"
                                    />
                                </Col>
                            </Row>
                        </fieldset>
                        <fieldset className="border rounded-3 mt-3 p-3">
                            <legend className="float-none w-auto px-2 text-primary mb-0 text-md fw-semibold">
                                Organization Address Information
                            </legend>
                            <Row>
                                <Col md={6} sm={12} className="mb-3">
                                    <Textfield
                                        label="Address 1"
                                        name="OrgAddress1"
                                        type="text"
                                        placeholder="Enter Address"
                                        value={values.OrgAddress1}
                                        tabIndex={11}
                                        maxLength={100}
                                        onBlur={handleBlur}
                                        onChange={(e) => setFieldValue("OrgAddress1", e.target.value)}
                                        required
                                    />
                                    <ErrorMessage
                                        name="OrgAddress1"
                                        component="div"
                                        className="text-danger text-sm"
                                    />
                                </Col>

                                <Col md={6} sm={12} className="mb-3">
                                    <Textfield
                                        label="Address 2"
                                        name="OrgAddress2"
                                        type="text"
                                        placeholder="Enter Address"
                                        value={values.OrgAddress2}
                                        tabIndex={12}
                                        maxLength={100}
                                        onBlur={handleBlur}
                                        onChange={(e) => setFieldValue("OrgAddress2", e.target.value)}
                                        required
                                    />
                                    <ErrorMessage
                                        name="OrgAddress2"
                                        component="div"
                                        className="text-danger text-sm"
                                    />
                                </Col>

                                <Col lg={3} md={4} sm={6} xs={12} className="mb-3">
                                    <CustomSelect
                                        label="City"
                                        placeholder="Select City"
                                        name="City"
                                        required
                                        value={
                                            values.City ? { value: values.City, label: values.Citylbl } : null
                                        }
                                        options={[{ value: "Sirohi", label: "Sirohi" }]}
                                        onChange={(option) => {
                                            if (option && !Array.isArray(option)) {
                                                setFieldValue("City", option.value);
                                                setFieldValue("Citylbl", option.label);
                                            }
                                        }}
                                    />
                                    <ErrorMessage
                                        name="City"
                                        component="div"
                                        className="text-danger text-sm"
                                    />
                                </Col>

                                <Col lg={3} md={4} sm={6} xs={12} className="mb-3">
                                    <CustomSelect
                                        label="State"
                                        placeholder="Select State"
                                        name="State"
                                        required
                                        value={
                                            values.State
                                                ? { value: values.State, label: values.Statelbl }
                                                : null
                                        }
                                        options={[{ value: "Rajasthan", label: "Rajasthan" }]}
                                        onChange={(option) => {
                                            if (option && !Array.isArray(option)) {
                                                setFieldValue("State", option.value);
                                                setFieldValue("Statelbl", option.label);
                                            }
                                        }}
                                    />
                                    <ErrorMessage
                                        name="State"
                                        component="div"
                                        className="text-danger text-sm"
                                    />
                                </Col>

                                <Col lg={3} md={4} sm={6} xs={12} className="mb-3">
                                    <CustomSelect
                                        label="Country"
                                        placeholder="Select Country"
                                        name="Country"
                                        required
                                        value={
                                            values.Country
                                                ? { value: values.Country, label: values.Countrylbl }
                                                : null
                                        }
                                        options={[{ value: "India", label: "India" }]}
                                        onChange={(option) => {
                                            if (option && !Array.isArray(option)) {
                                                setFieldValue("Country", option.value);
                                                setFieldValue("Countrylbl", option.label);
                                            }
                                        }}
                                    />
                                    <ErrorMessage
                                        name="Country"
                                        component="div"
                                        className="text-danger text-sm"
                                    />
                                </Col>

                                <Col lg={3} md={4} sm={6} xs={12} className="mb-3">
                                    <Textfield
                                        label="Pincode"
                                        name="Pincode"
                                        type="text"
                                        placeholder="Enter Pincode"
                                        value={values.Pincode}
                                        tabIndex={13}
                                        maxLength={6}
                                        onBlur={handleBlur}
                                        onChange={(e) =>
                                            setFieldValue("Pincode", e.target.value.replace(/\D/g, ""))
                                        }
                                        required
                                    />
                                    <ErrorMessage
                                        name="Pincode"
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
                            {formInstructions[1].map((instruction, i) => (
                                <div key={i} className="mt-3 bg-white rounded-2 d-flex gap-2 px-3 p-3 pt-3">
                                    <p className="text-md mb-0"><span className='primary' ><FiAlertCircle /></span> {instruction.apiNm}</p>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </div>

        </>
    )
}

export default BusinesssDetail
