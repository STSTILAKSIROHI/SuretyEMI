import React, { useState, useEffect } from "react";
import "./Otp.css"
import { Link, useNavigate } from "react-router-dom";
import OtpField from "../../../component/otpField/OtpField";
import LoginLayout from "../layout/Layout";
import { Button } from "react-bootstrap";
import { convertMinutesSeconds } from "../../utils/helper";

const OtpVerificationForm = () => {
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
    const navigate = useNavigate();
    const initialTime = 120;
    const { convertedminutes, convertedseconds } = convertMinutesSeconds(initialTime);
    const [minutes, setMinutes] = useState(convertedminutes);
    const [seconds, setSeconds] = useState(convertedseconds);

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prev) => prev - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                } else {
                    setMinutes((prev) => prev - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [minutes, seconds]);


    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [minutes, seconds]);


    useEffect(() => {
        const isComplete = otpValues.every(val => val !== "" && val === "9");

        if (isComplete) {
            navigate('/dashboard');
        }
    }, [otpValues, navigate]);



    return (
        <>

            <LoginLayout title="Welcome back !" Note="Please enter your credentials to sign in !">
                <div className="otp-input-container m-0">
                    <OtpField
                        name="Otp"
                        otpValues={otpValues}
                        setOtpValues={setOtpValues}
                    />
                </div>
                <div className="otp-footer tex-center  mt-2">

                    {/* <span className="text-secondary">Didn't get OTP Code?</span> */}

                    <div className="otp-timer text-center">
                        {(seconds > 0 || minutes > 0) ? (
                            <p>
                                You can resend OTP after this{" "}
                                {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </p>
                        ) : (
                            <Button variant="transparent" className="text-primary text-xs">
                                Resend OTP
                            </Button>
                        )}
                    </div>
                </div>

                <div className="text-center text-primary  text-sm mt-3">
                    <Link to="/" className='ms-1' >
                        Back to login
                    </Link>
                </div>
            </LoginLayout>
        </>
    );
};

export default OtpVerificationForm;
