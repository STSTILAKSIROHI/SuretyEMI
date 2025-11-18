import React from 'react'
interface AvatarProps {
    name?: string;
    src?: string;
    size: string
    rounded?: boolean;
    className?: string;
    color?: boolean
}
const Avatar: React.FC<AvatarProps> = ({ name, src, size, rounded, className, color = false }) => {
    const firstTwoLetters = name && name.slice(0, 1);
    let randomNumber = Math.floor(Math.random() * 16777215);
    let hexColor = "#" + randomNumber.toString(16).padStart(6, "0");
    return (
        <div
            style={{ backgroundColor: ` ${color ? hexColor : "#ffe0d4ff"}`, height: `${size}`, width: `${size}`, padding: "11px 0px 9px 0px", }}
            className={` primary  d-flex align-items-center justify-content-center overflow-hidden rounded-2  ${rounded ? "rounded-circle" : ""} px-3 ${className ? className : ""}`} >
            {name && (<span style={{ color: ` ${color ? "#fff" : ""} ` }} className='text-sm'>{firstTwoLetters}</span>)}
            {src && (<img alt='avatar' src={src} className={`${rounded ? "rounded-circle" : ""}`} />)}
        </div>
    )
}
export default Avatar
