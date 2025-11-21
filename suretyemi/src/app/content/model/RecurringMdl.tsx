import React, { useEffect, useState } from 'react';
import { Col, Row, Modal, Card, Badge, Button } from 'react-bootstrap';
import { ErrorMessage } from 'formik';
import CustomSelect from '../../component/ui/CustomSelect/CustomSelect';
import CustomDateTimePicker from '../../component/ui/DatetimePicker/DateTimePicker';
import { LiaRupeeSignSolid, LiaCalendarAlt } from "react-icons/lia";
import { FaCheckCircle, FaRegCalendarTimes, FaSyncAlt } from "react-icons/fa";
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

interface ScheduleItem {
    date: string;
    amount: number;
    remaining: number;
    rawDate: Date; // Kept for logic
}

const RecurringMdl: React.FC<Props> = ({ isShow, setIsShow, setFieldValue, values, isLoading = false, setPageToggle }) => {

    // --- LOCAL STATE FOR CUSTOMIZATION ---
    const [totalAmount, setTotalAmount] = useState<number>(100000);
    const [numCycles, setNumCycles] = useState<number>(6);
    const [scheduleList, setScheduleList] = useState<ScheduleItem[]>([]);

    // To prevent auto-calculation from overwriting manual edits immediately
    const [isManualEdit, setIsManualEdit] = useState(false);

    // --- 1. GENERATE SCHEDULE LOGIC ---
    const generateSchedule = () => {
        if (!values.scheduleDate || !values.recurringFrequency || !numCycles || !totalAmount) return;

        const startDate = new Date(values.scheduleDate);
        let newSchedules: ScheduleItem[] = [];
        let remaining = totalAmount;

        // Calculate base amount (floor to keep clean numbers, add remainder to last)
        const baseAmount = Math.floor(totalAmount / numCycles);

        for (let i = 0; i < numCycles; i++) {
            const next = new Date(startDate);

            // Frequency logic
            switch (values.recurringFrequency) {
                case "monthly": next.setMonth(startDate.getMonth() + i); break;
                case "weekly": next.setDate(startDate.getDate() + 7 * i); break;
                case "quarterly": next.setMonth(startDate.getMonth() + 3 * i); break;
                case "yearly": next.setFullYear(startDate.getFullYear() + i); break;
                default: next.setMonth(startDate.getMonth() + i);
            }

            // Last cycle gets the remainder to ensure total is exact
            let cycleAmount = (i === numCycles - 1)
                ? totalAmount - (baseAmount * (numCycles - 1))
                : baseAmount;

            remaining -= cycleAmount;

            newSchedules.push({
                date: next.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
                rawDate: next,
                amount: cycleAmount,
                remaining: Math.max(remaining, 0),
            });
        }
        setScheduleList(newSchedules);
        setIsManualEdit(false); // Reset manual flag
    };

    // --- 2. EFFECT: Auto-generate when key inputs change (unless manual editing is locked) ---
    useEffect(() => {
        // Only auto-generate if user hasn't started manually customizing specific rows
        // OR if they change the core frequency/date which forces a rebuild
        if (!isManualEdit) {
            generateSchedule();
        }
    }, [values.scheduleDate, values.recurringFrequency, numCycles, totalAmount]);


    // --- 3. HANDLE MANUAL AMOUNT CHANGE ---
    const handleAmountChange = (index: number, newAmountStr: string) => {
        setIsManualEdit(true); // Lock auto-generation
        const newAmount = parseFloat(newAmountStr) || 0;

        const updatedList = [...scheduleList];
        updatedList[index].amount = newAmount;

        // Recalculate Remaining Balance based on new amounts
        let currentBalance = totalAmount;

        updatedList.forEach((item) => {
            currentBalance -= item.amount;
            item.remaining = currentBalance; // Allow negative if they overpay
        });

        setScheduleList(updatedList);
    };

    // Helper to reset manual edits
    const handleResetSchedule = () => {
        setIsManualEdit(false);
        generateSchedule();
    }

    return (
        <Modal
            show={isShow}
            onHide={setIsShow}
            size="xl"
            centered
            backdrop="static"
            className="custom-modal"
        >
            <Modal.Header closeButton className="border-0 pb-0">
                <div>
                    <h5 className="mb-1 fw-bold">
                        Recurring Payment Setup
                    </h5>
                    <p className="text-muted small mb-0">Configure installments and customize amounts</p>
                </div>
            </Modal.Header>

            <Modal.Body className="p-0" style={{ minHeight: '550px' }}>
                <Row className="h-100 g-0">

                    {/* LEFT SIDE - SETTINGS */}
                    <Col lg={5} className="p-4 border-end">

                        {/* Total Amount Input */}
                        <div className="mb-3">
                            <Textfield
                                label="Total Loan/Charge Amount"
                                name="totalAmount"
                                type="number"
                                value={totalAmount}
                                onChange={(e) => setTotalAmount(Number(e.target.value))}
                                placeholder="Enter total amount"
                                className="fw-bold text-primary"
                            />
                        </div>

                        <Row className="g-3 mb-3">
                            {/* Recurring Frequency */}
                            <Col md={6}>
                                <CustomSelect
                                    label="Frequency"
                                    placeholder="Select"
                                    name="recurringFrequency"
                                    value={values.recurringFrequency ? { value: values.recurringFrequency, label: values.recurringFrequencylbl } : null}
                                    options={[
                                        { value: "weekly", label: "Weekly" },
                                        { value: "monthly", label: "Monthly" },
                                        { value: "quarterly", label: "Quarterly" },
                                        { value: "yearly", label: "Yearly" },
                                    ]}
                                    onChange={(option: any) => {
                                        setFieldValue("recurringFrequency", option.value);
                                        setFieldValue("recurringFrequencylbl", option.label);
                                        setIsManualEdit(false); // Reset manual edits on frequency change
                                    }}
                                />
                            </Col>

                            {/* Number of Cycles Input */}
                            <Col md={6}>
                                <Textfield
                                    label="No. of Installments"
                                    name="numCycles"
                                    type="number"
                                    value={numCycles}
                                    onChange={(e) => {
                                        setNumCycles(Number(e.target.value));
                                        setIsManualEdit(false);
                                    }}
                                    placeholder="e.g. 6, 12"
                                />
                            </Col>
                        </Row>

                        {/* Start Date */}
                        <div className="mb-4">
                            <CustomDateTimePicker
                                label="First Payment Date"
                                placeholder="Select start date"
                                value={values.scheduleDate || null}
                                onChange={(date) => {
                                    setFieldValue("scheduleDate", date);
                                    setIsManualEdit(false);
                                }}
                                date={true}
                            />
                        </div>

                        <hr className="text-muted opacity-25 my-4" />

                        {/* Auto Debit Options */}
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
                                        Deduct payment automatically from wallet.
                                    </p>
                                </div>
                            </div>
                            {values.autoDebit && (
                                <div className="mt-3 ps-4 animation-fade-in">
                                    <Textfield
                                        label="Min. Wallet Balance Required"
                                        name="minAmount"
                                        type='number'
                                        value={values.minAmount}
                                        onChange={(e) => setFieldValue("minAmount", e.target.value)}
                                        className='bg-white'
                                    />
                                </div>
                            )}
                        </div>
                    </Col>

                    {/* RIGHT SIDE — SCHEDULE EDITABLE LIST */}
                    <Col lg={7} className="bg-light p-0 d-flex flex-column">
                        <div className="p-3 border-bottom bg-white d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fw-bold text-uppercase text-muted small mb-1">Payment Schedule</h6>
                                <h5 className="fw-bold mb-0 text-primary">
                                    <LiaRupeeSignSolid /> {totalAmount.toLocaleString()}
                                    <span className="text-muted fs-6 ms-2 fw-normal">/ {numCycles} cycles</span>
                                </h5>
                            </div>
                            {isManualEdit && (
                                <Button variant="outline-warning" size="sm" onClick={handleResetSchedule}>
                                    <FaSyncAlt className="me-1" /> Reset Calculation
                                </Button>
                            )}
                        </div>

                        <div className="p-3 overflow-auto custom-scrollbar" style={{ maxHeight: '500px' }}>
                            {scheduleList.length === 0 ? (
                                <div className="text-center py-5 opacity-50">
                                    <FaRegCalendarTimes size={40} className="mb-3 text-secondary" />
                                    <p className="text-muted fw-medium">Set frequency and date to generate schedule.</p>
                                </div>
                            ) : (
                                <div className="timeline-wrapper">
                                    {scheduleList.map((item, index) => (
                                        <div key={index} className="d-flex mb-2 align-items-center">

                                            {/* Index Number */}
                                            <div className="me-3 text-center" style={{ minWidth: '30px' }}>
                                                <span className="badge bg-light text-dark border rounded-circle p-2" style={{ width: '30px', height: '30px' }}>
                                                    {index + 1}
                                                </span>
                                            </div>

                                            {/* Editable Card */}
                                            <Card className={`border-0 shadow-sm w-100 ${index % 2 === 0 ? '' : 'bg-white'}`}>
                                                <Card.Body className="p-2 d-flex align-items-center">

                                                    {/* Date Display */}
                                                    <div className="col-3 border-end pe-2">
                                                        <small className="text-muted d-block text-uppercase" style={{ fontSize: '10px' }}>Due Date</small>
                                                        <div className="fw-bold d-flex align-items-center text-dark">
                                                            <LiaCalendarAlt className="me-1 text-primary" /> {item.date}
                                                        </div>
                                                    </div>

                                                    {/* Editable Amount Input */}
                                                    <div className="col-5 px-3">
                                                        <small className="text-muted d-block" style={{ fontSize: '10px' }}>Installment Amount</small>
                                                        <div className="input-group input-group-sm">
                                                            <span className="input-group-text bg-transparent border-0 ps-0">₹</span>
                                                            <input
                                                                type="number"
                                                                className="form-control fw-bold text-dark border-top-0 border-start-0 border-end-0 rounded-0 px-0 bg-transparent"
                                                                value={item.amount}
                                                                onChange={(e) => handleAmountChange(index, e.target.value)}
                                                                style={{ boxShadow: 'none' }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Remaining Balance */}
                                                    <div className="col-4 text-end border-start ps-2">
                                                        <small className="text-muted d-block" style={{ fontSize: '10px' }}>Remaining</small>
                                                        <span className={`fw-bold ${item.remaining < 0 ? 'text-danger' : 'text-success'}`}>
                                                            ₹ {item.remaining.toLocaleString()}
                                                        </span>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}

                                    {/* Balance Validation Warning */}
                                    {scheduleList.length > 0 && scheduleList[scheduleList.length - 1].remaining !== 0 && (
                                        <div className="alert alert-warning mt-3 d-flex align-items-center p-2 small">
                                            <FaCheckCircle className="me-2" />
                                            <span>
                                                <strong>Note:</strong> Total schedule amount does not match Total Loan Amount.
                                                Difference: {scheduleList[scheduleList.length - 1].remaining}
                                            </span>
                                        </div>
                                    )}
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
                            <span><FaCheckCircle className="text-success me-1" /> <strong>{scheduleList.length}</strong> installments defined</span>
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
                            text={!isLoading ? 'Confirm Schedule' : 'Processing...'}
                            className="px-4 bg-primary text-white"
                            type="submit"
                            // Disable if processing or if the math doesn't add up (optional validation)
                            disabled={isLoading || scheduleList.length === 0}
                            onClick={() => {
                                // You might want to pass the custom 'scheduleList' back to the parent here
                                setFieldValue('customSchedule', scheduleList);
                                setIsShow();
                                setPageToggle && setPageToggle(true);
                            }}
                        />
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default RecurringMdl;