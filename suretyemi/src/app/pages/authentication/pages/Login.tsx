// Purpose: Login Screen Template (UI Only)
// Created by: Tilak Kumar
// Created Date: 25-07-2025
import { lazy } from "react";
import Textfield from "../../../component/TextInput";
import CustomButton from "../../../component/ui/customButton/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbLock } from "react-icons/tb";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";


// lazy imports
const LoginLayout = lazy(() => import("../layout/Layout"));

function Login() {
    const navigate = useNavigate();

    // Validation schema
    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .max(30, "Maximum 30 characters allowed")
            .required("Username is required"),
        password: Yup.string()
            .max(30, "Maximum 30 characters allowed")
            .required("Password is required"),
    });

    return (
        <LoginLayout title="Welcome back !" Note="Please enter your credentials to sign in !">
            <Formik
                initialValues={{ userName: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log("Form data", values);
                    setTimeout(() => {
                        setSubmitting(false);
                        navigate("/dashboard");
                    }, 600);
                }}
            >
                {({ handleChange, values, isSubmitting }) => (
                    <FormikForm noValidate>
                        <div className="mt-2">
                            <Textfield
                                label="Username"
                                name="userName"
                                id="userName"
                                placeholder="Username"
                                maxLength={30}
                                IconProp={CgProfile}
                                value={values.userName}
                                onChange={handleChange}
                                required
                                className="rounded-input"
                                aria-label="Username"
                            />
                            <ErrorMessage name="userName" component="div" className="text-danger text-sm" />

                            <div className="mt-3">
                                <Textfield
                                    label="Password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    maxLength={30}
                                    IconProp={TbLock}
                                    value={values.password}
                                    onChange={handleChange}
                                    required
                                    className="rounded-input"
                                    aria-label="Password"
                                />
                                <ErrorMessage name="password" component="div" className="text-danger text-sm" />
                            </div>

                            <div className="d-flex justify-content-end mt-2">
                                <Link to="/forgotpwd" className="text-end btn-secondary me-1 text-md small-link">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* <Row className="align-items-center">
                                <Col sm={6} className="mt-3">
                                    <div
                                        className="captcha-wrap d-flex align-items-center justify-content-between form-control customShadow p-2"
                                        style={{ gap: 8, maxHeight: 40 }}
                                    >
                                        <button
                                            type="button"
                                            className="captcha-image-btn p-0 bg-transparent border-0"
                                            onClick={handleRefreshCaptcha}
                                            aria-label="Refresh captcha"
                                            title="Refresh captcha"
                                        >
                                            <Image style={{ height: 30, width: "auto" }} className="img-fluid rounded" src={captch} alt="Captcha" />
                                        </button>

                                        <div className="d-flex align-items-center">
                                            <button
                                                type="button"
                                                className="btn btn-light btn-sm ms-2 captcha-refresh-btn"
                                                onClick={handleRefreshCaptcha}
                                                aria-label="Refresh captcha"
                                                title="Refresh captcha"
                                            >
                                                <LuRefreshCcw />
                                            </button>
                                        </div>
                                    </div>
                                </Col>

                                <Col sm={6} className="mt-3">
                                    <Textfield
                                        type="text"
                                        name="captcha"
                                        id="captcha"
                                        placeholder="Enter Captcha"
                                        maxLength={30}
                                        value={values.captcha}
                                        onChange={handleChange}
                                        required
                                        className="rounded-input"
                                        aria-label="Enter captcha"
                                    />
                                    <ErrorMessage name="captcha" component="div" className="text-danger text-sm" />
                                </Col>
                            </Row> */}

                            <div className="mt-4">
                                <CustomButton
                                    text={isSubmitting ? "Signing in..." : "Login"}
                                    variant="primary"
                                    className="px-3 py-2 w-100"
                                    type="submit"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </FormikForm>
                )}
            </Formik>
        </LoginLayout>
    );
}

export default Login;
