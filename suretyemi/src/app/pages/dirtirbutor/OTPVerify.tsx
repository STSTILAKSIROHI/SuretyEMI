import React, { useEffect, useState } from 'react'
import OtpField from '../../component/otpField/OtpField'
import { convertMinutesSeconds } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Button } from 'react-bootstrap';

function OTPVerify() {
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
    const initialTime = 120;
    const { convertedminutes, convertedseconds } = convertMinutesSeconds(initialTime);
    const [minutes, setMinutes] = useState(convertedminutes);
    const [seconds, setSeconds] = useState(convertedseconds);


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


    return (
        <>

            <fieldset className="border rounded-3 h-100  d-flex justify-content-center align-items-center p-3">
                <div>
                    <h5 className="text-center primary">OTP verification </h5>
                    <p className="text-center">Enter the OTP sent to your registered mobile number.</p>
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
                                    <span className='primary' >{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                                </p>
                            ) : (
                                <Button variant="transparent" className="text-primary text-xs">
                                    Resend OTP
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </fieldset>
        </>
    )
}

export default OTPVerify
