/************************************************************
 * Component     : CustomButton
 * Description   : A reusable button component built on top of 
 *                React Bootstrap Button that supports:
 *                  - Different visual variants (primary, success, danger, etc.)
 *                  - Optional icon (React Icon or any React node)
 *                  - Optional text label
 *                  - Custom styles, additional CSS classes, and dot indicator
 *                  - Transparent variant with border styling
 * 
 * Props:
 *  - text        : (optional) Button label text
 *  - icon        : (optional) React Icon component or React node
 *  - variant     : (optional) Visual style variant (default: 'primary')
 *  - className   : (optional) Custom CSS class string
 *  - style       : (optional) Inline style overrides
 *  - dot         : (optional) CSS class for a dot indicator
 *  - type        : Button type attribute ('button', 'submit', etc.)
 *  - onClick     : Click event handler
 *  - ...rest     : Other HTML button attributes (e.g., disabled)
 * 
 * Usage Example:
 *  <CustomButton
 *    text="Save"
 *    icon={FiSave}
 *    variant="success"
 *    onClick={handleSave}
 *  />
 ************************************************************/

import React from "react";
import { Button } from "react-bootstrap";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import type { IconType } from "react-icons";

// Define allowed variants for styling
type VariantType =
  | "primary"
  | "success"
  | "danger"
  | "dark"
  | "light"
  | "theme"
  | "silver"
  | "transparent"
  | "SuccessTrans";

// Define component props interface
interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: any;
  icon?: IconType | React.ReactNode;
  variant?: VariantType;
  className?: string;
  style?: CSSProperties;
  dot?: string;
}

// Map variant to CSS variables for easy theming
const variantMap: Record<VariantType, string> = {
  primary: "var(--primaryColor)",
  success: "var(--successButton)",
  danger: "var(--dangerButton)",
  dark: "var(--darkButton)",
  light: "var(--lightButton)",
  theme: "var(--primaryBTN)",
  silver: "var(--silverButton)",
  transparent: "var(--transparentButton)",
  SuccessTrans: "var(--SuccessTrans)",
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  type = "button",
  icon,
  variant = "primary",
  className = "",
  onClick,
  style = {},
  dot,
  ...rest
}) => {
  const backgroundColor = variantMap[variant] || variantMap.primary;
  const isTransparent = variant === "transparent";

  return (
    <Button
      className={`btn d-flex align-items-center justify-content-center rounded-1 ${text ? "ps-3 pe-3" : ""} buttonHover ${className}`}
      style={{
        backgroundColor,
        fontSize: "12px",
        padding: "7px",
        border: isTransparent ? "1px solid rgba(228, 228, 228, 1)" : "none",
        color: isTransparent ? "rgb(80, 90, 102)" : undefined,
        ...style,
      }}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {typeof icon === "function" ? (
        React.createElement(icon, { size: 15, className: "" })
      ) : (
        icon
      )}

      {text && (
        <>
          <span className={dot}></span>
          <span className="mx-2">{text}</span>
        </>
      )}
    </Button>
  );
};

export default CustomButton;
