import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../component/ui/customButton/CustomButton';
import TextArea from '../../component/ui/TextArea/TextArea';

interface Props {
    show: boolean;
    setShow: (val: boolean) => void;
}

const initialValues = {
    remark: '',
};

const validationSchema = Yup.object({
    remark: Yup.string()
        .required('Remark is required')
        .max(250, 'Remark must be at most 250 characters'),
});

const RemarkMdl: React.FC<Props> = ({ show, setShow }) => {
    const handleSubmit = (values: typeof initialValues) => {
        console.log('Submitted Remark:', values.remark);
        // Handle API call here if needed
        setShow(false);
    };

    return (
        <Modal show={show} centered className="reset-password-modal">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur }) => (
                    <Form>
                        <Modal.Body className="card-gradient-blueMdl px-4 py-4">

                            {/* Top Icon */}
                            <div className="d-grid justify-content-center text-center">
                                <div className="icon-circle p-1">
                                    <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="4.5" y="4" width="48" height="48" rx="24" fill="#F4EBFF" />
                                        <rect x="4.5" y="4" width="48" height="48" rx="24" stroke="#F9F5FF" strokeWidth="8" />
                                        <path
                                            d="M27.802 37.615C28.0234 37.7442 28.1341 37.8087 28.2903 37.8422C28.4116 37.8682 28.5884 37.8682 28.7097 37.8422C28.8659 37.8087 28.9766 37.7442 29.198 37.615C31.146 36.4785 36.5 32.9086 36.5 28.0001V23.2177C36.5 22.4182 36.5 22.0184 36.3692 21.6748C36.2537 21.3713 36.066 21.1004 35.8223 20.8856C35.5465 20.6426 35.1722 20.5022 34.4236 20.2215L29.0618 18.2108C28.8539 18.1328 28.75 18.0938 28.643 18.0784C28.5482 18.0647 28.4518 18.0647 28.357 18.0784C28.25 18.0938 28.1461 18.1328 27.9382 18.2108L22.5764 20.2215C21.8278 20.5022 21.4535 20.6426 21.1777 20.8856C20.934 21.1004 20.7463 21.3713 20.6308 21.6748C20.5 22.0184 20.5 22.4182 20.5 23.2177V28.0001C20.5 32.9086 25.854 36.4785 27.802 37.615Z"
                                            stroke="#7F56D9"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Textarea for Remark */}
                            <TextArea
                                label="Remark"
                                name="remark"
                                placeholder="Enter Remark"
                                value={values.remark}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <ErrorMessage name="remark" component="div" className="text-danger text-sm mt-1" />

                            {/* Buttons */}
                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <CustomButton
                                    text="Cancel"
                                    variant="transparent"
                                    type="button"
                                    className="py-2 px-4"
                                    onClick={() => setShow(false)}
                                />
                                <CustomButton
                                    text="Submit"
                                    type="submit"
                                    className="py-2 px-4"
                                />
                            </div>
                        </Modal.Body>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default RemarkMdl;
