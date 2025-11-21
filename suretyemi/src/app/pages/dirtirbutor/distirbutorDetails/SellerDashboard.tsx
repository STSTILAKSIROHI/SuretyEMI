
import { Card, Col, Row, Badge, Image } from 'react-bootstrap';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaHandHoldingUsd, FaFileInvoiceDollar, FaMobileAlt, FaExclamationCircle } from "react-icons/fa";
import person from '../../../assests/Ellipse 62.png'
import CustomButton from '../../../component/ui/customButton/CustomButton';
import { useNavigate } from 'react-router-dom';
import { TiArrowBack } from "react-icons/ti";
import TradeChart from '../../../component/charts/TradeChart';
import DonutChart from '../../../component/charts/DonutChart';
import CustomerTbl from '../../../content/table/CustomerTbl';
import CustomerDetailsMdl from '../../../content/model/CustomerDetailsMdl';
import { useState } from 'react';
import { boolean } from 'yup';

// --- 1. Stats Data ---
const statsCards = [
    {
        title: "Total EMI Process",
        value: "₹1232",
        percent: "+1.29%",
        icon: <FaHandHoldingUsd size={20} />,
        color: "#5e5ce6",
        bg: "#eef2ff",
        pBg: "#ffeded",
        pColor: "#ff5b5c"
    },
    {
        title: "Total Transactions",
        value: "4325",
        percent: "+1.29%",
        icon: <FaFileInvoiceDollar size={20} />,
        color: "#28c76f",
        bg: "#e5f8ed",
        pBg: "#e5f8ed",
        pColor: "#28c76f"
    },
    {
        title: "Active Device",
        value: "500",
        percent: "+1.29%",
        icon: <FaMobileAlt size={20} />,
        color: "#7367f0",
        bg: "#e0cffc",
        pBg: "#e0cffc",
        pColor: "#7367f0"
    },
    {
        title: "Failed EMI",
        value: "500",
        percent: "+1.29%",
        icon: <FaExclamationCircle size={20} />,
        color: "#ea5455",
        bg: "#fceaea",
        pBg: "#ffeded",
        pColor: "#ff5b5c"
    },
];

const SellerDashboard = () => {
    const [showCusDtl, setShowCusDtl] = useState<boolean>(false);
    const navigate = useNavigate()

    return (
        <div className='pe-3 ps-3 mt-3  mb-2'>
            <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                <h5 className='fw-bold mb-0'>Seller <span className="text-primary">Details</span></h5>
                <CustomButton
                    text="Bank"
                    variant='transparent'
                    icon={<TiArrowBack size={23} className='text-success' />}
                    className="border"
                    type="button"
                    onClick={() => navigate('/distributor/details')}

                />
            </div>
            <div className=" d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    <Image style={{ height: "60px" }} src={person} fluid alt="avatar" />
                    <div>
                        <h6 className="mb-0" style={{ fontSize: '14px' }}>
                            Seller prime pro
                        </h6>
                        <span className="text-sm">Electronics</span>
                    </div>
                    <div className="vl" />
                    <div> <h6 className="mb-0 light-color" style={{ fontSize: '14px' }}>seller Code</h6><span className="text-sm fw-bold">STS2032-2025</span>
                    </div>
                </div>
                <Badge bg="light" className="text-success px-3 py-2 rounded-pill text-sm border border-success bg-opacity-10">
                    Active
                </Badge>
            </div>

            {/* --- STATS CARDS --- */}
            <Row className="g-3 mb-3 mt-3">
                {statsCards.map((item, index) => (
                    <Col md={3} key={index}>
                        <Card className={`h-100 border-0
                             ${item.title === "Total EMI Process" ?
                                "card-gradient-blue" : item.title === "Total Transactions" ? "card-gradient-green"
                                    : item.title === "Active Device" ? "card-gradient-purple" :
                                        item.title === "Failed EMI" ? "card-gradient-pink" : " "}`}>
                            <Card.Body className="p-4">

                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="p-2 rounded-3" style={{ backgroundColor: item.bg, color: item.color }}>
                                        {item.icon}
                                    </div>
                                    <BiDotsVerticalRounded className="text-muted cursor-pointer" />
                                </div>
                                <small className="text-muted d-block mb-1">{item.title}</small>
                                <div className="d-flex justify-content-between align-items-end">
                                    <h4 className="fw-bold mb-0">{item.value}</h4>
                                    <span className="px-2 py-1 rounded-pill text-xs fw-bold" style={{ backgroundColor: item.pBg, color: item.pColor, fontSize: '11px' }}>
                                        {item.percent}
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* --- CHARTS SECTION --- */}
            <Row className="g-3 mb-4">
                <Col lg={8}>
                    <TradeChart />
                </Col>

                {/* Donut Chart */}
                <Col lg={4}>
                    <DonutChart />
                </Col>
            </Row>
            <CustomerTbl setShowCusDtl={() => setShowCusDtl(true)} />
            <CustomerDetailsMdl show={showCusDtl} onHide={() => setShowCusDtl(false)} />
        </div>
    )
}

export default SellerDashboard;