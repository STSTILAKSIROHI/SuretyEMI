import React, { useState } from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { GoDotFill } from 'react-icons/go'
import CustomButton from '../ui/customButton/CustomButton';
import { BiSolidOffer } from 'react-icons/bi';
import svgicon from '../../assests/svg/offersicon.svg';
interface props {
    setRecurring: (value: boolean) => void
}
const plantype = [
    { apiNm: "One Time" },
    { apiNm: "Recurring" }
];
const PlanCard: React.FC<props> = ({ setRecurring }) => {
    const [selectedPlan, setSelectedPlan] = useState<string>("One Time");
    return (
        <Card className="shadow-lg p-4 rounded-4">

            {/* Toggle */}
            <div className="d-flex justify-content-center mb-3">
                <div className="d-flex bg-light rounded-pill p-1 gap-2 shadow-sm" >
                    {plantype.map((type, i) => (
                        <CustomButton
                            text={type.apiNm}
                            variant={`${type.apiNm === selectedPlan ? "primary" : "transparent"}`}
                            className="flex-fill rounded-pill border-0 py-1"
                            onClick={() => {
                                setSelectedPlan(type.apiNm)
                            }
                            }
                        />
                    ))}
                </div>
            </div>

            {/* Profile icon */}
            <div className=" mb-2">
                <div>
                    <Image src={svgicon} alt="Offer Icon" />
                </div>
            </div>

            {/* Titles */}
            <h5 className=" mb-0">Business</h5>
            <p className=" text-muted" style={{ fontSize: "14px" }}>
                One-Time Onboarding Charges
            </p>

            {/* Amount */}
            <h2 className="fw-bold text-center mb-3">₹100000</h2>

            {/* Pay now button */}
            <CustomButton
                className="w-100 mb-3"
                variant="transparent"
                text="Pay Now"
                icon={BiSolidOffer}
                style={{ border: "1px solid #ccc", fontWeight: 500, padding: "8px 0", }}
                onClick={() => {
                    if ("Recurring" === selectedPlan) {
                        setRecurring(true);
                    }
                }}
            />

            <hr />

            {/* Charges Section */}
            <h6 className="fw-bold">Charges</h6>

            <ul className="list-unstyled mt-2" style={{ lineHeight: "1.9" }}>
                <li className='text-sm' >
                    <GoDotFill size={18} className="text-primary" />
                    Application Fee / Software License = ₹50,000
                </li>
                <li className='text-sm' >
                    <GoDotFill size={18} className="text-primary" />
                    Mobile Controller App Activation = ₹25,000
                </li>
                <li className='text-sm' >
                    <GoDotFill size={18} className="text-primary" />
                    Wallet Activation Fee = ₹10,000
                </li>
                <li className='text-sm' >
                    <GoDotFill size={18} className="text-primary" />
                    Admin Account Setup = ₹15,000
                </li>
            </ul>

            <p className="text-primary" style={{ cursor: "pointer" }}>
                More Details→
            </p>
        </Card>
    )
}

export default PlanCard
