import React from 'react'
import { Card, Col, Image, Offcanvas, Row, Tab, Tabs } from 'react-bootstrap';
import { TbListDetails } from 'react-icons/tb';
import { customebankinfo, data } from '../../api/api';
import person from '../../assests/Ellipse 62.png';
import { RiCalendarScheduleLine, RiCommandLine, RiMoneyRupeeCircleFill } from "react-icons/ri";
import { PiListChecksFill, PiMoney } from "react-icons/pi";
import { GrScorecard, GrTransaction } from 'react-icons/gr';
import { SiVirustotal } from 'react-icons/si';
import { FcInfo } from 'react-icons/fc';
import { BsFillCollectionFill } from 'react-icons/bs';
import InstSched from '../table/InstSched';
import MandateInfoTbl from '../table/MandateInfoTbl';
import CollectionLogTbl from '../table/CollectionLogTbl';
interface Props {
    show: boolean;
    onHide: () => void
}
const CardDta = [
    {
        lable: "Loan Amount",
        value: "30,000"
    },
    {
        lable: "Total Paid",
        value: "30,000"
    },
    {
        lable: "%Total Paid",
        value: "20%"
    },
    {
        lable: "Total Interset",
        value: "20%"
    },
    {
        lable: "CIBIL Score",
        value: "20%"
    },
    {
        lable: "Total Mandate cost",
        value: "20%"
    }


]
const backgroundColors = [
    "#1f92550a",
    "#f07d3110",
    "#00000009",
    "#a3ff5d1c",
    "#6d1dc217",
    "#ffd78e2f",
];
const textColors = [
    "#1F384C",
    "#F07E31",
    "#000000",
    "#265701ff",
    "#6D1DC2",
    "#9A5700",
]

const iconList = [
    <RiMoneyRupeeCircleFill size={30} />,
    <PiListChecksFill size={30} />,
    <GrTransaction size={30} />,
    <PiMoney size={30} />,
    <GrScorecard size={30} />,
    <SiVirustotal size={30} />,
];

const CustomerDetailsMdl: React.FC<Props> = ({ show, onHide }) => {
    return (
        <>
            <Offcanvas
                show={show}
                onHide={onHide}
                placement="end"
                className="custom-offcanvas px-3"
                style={{ width: "60%", maxWidth: "100%", borderRadius: "10px" }}
            >
                <Offcanvas.Header closeButton>
                    <div>
                        <h5 className="mb-0 mt-2"><strong> <TbListDetails /> Customer <span className="primary">Details</span></strong></h5>
                    </div>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                        <Image style={{ height: "60px" }} src={person} fluid alt="avatar" />
                        <div>
                            <h6 className="mb-0" style={{ fontSize: '14px' }}>
                                Prateek Suthar
                            </h6>
                            <span className="text-sm">ID : STS2025</span>
                        </div>
                        <div className="vl" />
                        <div> <h6 className="mb-0 light-color" style={{ fontSize: '14px' }}>Distirbutor Code</h6><span className="text-sm fw-bold">{data.profile.distributorCode}</span>
                        </div>
                    </div>
                    <hr />
                    <Row>
                        {
                            CardDta.map((cardDta, index) => {
                                const bgColor = backgroundColors[index % backgroundColors.length];
                                const textColor = textColors[index % textColors.length];
                                const iconName = iconList[index % iconList.length];
                                return (
                                    <Col key={index} sm={2} >
                                        <Card style={{ backgroundColor: bgColor, color: textColor }} className='text-center border-0' >
                                            <div className='mt-2 mb-1'>
                                                {iconName}
                                            </div>

                                            <h5 className='m-0' >{cardDta.value}</h5>
                                            <p>{cardDta.lable}</p>
                                        </Card>
                                    </Col>
                                )
                            })
                        }

                    </Row>
                    <hr />
                    <Tabs defaultActiveKey="InstallmentSchedule" id="custom-tabs" className="custom-tab-bar mb-3 mt-3">

                        <Tab eventKey="InstallmentSchedule" title={<span><RiCalendarScheduleLine className='text-success' />  Installment Schedule</span>}>
                            <InstSched />
                        </Tab>

                        <Tab eventKey="Mandate&BankInfo" title={<span> <FcInfo /> Mandate & Bank Info</span>}>
                            <Row className='g-4 mt-2 mb-3'>
                                {customebankinfo.map((stat, index) => (
                                    <Col key={index} xs="auto" className='me-4'>
                                        <div className='d-flex flex-column'>
                                            <span className='text-muted small mb-1' style={{ fontSize: '12px', fontWeight: '500' }}>
                                                {stat.label}
                                            </span>
                                            <span className={`fs-6 `}>
                                                {stat.value}
                                            </span>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                            <MandateInfoTbl />
                        </Tab>
                        <Tab eventKey="Mandate-Col--His-Tran" title={<span> <BsFillCollectionFill className='text-danger' />  Collection History / Transaction</span>}>
                            <CollectionLogTbl />
                        </Tab>
                        <Tab eventKey="General-info" title={<span> <RiCommandLine /> General info</span>}>

                        </Tab>

                    </Tabs>

                </Offcanvas.Body>
            </Offcanvas >
        </>
    )
}

export default CustomerDetailsMdl
