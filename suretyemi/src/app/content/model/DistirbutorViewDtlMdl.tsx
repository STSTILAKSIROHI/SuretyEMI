import React, { useState } from 'react'
import { Button, Card, Col, Image, Offcanvas, Row, Tab, Tabs } from 'react-bootstrap';
import person from '../../assests/Ellipse 62.png';
import { IoPerson, IoTimeOutline } from 'react-icons/io5';
import { data } from '../../api/api';
import CustomButton from '../../component/ui/customButton/CustomButton';
import { FcBusinessman, FcPlanner, FcViewDetails } from "react-icons/fc";
import { TbListDetails } from 'react-icons/tb';
import { IoMdBusiness } from "react-icons/io";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface Props {
    show: boolean;
    onHide: () => void
    kycColumns: any;
    setRemark: (val: boolean) => void;
    flag: 'k' | "v"

}
const DistirbutorViewDtlMdl: React.FC<Props> = ({ show, onHide, kycColumns, setRemark, flag }) => {
    return (
        <Offcanvas
            show={show}
            onHide={onHide}
            placement="end"
            className="custom-offcanvas px-3"
            style={{ width: "60%", maxWidth: "100%", borderRadius: "10px" }}
        >
            <Offcanvas.Header closeButton>
                <div>
                    <h5 className="mb-0 mt-2"><strong> <TbListDetails /> Distirbutor <span className="primary">Details</span></strong></h5>
                </div>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    <Image style={{ height: "60px" }} src={person} fluid alt="avatar" />
                    <div>
                        <h6 className="mb-0" style={{ fontSize: '14px' }}>
                            {data.profile.distributorName}
                        </h6>
                        <span className="text-sm">{data.profile.companyType}</span>
                    </div>
                    <div className="vl" />
                    <div> <h6 className="mb-0 light-color" style={{ fontSize: '14px' }}>Distirbutor Code</h6><span className="text-sm fw-bold">{data.profile.distributorCode}</span>
                    </div>
                </div>
                <hr />
                <Row>
                    <Col sm={2} >
                        <div className="  d-flex align-items-center gap-3">
                            <span className="bg-light rounded pb-2 px-2 pt-1 mt-1">
                                <IoTimeOutline className={` fs-5 text-secondary`} />
                            </span>
                            <div>
                                <small className="text-muted text-sm">Created date</small>
                                <div className="fw-medium text-md">{data.meta.createdDate}</div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={3} >
                        <div className="  d-flex align-items-center gap-3">
                            <span className="bg-light rounded pb-2 px-2 pt-1 mt-1">
                                <IoTimeOutline className={` fs-5 text-secondary`} />
                            </span>
                            <div>
                                <small className="text-muted text-sm">Created by</small>
                                <div className="fw-medium text-md">{data.meta.createdBy}</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Tabs defaultActiveKey="DistirbutorDetails" id="custom-tabs" className="custom-tab-bar mb-3 mt-3">

                    <Tab eventKey="DistirbutorDetails" title={<span> <FcViewDetails /> Distirbutor Details</span>}>
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
                                                            {
                                                                flag === "k" &&
                                                                <div className="d-flex gap-3 p-2 flex-column flex-sm-row">
                                                                    <CustomButton
                                                                        text="Accept"
                                                                        className="w-100 badge rounded-2 d-inline-flex fw-semibold align-items-center gap-1 px-2 py-2"
                                                                        style={{ backgroundColor: "#f07d3154", color: "#f76503ff" }}
                                                                        aria-label={`Accept ${doc.name}`}
                                                                    />

                                                                    <CustomButton
                                                                        text="Reject"
                                                                        className="w-100 badge rounded-2 d-inline-flex fw-semibold align-items-center gap-1 px-2 py-2"
                                                                        style={{ backgroundColor: "#a8000052", color: "#a80000ff" }}
                                                                        aria-label={`Reject ${doc.name}`}
                                                                    />
                                                                </div>
                                                            }
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
                    </Tab>

                    <Tab eventKey="Plan" title={<span><FcPlanner /> Plan</span>}>

                    </Tab>

                </Tabs>

            </Offcanvas.Body>
            {
                flag === "k" &&
                <>
                    <div className="d-flex justify-content-end  mb-3 gap-2">
                        <CustomButton
                            text="Cancel"
                            type="button"
                            className="px-4 text-dark"
                            variant="light"
                        // onClick={() => setIsShow()}
                        />
                        <CustomButton
                            text={'Reject'}
                            variant='danger'
                            className="px-4  text-white"
                            type="submit"
                            onClick={() => { setRemark(true) }}
                        />
                        <CustomButton
                            text={'Approve'}
                            className="px-4  text-white"
                            type="submit"
                        // onClick={() => { setIsShow(); setPageToggle && setPageToggle(true) }}
                        />
                    </div>
                </>
            }
        </Offcanvas >
    )
}

export default DistirbutorViewDtlMdl
