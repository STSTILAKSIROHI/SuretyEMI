import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap';
import { FcBusinessman } from 'react-icons/fc';
import { data } from '../../../api/api';
import { IoMdBusiness, IoMdInformationCircleOutline } from 'react-icons/io';
import { MdOutlineCloudUpload } from 'react-icons/md';

const PersonalInfo = () => {
    return (
        <>
            <Row className='mt-3' >
                <Col sm={6}>
                    <Card>
                        <Card.Header className='d-flex align-items-center gap-2 bg-transparent' >
                            <FcBusinessman className='primary' />  Personal <span  >Information</span>
                        </Card.Header>
                        <Card.Body >
                            <div className='d-flex justify-content-between'>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Full name</h6>
                                    <p className='mt-1' >{data.personalInfo.fullName}</p>
                                </div>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Mobile Number</h6>
                                    <p className='mt-1' >{data.personalInfo.mobileNumber}</p>
                                </div>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Alternative Mobile No.</h6>
                                    <p className='mt-1' >{data.personalInfo.altMobileNumber}</p>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Aadhaar No</h6>
                                    <p className='mt-1' >{data.personalInfo.aadhaarNo}</p>
                                </div>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Pan No</h6>
                                    <p className='mt-1' >{data.personalInfo.panNo}</p>
                                </div>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Email ID.</h6>
                                    <p className='mt-1' >{data.personalInfo.emailId}</p>
                                </div>

                            </div>


                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={6}>
                    <Card>
                        <Card.Header className='d-flex align-items-center gap-2 bg-transparent' >
                            <IoMdBusiness />  Business <span>Information</span>
                        </Card.Header>
                        <Card.Body >
                            <div className='d-flex justify-content-between'>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Business name</h6>
                                    <p className='mt-1' >{data.businessInfo.businessName}</p>
                                </div>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >GST Number</h6>
                                    <p className='mt-1' >{data.businessInfo.gstNumber}</p>
                                </div>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >license Number.</h6>
                                    <p className='mt-1' >{data.businessInfo.licenseNumber}</p>
                                </div>
                            </div>
                            <div className='d-flex  gap-4'>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Email ID</h6>
                                    <p className='mt-1' >{data.businessInfo.emailId}</p>
                                </div>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Mobile number</h6>
                                    <p className='mt-1' >{data.businessInfo.mobileNumber}</p>
                                </div>
                            </div>


                        </Card.Body>
                    </Card>
                </Col>
                <Col className='mt-4' sm={6}>
                    <Card style={{ maxHeight: "380px" }} className='overflow-auto' >
                        <Card.Header className='d-flex align-items-center gap-2 bg-transparent' > <MdOutlineCloudUpload /> Uploaded <span>Documents</span></Card.Header>
                        <Card.Body>
                            <Row>
                                {data?.document?.map(
                                    (doc: { name: string; img: string }, index: number) => {
                                        return (
                                            <Col
                                                key={index}
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={6}
                                                className="mb-3"
                                            >
                                                <label className="text-sm d-block mb-2" aria-label={`${doc.name} label`}>
                                                    {doc.name}
                                                </label>

                                                <Image
                                                    fluid
                                                    src={doc.img}
                                                    alt={doc.name || "Document image"}
                                                    style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 6 }}
                                                    loading="lazy"
                                                />
                                            </Col>
                                        )
                                    }

                                )}

                            </Row>

                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={6} className='mt-4' >
                    <Card>
                        <Card.Header className='d-flex align-items-center gap-2 bg-transparent' >
                            <IoMdInformationCircleOutline />   Other  <span>Information</span>
                        </Card.Header>
                        <Card.Body >
                            <p className='primary' >Bank details</p>
                            <div className='d-flex justify-content-between'>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Account Holder Name</h6>
                                    <p className='mt-1' >{data.otherInfo.bankDetails.accountHolderName}</p>
                                </div>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Bank Name</h6>
                                    <p className='mt-1' >SBI bank</p>
                                </div>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Account Number.</h6>
                                    <p className='mt-1' >{data.otherInfo.bankDetails.accountNumber}</p>
                                </div>
                            </div>
                            <div className='d-flex  gap-4'>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >IFSC Code</h6>
                                    <p className='mt-1' >{data.otherInfo.bankDetails.ifscCode}</p>
                                </div>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >UPI ID</h6>
                                    <p className='mt-1' >{data.otherInfo.bankDetails.upiId}</p>
                                </div>
                            </div>
                            <p className='primary' >Reference contact details </p>
                            <div className='d-flex justify-content-between'>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Person Name</h6>
                                    <p className='mt-1' >{data.otherInfo.referenceContact.personName}</p>
                                </div>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' > Contact Number</h6>
                                    <p className='mt-1' >{data.otherInfo.referenceContact.contactNumber}</p>
                                </div>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Address</h6>
                                    <p className='mt-1' >{data.otherInfo.referenceContact.address} </p>
                                </div>
                            </div>
                            <p className='primary' >Address</p>
                            <div className='d-flex justify-content-between'>
                                <div >
                                    <h6 style={{ color: "#979797" }} className='text-md mb-0' >Address</h6>
                                    <p className='mt-1' >{data.otherInfo.primaryAddress.fullAddress}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PersonalInfo
