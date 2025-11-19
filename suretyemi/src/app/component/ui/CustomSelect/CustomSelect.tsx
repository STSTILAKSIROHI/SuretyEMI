import React from "react";
import Select, { components } from "react-select";
import "./Select.css"; // Common CSS

type OptionType = {
    label: string;
    value: string | boolean;
};

type CustomSelectProps = {
    label?: string;
    placeholder?: string;
    name?: string;
    options?: OptionType[];
    value?: any;
    onChange?: (value: OptionType | OptionType[] | null) => void;
    isSearchable?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    required?: boolean;
    isMulti?: boolean;
    autoFocus?: boolean;
    onBlur?: any;
    menuPlacement?: "top" | "bottom" | "auto";
    tabIndex?: any;
    styles?: any;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
    label,
    placeholder = "Select",
    name,
    options,
    value,
    onChange,
    isSearchable = true,
    isDisabled = false,
    isLoading = false,
    required = false,
    isMulti = false,
    onBlur,
    autoFocus,
    tabIndex,
    styles,
    menuPlacement = "auto",
}) => {
    return (
        <div className={required ? "select-required" : ""} style={styles}>
            {label && (
                <label
                    className={`input-label ps-1 text-md ${required ? "required" : ""}`}
                >
                    {label}
                </label>
            )}

            <Select
                className="select-form"
                name={name}
                placeholder={placeholder}
                styles={styles}
                options={options}
                required={required}
                autoFocus={autoFocus}
                menuPlacement={menuPlacement}
                isSearchable={isSearchable}
                isDisabled={isDisabled}
                isMulti={isMulti}
                isLoading={isLoading}
                value={value}
                onChange={(selected: any) => {
                    if (isMulti) {
                        onChange?.(selected as OptionType[]);
                    } else {
                        onChange?.(selected as OptionType);
                    }
                }}
                onBlur={onBlur}
                tabIndex={tabIndex}
            />
        </div>
    );
};

export default CustomSelect;
