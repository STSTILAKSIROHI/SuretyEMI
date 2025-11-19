import React, { useMemo } from 'react';
import { Col, Row, Modal, Card } from 'react-bootstrap';
import { ErrorMessage } from 'formik';
import CustomSelect from '../../component/ui/CustomSelect/CustomSelect';
import CustomDateTimePicker from '../../component/ui/DatetimePicker/DateTimePicker';
import { LiaRupeeSignSolid } from "react-icons/lia";
import CustomButton from '../../component/ui/customButton/CustomButton';
import Checkbox from '../../component/ui/checkBox/Checkbox';
import Textfield from '../../component/TextInput';

interface Props {
    isShow: boolean;
    setIsShow: () => void;
    setFieldValue: (field: string, value: any) => void;
    values: any;
    isLoading?: boolean
    resetForm?: any;
    setPageToggle?: (value: boolean) => void;
}

const RecurringMdl: React.FC<Props> = ({ isShow, setIsShow, setFieldValue, values, isLoading = false, resetForm, setPageToggle }) => {

    const [amount] = React.useState<number>(100000);

    const scheduleList = useMemo(() => {
        if (!values.scheduleDate || !values.recurringFrequency) return [];

        const totalAmount = amount;
        const cycles = 6;

        const perCycleAmount = Math.floor(totalAmount / cycles);
        let remaining = totalAmount;

        const schedules: { date: string; amount: number; remaining: number }[] = [];
        const startDate = new Date(values.scheduleDate);

        for (let i = 0; i < cycles; i++) {
            const next = new Date(startDate);

            switch (values.recurringFrequency) {
                case "monthly":
                    next.setMonth(startDate.getMonth() + i);
                    break;
                case "weekly":
                    next.setDate(startDate.getDate() + (7 * i));
                    break;
                case "quarterly":
                    next.setMonth(startDate.getMonth() + (3 * i));
                    break;
                case "yearly":
                    next.setFullYear(startDate.getFullYear() + i);
                    break;
            }

            // last cycle receives leftover
            const cycleAmount = i === cycles - 1
                ? remaining
                : perCycleAmount;

            remaining -= cycleAmount;

            schedules.push({
                date: next.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }),
                amount: cycleAmount,
                remaining: remaining
            });
        }

        return schedules;

    }, [values.scheduleDate, values.recurringFrequency, amount]);


    return (
        <Modal
            show={isShow}
            onHide={setIsShow}
            // size="md"
            centered
            backdrop="static"
            className="custom-modal"


        >
            <Modal.Header closeButton className="border-0">
                <h5 className="mb-0">
                    <strong>
                        Recurring charge <span className="primary">setup</span>
                    </strong>
                </h5>
            </Modal.Header>

            {/* AMOUNT HEADER */}
            <div className="px-4 py-2">
                <h3 className="primary mb-0">
                    <LiaRupeeSignSolid className="mb-1" />
                    {amount.toLocaleString()}
                </h3>
                <span className="text-dark-emphasis">Amount of charge</span>
            </div>

            <Modal.Body style={{ maxHeight: "60vh" }} className="pt-0  overflow-scroll">
                <Row>

                    {/* LEFT SIDE FORM */}
                    <Col lg={12} md={12}>

                        {/* Recurring Type */}
                        <div className="mb-3">
                            <CustomSelect
                                label="Recurring Type"
                                placeholder="Select type"
                                name="recurringType"
                                required
                                value={
                                    values.recurringType
                                        ? { value: values.recurringType, label: values.recurringTypelbl }
                                        : null
                                }
                                options={[
                                    { value: "online", label: "Online" },
                                    { value: "offline", label: "Offline" },
                                ]}
                                onChange={(option) => {
                                    if (option && !Array.isArray(option)) {
                                        setFieldValue("recurringType", option.value);
                                        setFieldValue("recurringTypelbl", option.label);
                                    }
                                }}
                            />
                            <ErrorMessage name="recurringType" component="div" className="text-danger text-sm" />
                        </div>

                        {/* Recurring Frequency */}
                        <div className="mb-3">
                            <CustomSelect
                                label="Recurring Frequency"
                                placeholder="Select frequency"
                                name="recurringFrequency"
                                required
                                value={
                                    values.recurringFrequency
                                        ? { value: values.recurringFrequency, label: values.recurringFrequencylbl }
                                        : null
                                }
                                options={[
                                    { value: "yearly", label: "Yearly" },
                                    { value: "monthly", label: "Monthly" },
                                    { value: "quarterly", label: "Quarterly" },
                                    { value: "weekly", label: "Weekly" },
                                ]}
                                onChange={(option) => {
                                    if (option && !Array.isArray(option)) {
                                        setFieldValue("recurringFrequency", option.value);
                                        setFieldValue("recurringFrequencylbl", option.label);
                                    }
                                }}
                            />
                            <ErrorMessage name="recurringFrequency" component="div" className="text-danger text-sm" />
                        </div>

                        {/* Start Date */}
                        <div className="mb-3">
                            <CustomDateTimePicker
                                label="Schedule Date"
                                placeholder="Start date"
                                value={values.scheduleDate || null}
                                onChange={(date) => setFieldValue("scheduleDate", date)}
                                date={true}
                                time={false}
                                required={false}
                                height="40px"
                            />
                            <ErrorMessage name="scheduleDate" component="div" className="text-danger text-sm" />
                        </div>
                        <div className='mt-1' >
                            <Checkbox
                                label="Auto Debit"
                                name="autoDebit"
                                checked={values.autoDebit}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("autoDebit", e.target.checked)}
                                textclass="text-primary fw-semibold"
                            />
                            <p className='text-sm px-4 ms-1' >Enables auto debit from distributor wallet.</p>
                        </div>
                        {
                            values.autoDebit && ((
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Textfield
                                        label="Min amount"
                                        name="minAmount"
                                        type='text'
                                        placeholder="Enter minimum amount"
                                        value={values.minAmount}
                                        onChange={(e) => setFieldValue("minAmount", e.target.value)}
                                        required={false}
                                        className='mb-3'
                                    />
                                    <ErrorMessage name="minAmount" component="div" className="text-danger text-sm" />
                                </Col>

                            ))
                        }
                    </Col>

                    {/* RIGHT SIDE — SCHEDULE LIST */}
                    <Col lg={12} md={12} className="ps-4 mt-3">

                        <h5 className="fw-bold  mb-3">Upcoming Schedule</h5>

                        {scheduleList.length === 0 ? (
                            <p className="text-muted">Fill details to generate schedule.</p>
                        ) : (
                            <Card className="p-3 shadow-sm">

                                {scheduleList.map((item, index) => (
                                    <div
                                        key={index}
                                        className="d-flex justify-content-between align-items-center border-bottom py-2"
                                    >
                                        <div>
                                            <span className="fw-semibold text-dark">Cycle {index + 1}</span> <br />
                                            <span className="text-muted small">{item.date}</span>
                                        </div>

                                        <div className="text-end">
                                            <div className="fw-bold text-primary">
                                                ₹ {item.amount.toLocaleString()}
                                            </div>
                                            <div className="text-muted small">
                                                Remaining: ₹ {item.remaining.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </Card>
                        )}

                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <div className='d-flex gap-3'>
                    {/* Cancel button */}
                    <CustomButton text="Cancel"
                        type="button" className="py-2 px-4"
                        variant="transparent"
                        onClick={() => setIsShow()

                        }
                    />

                    <CustomButton
                        text={!isLoading ? 'Submit' : 'Loading...'}
                        className="py-2 px-4 bg-btn"
                        type="submit"
                        disabled={isLoading}
                        onClick={() => { setIsShow(); setPageToggle && setPageToggle(true) }}
                    />


                </div>
            </Modal.Footer>

        </Modal>
    );
};

export default RecurringMdl;
