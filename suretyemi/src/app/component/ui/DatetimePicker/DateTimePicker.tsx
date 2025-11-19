/************************************************************
// Component     : Custom Date/Time Picker
// Purpose       : Reusable date and/or time picker using flatpickr
// Created by    : Prateek
// Created Date  : 14-08-2025
// Description   : Shows date picker, time picker, or both based on props
************************************************************/

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Choose theme

type Props = {
    label?: string;
    value: any | null;
    onChange: (date: Date | null) => void;
    date?: boolean; // show date picker
    time?: boolean; // show time picker
    required: boolean;
    placeholder?: string;
    name?: string;
    height?: string;
};

export default function CustomDateTimePicker({
    label,
    value,
    onChange,
    required = false,
    date = true,
    time = false,
    name,
    placeholder = "Select...",
    height = "40px"
}: Props) {
    const options: any = {
        enableTime: time,
        noCalendar: !date,
        static: true,
        dateFormat: date && time ? "Y-m-d H:i" : date ? "Y-m-d" : "H:i",
        time_24hr: false,
        closeOnSelect: false,
        minuteIncrement: 1,
        maxDate: new Date(),
    };

    // Conditional style for time-only mode

    return (
        <div
            className={`custom-datetime-picker ${time && !date ? "time-only" : ""}`}
            style={{ display: "flex", flexDirection: "column" }}
        >
            <label className="text-md ps-1" style={{ fontWeight: "500", color: "#333" }}>
                {label} {required ? (<span className="text-danger">*</span>) : ("")}
            </label>
            <Flatpickr
                name={name}
                value={value || undefined}
                options={options}
                onChange={
                    date
                        ? (selectedDates: any) =>
                            onChange(selectedDates.length > 0 ? selectedDates[0] : null)
                        : undefined
                }
                onClose={
                    time && !date
                        ? (selectedDates: any) =>
                            onChange(selectedDates.length > 0 ? selectedDates[0] : null)
                        : undefined
                }
                placeholder={placeholder}
                className="form-control text-md ps-3"
                style={{ minHeight: height }}
            />
        </div>
    );
}
