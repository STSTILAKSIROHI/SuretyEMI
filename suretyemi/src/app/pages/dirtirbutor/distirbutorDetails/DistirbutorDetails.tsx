import React from 'react'
import { Image, Tab, Tabs } from 'react-bootstrap'
import person from '../../../assests/Ellipse 62.png'
import { FcPlanner, FcShop, FcViewDetails } from 'react-icons/fc'
import PersonalInfo from './PersonalInfo'
import SellerInfo from './SellerInfo'
import { GrTransaction } from "react-icons/gr";
import TransactionLogs from './TransactionLogs'
import PlanLog from './PlanLog'
import CustomButton from '../../../component/ui/customButton/CustomButton'
import { TiArrowBack } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

const DistirbutorDetails = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='mt-3 ps-3 pe-3' >
                <div className='d-flex justify-content-between' >
                    <h5 className='primary'>Distirbutor Details</h5>
                    <CustomButton
                        text="Bank"
                        variant='transparent'
                        icon={<TiArrowBack size={23} className='text-success' />}
                        className="border"
                        type="button"
                        onClick={() => navigate('/distributor')}

                    />
                </div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    <Image style={{ height: "60px" }} src={person} fluid alt="avatar" />
                    <div>
                        <h6 className="mb-0" style={{ fontSize: '14px' }}>
                            DistirbutorPrime private limited
                        </h6>
                        <span className="text-sm">Private Limited</span>
                    </div>
                    <div className="vl" />
                    <div> <h6 className="mb-0 light-color" style={{ fontSize: '14px' }}>Distirbutor Code</h6><span className="text-sm fw-bold">STS2032-2025</span>
                    </div>
                </div>
                <hr />
                <Tabs defaultActiveKey="DistirbutorDetails" id="custom-tabs" className="custom-tab-bar mb-3 mt-3">

                    <Tab eventKey="DistirbutorDetails" title={<span> <FcViewDetails /> Distirbutor Details</span>}>
                        <PersonalInfo />
                    </Tab>

                    <Tab eventKey="Sellerinfo" title={<span><FcShop /> Seller info</span>}>
                        <SellerInfo />
                    </Tab>
                    <Tab eventKey="TransactionLogs" title={<span><GrTransaction style={{ color: "blue" }} /> Transaction Logs</span>}>
                        <TransactionLogs />
                    </Tab>
                    <Tab eventKey="PlanLog" title={<span><FcPlanner style={{ color: "blue" }} /> Plan Logs</span>}>
                        <PlanLog />
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default DistirbutorDetails
