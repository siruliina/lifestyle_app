import React from "react";
import { IoIosMore } from "react-icons/io";
import "../css/components/CustomDropdownToggle.css";

type CustomToggleProps = {
    children?: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export const CustomToggle = React.forwardRef<
    HTMLAnchorElement,
    CustomToggleProps
>(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {/* Render custom icon here */}
        <div className="toggle-button">
            <IoIosMore size="1.2rem" />
        </div>

        {children}
    </a>
));
