import React, { useMemo } from 'react';
import { Col, Row, Modal, Card, Badge } from 'react-bootstrap';
import { ErrorMessage } from 'formik';
import CustomSelect from '../../component/ui/CustomSelect/CustomSelect';
import CustomDateTimePicker from '../../component/ui/DatetimePicker/DateTimePicker';
import { LiaRupeeSignSolid, LiaCalendarAlt } from "react-icons/lia";
import { FaCheckCircle, FaRegCalendarTimes } from "react-icons/fa";
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

const RecurringMdl: React.FC<Props> = ({ isShow, setIsShow, setFieldValue, values, isLoading = false, setPageToggle }) => {

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
            size="xl" // Changed to XL for better side-by-side view
            centered
            backdrop="static"
            className="custom-modal"
        >
            <Modal.Header closeButton className="border-0 pb-0">
                <div>
                    <h5 className="mb-1 fw-bold">
                        Recurring Charge Setup
                    </h5>
                    <p className="text-muted small mb-0">Configure automatic payment schedules</p>
                </div>
            </Modal.Header>

            <Modal.Body className="p-0" style={{ minHeight: '500px' }}>
                <Row className="h-100 g-0">

                    {/* LEFT SIDE - FORM INPUTS */}
                    <Col lg={7} className="p-4 border-end">

                        {/* Amount Summary Card */}
                        <div className="bg-primary bg-opacity-10 rounded-3 p-3 mb-4 border border-primary border-opacity-25 d-flex justify-content-between align-items-center">
                            <div>
                                <span className="text-primary fw-semibold text-uppercase small" style={{ letterSpacing: '1px' }}>Total Amount</span>
                                <h2 className="primary mb-0 fw-bold d-flex align-items-center">
                                    <LiaRupeeSignSolid />
                                    {amount.toLocaleString()}
                                </h2>
                            </div>
                            <div className="text-end">
                                <Badge bg="primary" className="px-3 py-2 rounded-pill">6 Cycles</Badge>
                            </div>
                        </div>

                        <Row className="g-3">
                            {/* Recurring Type */}
                            <Col md={6}>
                                <div className="mb-1">
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
                                    <ErrorMessage name="recurringType" component="div" className="text-danger text-xs mt-1" />
                                </div>
                            </Col>

                            {/* Recurring Frequency */}
                            <Col md={6}>
                                <div className="mb-1">
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
                                    <ErrorMessage name="recurringFrequency" component="div" className="text-danger text-xs mt-1" />
                                </div>
                            </Col>

                            {/* Start Date */}
                            <Col md={12}>
                                <div className="mb-3">
                                    <CustomDateTimePicker
                                        label="Schedule Start Date"
                                        placeholder="Select start date"
                                        value={values.scheduleDate || null}
                                        onChange={(date) => setFieldValue("scheduleDate", date)}
                                        date={true}
                                        time={false}
                                        required={false}
                                        height="45px"
                                    />
                                    <ErrorMessage name="scheduleDate" component="div" className="text-danger text-xs mt-1" />
                                </div>
                            </Col>
                        </Row>

                        <hr className="text-muted opacity-25 my-4" />

                        <div className='p-3 bg-light rounded-3 border'>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Checkbox
                                        label="Enable Auto Debit"
                                        name="autoDebit"
                                        checked={values.autoDebit}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("autoDebit", e.target.checked)}
                                        textclass="text-dark fw-bold"
                                    />
                                    <p className='text-muted small ps-4 mb-0 mt-1'>
                                        Automatically deducts payment from the distributor wallet on the due date.
                                    </p>
                                </div>
                            </div>

                            {values.autoDebit && (
                                <div className="mt-3 ps-4 animation-fade-in">
                                    <Textfield
                                        label="Minimum Wallet Balance"
                                        name="minAmount"
                                        type='number'
                                        placeholder="e.g. 5000"
                                        value={values.minAmount}
                                        onChange={(e) => setFieldValue("minAmount", e.target.value)}
                                        required={false}
                                        className='bg-white'
                                    />
                                    <ErrorMessage name="minAmount" component="div" className="text-danger text-xs" />
                                </div>
                            )}
                        </div>
                    </Col>

                    {/* RIGHT SIDE — SCHEDULE TIMELINE */}
                    <Col lg={5} className="bg-light p-0 d-flex flex-column">
                        <div className="p-4 border-bottom bg-white">
                            <h6 className="fw-bold text-uppercase text-muted small mb-1">Preview</h6>
                            <h5 className="fw-bold mb-0">Payment Timeline</h5>
                        </div>

                        <div className="p-4 overflow-auto custom-scrollbar" style={{ maxHeight: '500px' }}>
                            {scheduleList.length === 0 ? (
                                <div className="text-center py-5 opacity-50">
                                    <FaRegCalendarTimes size={40} className="mb-3 text-secondary" />
                                    <p className="text-muted fw-medium">Select a frequency and start date<br />to view the schedule.</p>
                                </div>
                            ) : (
                                <div className="timeline-wrapper">
                                    {scheduleList.map((item, index) => (
                                        <div key={index} className="d-flex mb-0 position-relative timeline-item">
                                            {/* Timeline Line & Dot */}
                                            <div className="d-flex flex-column align-items-center me-3" style={{ width: '24px' }}>
                                                <div className={`rounded-circle d-flex align-items-center justify-content-center ${index === 0 ? 'bg-primary text-white shadow-sm' : 'bg-white border border-2 border-primary'}`}
                                                    style={{ width: '24px', height: '24px', zIndex: 2, fontSize: '10px' }}>
                                                    {index + 1}
                                                </div>
                                                {index !== scheduleList.length - 1 && (
                                                    <div className="bg-primary opacity-25" style={{ width: '2px', flexGrow: 1, minHeight: '40px' }}></div>
                                                )}
                                            </div>

                                            {/* Card Content */}
                                            <Card className="border-0 shadow-sm mb-3 w-100 hover-elevate">
                                                <Card.Body className="p-3">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <div className="text-muted small d-flex align-items-center">
                                                            <LiaCalendarAlt className="me-1" /> {item.date}
                                                        </div>
                                                        {index === 0 && <Badge bg="success" className='rounded-1'>First Payment</Badge>}
                                                    </div>

                                                    <div className="d-flex justify-content-between align-items-end">
                                                        <div>
                                                            <span className="text-xs text-muted text-uppercase fw-bold">Debit Amount</span>
                                                            <h5 className="text-dark fw-bold mb-0">₹ {item.amount.toLocaleString()}</h5>
                                                        </div>
                                                        <div className="text-end">
                                                            <span className="text-xs text-muted d-block">Balance Left</span>
                                                            <span className="text-sm text-dark fw-medium">₹ {item.remaining.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer className="bg-white border-top px-4 py-3">
                <div className='d-flex w-100 justify-content-between align-items-center'>
                    <div className="text-muted small">
                        {scheduleList.length > 0 &&
                            <span><FaCheckCircle className="text-success me-1" /> Ready to schedule <strong>{scheduleList.length}</strong> payments</span>
                        }
                    </div>
                    <div className="d-flex gap-2">
                        <CustomButton
                            text="Cancel"
                            type="button"
                            className="px-4"
                            variant="light"
                            onClick={() => setIsShow()}
                        />
                        <CustomButton
                            text={!isLoading ? 'Confirm Setup' : 'Processing...'}
                            className="px-4 bg-primary text-white"
                            type="submit"
                            disabled={isLoading || scheduleList.length === 0}
                            onClick={() => { setIsShow(); setPageToggle && setPageToggle(true) }}
                        />
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default RecurringMdl;