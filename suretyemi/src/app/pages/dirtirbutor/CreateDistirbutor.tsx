import React, { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../component/loading/Loading';
import { Formik, Form } from 'formik';
import { Col, Row } from 'react-bootstrap';
import Step from '../../component/Step/Step';
import CustomButton from '../../component/ui/customButton/CustomButton';
import PersonalInfo from './PersonalInfo';
import BusinesssDetail from './BusinesssDetail';
import Documents from './Documents';
import Otherdetails from './Otherdetails';
import CommissionCost from './CommissionCost';
import { businessDetailsSchema, commissionCostSchema, documentsSchema, otherDetailsSchema, personalInfoSchema } from './YupSchema';
const steps = [
    { apiNm: ' Personal Information' },
    { apiNm: ' Businesss Detail' },
    { apiNm: 'Document' },
    { apiNm: 'Other details' },
    { apiNm: 'Commission/cost' },
];
const CreateDistirbutor = () => {
    const navigate = useNavigate(); // Navigate 
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // const schemaArray = [personalInfoSchema, businessDetailsSchema, documentsSchema, otherDetailsSchema, commissionCostSchema];
    const handleNext = () => setCurrentStep((prev) => prev + 1); //  steps next 
    const handlePrev = () => setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0)); // step backs
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Formik
                    initialValues={{
                        // Step 1: Personal Information
                        profilePicture: null,
                        fullName: '',
                        mobile: '',
                        alternateMobile: '',
                        email: '',
                        aadhaar: '',
                        pan: '',

                        // Step 2: Business Details
                        businessName: '',
                        typeofBusiness: '',
                        typeofBusinesslbl: '', // For label tracking
                        businessGSTNo: '',
                        businessLicenseNo: '',
                        businessEmail: '',
                        businessContactNo: '',
                        OrgAddress1: '',
                        OrgAddress2: '',
                        City: '',
                        Citylbl: '',
                        State: '',
                        Statelbl: '',
                        Country: '',
                        Countrylbl: '',
                        Pincode: '',

                        // Step 3: Documents
                        aadhaarFront: null,
                        aadhaarBack: null,
                        panCard: null,
                        gstCert: null,
                        securityCheque: null,
                        bankStatement: null,

                        // Step 4: Other Details (Bank & Reference)
                        accountHolderName: '',
                        bankName: '',
                        accountNumber: '',
                        ifscCode: '',
                        upiId: '',
                        referencePersonName: '',
                        referenceContactNumber: '',
                        address1: '', // Reference address

                        // Step 5: Commission/Cost
                        // These might be populated by the RecurringMdl or PlanCard logic
                        selectedPlanId: '',
                        planAmount: '',
                        isPlanSelected: false,
                        otp: ''
                    }}
                    // validationSchema={schemaArray[currentStep]}
                    onSubmit={(values, action) => {
                        handleNext();
                        action.setTouched({});
                        action.setSubmitting(true);
                    }}
                >
                    {({ values, setFieldValue, handleBlur, setTouched, resetForm }) => {
                        // console.log("error", errors)
                        return (
                            <Form className='px-4 '>
                                {/* <h6> <MdOutlineCreateNewFolder /> Distirbutor <span className='primary' > KYC Process</span></h6> */}
                                <Row>
                                    <Col sm={9}>
                                        <Step steps={steps} stepNumber={currentStep} Type="T" />
                                    </Col>
                                    <Col md={12}>
                                        {/* Forms */}
                                        {currentStep === 0 && (
                                            // Organization details form
                                            <PersonalInfo values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                                        )}
                                        {currentStep === 1 && (
                                            // Organization details form
                                            <BusinesssDetail values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                                        )}
                                        {currentStep === 2 && (
                                            // Organization details form
                                            <Documents values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                                        )}
                                        {currentStep === 3 && (
                                            // Organization details form
                                            <Otherdetails values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                                        )}
                                        {currentStep === 4 && (
                                            // Organization details form
                                            <CommissionCost values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} />
                                        )}
                                    </Col>
                                    <Col sm={9} >
                                        <div className='d-flex justify-content-between gap-2 mt-3' >
                                            {/* Previous button  */}
                                            <div>
                                                {currentStep > 0 && (
                                                    <CustomButton text="Previous" type="button" className="py-2 px-4" disabled={currentStep === 0}
                                                        onClick={() => {
                                                            handlePrev();
                                                            setTouched({});
                                                        }}
                                                    />)}
                                            </div>
                                            <div className='d-flex gap-3'>
                                                {/* Cancel button */}
                                                <CustomButton text="Cancel"
                                                    type="button" className="py-2 px-4"
                                                    variant="transparent"
                                                    onClick={() => navigate(`/distributor`)} />

                                                <CustomButton
                                                    text={!isLoading ? (currentStep < steps.length - 1 ? "Next" : 'Submit') : 'Loading...'}
                                                    className="py-2 px-4 bg-btn"
                                                    type="submit"
                                                    disabled={isLoading}
                                                />


                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                            </Form>

                        )
                    }
                    }

                </Formik >
            </Suspense>
        </>
    )
}

export default CreateDistirbutor
