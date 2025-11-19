import React, { useState } from 'react'
import Row from 'react-bootstrap/esm/Row'
import bgimage from '../../assests/Rectangle 6700.png'
import { GoDotFill } from "react-icons/go";
import { Button, Card, Col, Image } from 'react-bootstrap';
import { FiAlertCircle } from 'react-icons/fi';
import PlanCard from '../../component/planCard/PlanCard';
import RecurringMdl from '../../content/model/RecurringMdl';
import OTPVerify from './OTPVerify';
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

const CommissionCost: React.FC<Props> = ({ values, setFieldValue }) => {
    const [Recurring, setRecurring] = React.useState<boolean>(false);
    const [pagetogle, setPageToggle] = useState<boolean>(false);
    return (
        <>


            <Row>
                {
                    pagetogle === false &&
                    <Col sm={9} >
                        <div
                            className="position-relative"
                            style={{
                                height: "70vh",
                                overflow: "hidden",
                                background: "#f8f8f8",
                            }}
                        >

                            {/* Background blurred image */}
                            <Image
                                src={bgimage}
                                alt="Background"
                                className="w-100 h-100 position-absolute"
                                style={{ objectFit: "cover", filter: "blur(6px) brightness(1.05)", zIndex: 0, }}
                            />

                            {/* Card container */}
                            <div
                                className="position-absolute top-50 start-50 translate-middle"
                                style={{ width: "360px", zIndex: 5 }}
                            >
                                <PlanCard setRecurring={setRecurring} />
                            </div>
                        </div>
                    </Col>
                }
                {
                    pagetogle &&
                    <Col sm={9} >
                        <OTPVerify />
                    </Col>
                }
                <Col md={3} sm={12}>
                    <div className="p-3 border bg-light rounded">
                        <h6 className="text-primary"> <span><FiAlertCircle /></span> Instructions</h6>
                        {Instruction.map((instruction, i) => (
                            <div key={i} className="mt-3 bg-white rounded-2 d-flex gap-2 px-3 p-3 pt-3">
                                <p className="text-md mb-0"><span className='primary' ><FiAlertCircle /></span> {instruction.apiNm}</p>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>

            <RecurringMdl isShow={Recurring} setIsShow={() => { setRecurring(false) }} setFieldValue={setFieldValue} values={values} setPageToggle={setPageToggle} />


        </>
    )
}

export default CommissionCost
