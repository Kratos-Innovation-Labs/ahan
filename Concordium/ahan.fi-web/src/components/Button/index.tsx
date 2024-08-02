import React, { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.scss";
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

const Button: React.FC<IButtonProps> = ({ children, variant = "primary", ...rest }) => {
  return (
    <button className={`btn-${variant}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
