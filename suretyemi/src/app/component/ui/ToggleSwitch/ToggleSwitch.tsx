import React from 'react';
import './ToggleSwitch.css';

type ToggleSwitchProps = {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
    id?: string;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    label ='',
    checked,
    onChange,
    className = '',
    disabled = false,
    id,
}) => {
    return (
        <div className={`toggle-switch  text-sm ${className}`}>
            <label className={`switch gap-2 ${disabled ? 'disabled' : ''}`} htmlFor={id}>
                <span >{label}</span>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    id={id}
                />
                <span className="slider" />
            </label>
        </div>
    );
};

export default ToggleSwitch;
