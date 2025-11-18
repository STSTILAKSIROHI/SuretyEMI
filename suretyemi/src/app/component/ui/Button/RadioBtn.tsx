import React from 'react';
import "./RadioBtn.css";

type radioBtnProps = {
    label: string,
    name: any,
    value?: any,
    checked?: any,
    onChange?: any,
    className?: any,
    disabled?: boolean,
    id?: string,
}

const RadioBtn = ({ label, name, value, checked, onChange, className, disabled, id }: radioBtnProps) => {
    return (
        <div className={`radio-Btn ${className}`}>
            <label className='text-md' htmlFor={id}><input type="radio" name={name} value={value} checked={checked} onChange={onChange} disabled={disabled} id={id} /> {label}</label>
        </div>
    )
}

export default RadioBtn
