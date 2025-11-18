import React, { ChangeEventHandler } from "react";
import './Textfield.css';
import { Form, InputGroup } from "react-bootstrap";

interface props {
  label?: string;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
  IconProp?: any;
  className?: string;
  size?: "sm" | "lg" | undefined;
  placeholder?: string;
  style?: {};
  width?: string;
  value?: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: any;
  onKeyDown?: any;
  onKeyUp?: any;
  readOnly?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: any;
  max?: any;
  multiline?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  step?: number;
  autoFocus?: boolean;
  onInput?: any;
  EyeIconProp?: any
  suffix?: React.ReactNode;
  onFocus?: any;
  inputGroupLeft?: any;
  inputGroupRight?: any;
}

const Textfield = ({ label, type, name, id, required, onInput, IconProp, EyeIconProp, size, placeholder, style, width, value, onBlur, onChange, readOnly, maxLength, minLength, min, max, onKeyDown, onKeyUp, multiline, disabled, tabIndex, step, autoFocus, suffix, onFocus, inputGroupLeft, inputGroupRight }: props) => {

  return (
    <div className="textfield" style={{ width: width }}>
      <div className="material-textfield">
        {label &&
          <label className={`input-label text-xs ${required ? 'required' : ''}`}
            style={{ fontSize: "12px" }}
          >
            {label}
          </label>
        }

        <InputGroup >
          {inputGroupLeft}
          <Form.Control
            placeholder={placeholder ? placeholder : ""}
            type={type ? type : "text"}
            className={`form-control customShadow ${IconProp ? "paddingforIcon-sm" : ""}  ${type == "file" ? "input-file" : ""}    `}
            style={{ ...style }}
            size={size}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            readOnly={readOnly}
            tabIndex={tabIndex}
            min={min}
            max={max}
            autoFocus={autoFocus}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            maxLength={maxLength}
            minLength={minLength}
            multiple={multiline}
            disabled={disabled}
            autoComplete="off"
            step={step}
            onInput={onInput}
            onFocus={onFocus}

          />

          {inputGroupRight}

          {suffix &&
            <InputGroup.Text className="subfix-box">
              {suffix}
            </InputGroup.Text>
          }
        </InputGroup>

        {IconProp &&
          <div className="form-icon">
            <IconProp className="text-slate-700" />
          </div>
        }

        {EyeIconProp &&
          <div className="form-icon-eye">
            <EyeIconProp className="text-slate-700" />
          </div>
        }
      </div>
    </div >
  )
};

export default Textfield;

