// Layout.tsx
import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import leftimage from "../../../../app/assests/image 2 (1).png";
import { Link } from "react-router-dom";

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    Note?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = "", Note = "" }) => {
    return (
        <div className="auth-page-bg">
            <div className="auth-outer-card">
                {/* decorative top-right circle */}
                <div className="auth-decor-circle" />

                <Row className="g-0 align-items-stretch">
                    {/* Left Image Section */}
                    <Col md={6} className="left-panel d-none d-md-flex">
                        <div className="left-panel-inner">
                            <div className="left-content">
                                {/* small logo at top-left inside left panel */}
                                <div className="left-top-logo">
                                    <Image style={{ height: "37px" }} src="https://suretytelco.com/resources/assets/img/new-logo.png" alt="Surety telco" fluid />
                                </div>

                                {/* tagline bubble */}
                                <div className="left-tagline text-center">
                                    Smart EMI Management for Digital <span className="primary" >Lending Platforms.</span>
                                </div>

                                {/* main blurred dashboard image */}
                                <div className="left-illustration">
                                    <Image src={leftimage} alt="Illustration" fluid />
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Right Side Form Section */}
                    <Col xs={12} md={6} className="right-panel d-flex align-items-center justify-content-center">
                        <div className="w-100" style={{ maxWidth: "420px" }}>
                            {title && <h3 className="mb-2 fw-semibold">{title}</h3>}
                            {Note && <p className=" text-muted text-sm fw-medium">{Note}</p>}

                            <div className="mt-4">{children}</div>
                            <div className='d-flex align-items-center justify-content-center'>
                                <img className="m-2 mt-4" src="https://suretytelco.com/resources/assets/img/new-logo.png" height={30} width={80} alt="image" />
                            </div>

                            <div className="mt-3">
                                <p className="text-center" style={{ fontSize: "12px" }}>
                                    Developed by{" "}
                                    <Link to="https://suretytelco.com/" target="_blank" className="text-primary text-decoration-none">
                                        SURETY-TELCO
                                    </Link>{" "}
                                    | Sales by{" "}
                                    <Link to="https://soft-techsolutions.com/" target="_blank" className="text-primary text-decoration-none">
                                        SOFT-TECH SOLUTION
                                    </Link>{" "}
                                    | © 2014 - {new Date().getFullYear()} All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Layout;
