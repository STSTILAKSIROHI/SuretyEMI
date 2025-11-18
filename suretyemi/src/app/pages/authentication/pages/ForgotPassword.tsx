import React, { lazy, Suspense } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePhone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Textfield from "../../../component/TextInput";
import CustomButton from "../../../component/ui/customButton/CustomButton";
const LoginLayout = lazy(() => import('../layout/Layout'));

const ForgotPasswordSchema = Yup.object().shape({
    clientId: Yup.number()
        .typeError("Client ID must be a number")
        .required("Client ID is required"),
    userName: Yup.string().required("Username is required"),
    mobileNo: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
        .required("Mobile number is required"),
    captcha: Yup.string().required("Captcha is required"),
});



const ForgotPassword = () => {
    const navigate = useNavigate();
    const userForgotPassword = async (values: any, { resetForm }: any) => {
        try {
            const payload = {

            };
        } catch (error) { }
    };

    return (
        <Suspense>
            <LoginLayout title="Forgot Password !" Note="Please enter your details !" >
                <Formik
                    initialValues={{
                        clientId: "",
                        userName: "",
                        mobileNo: "",
                        captcha: "",
                    }}
                    validationSchema={ForgotPasswordSchema}
                    onSubmit={userForgotPassword}
                >
                    {({ values, handleSubmit, handleBlur, setFieldValue }) => (
                        <Form noValidate onSubmit={handleSubmit}>


                            {/* Username */}
                            <div>
                                <Textfield
                                    label="Username"
                                    name="userName"
                                    id="userName"
                                    placeholder="Username"
                                    maxLength={30}
                                    tabIndex={2}
                                    required
                                    value={values.userName}
                                    onChange={(e) => setFieldValue("userName", e.target.value.trim())}
                                    onBlur={handleBlur}
                                    // onChange={handleChange}
                                    IconProp={CgProfile}
                                />
                                <ErrorMessage name="userName" component="div" className="error-msg size-12px" />
                            </div>
                            <div className="mt-3" >
                                <Textfield
                                    label="Mobile No"
                                    name="mobileNo"
                                    type="text"
                                    id="mobileNo"
                                    size="sm"
                                    placeholder="Please enter Mobile No."
                                    tabIndex={3}
                                    maxLength={10}
                                    required
                                    value={values.mobileNo}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = /^[0-9]*[.,-]?[0-9]*$/;
                                        if (regex.test(value.toString())) {
                                            setFieldValue("mobileNo", value.trim());
                                        }
                                    }}
                                    onBlur={(e: any) => {
                                        handleBlur(e);
                                    }}
                                    IconProp={MdOutlinePhone}
                                />
                                <ErrorMessage name="mobileNo" component="div" className="error-msg size-12px" />
                            </div>

                            {/* Back to Login Link */}
                            <div className="d-flex mt-2 justify-content-end">
                                <Link
                                    to="/"
                                    className="text-end btn-secondary me-1"
                                    style={{ fontSize: "12px" }}
                                >
                                    Back To Login
                                </Link>
                            </div>
                            {/* Submit Button */}
                            <div className="mt-4">
                                <CustomButton
                                    text="Submit"
                                    variant="primary"
                                    className="px-3 py-2 w-100 "
                                    type="submit"
                                    onClick={() => navigate("/otp")}
                                />
                            </div>


                        </Form>
                    )}
                </Formik>
                {/* </Layout> */}
            </LoginLayout>
        </Suspense>
    );
};

export default ForgotPassword;
