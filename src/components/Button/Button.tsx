import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./Button.module.scss";
const cx = classNames.bind(styles);

interface ButtonProps {
    to?: string
    href?: string
    primary?: boolean
    outline?: boolean
    text?: boolean
    rounded?: boolean
    disabled?: boolean
    small?: boolean
    large?: boolean
    className?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    onClick?: () => void
    children?: React.ReactNode
}


const Button: React.FC<ButtonProps> = ({ to, href, primary = false, outline = false, text = false, rounded = false, disabled = false, small = false, large = false, children, className, leftIcon, rightIcon, onClick }) => {

    const Component: React.ElementType = to ? Link : href ? 'a' : 'button';

    const props: React.HTMLProps<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement> = {
        onClick,
        ...(href ? { href } : {}),
        ...(to ? { to } : {})
    };

    if (disabled) {
        props.onClick = undefined
    }

    const classes = cx('button', {
        primary,
        outline,
        text,
        disabled,
        rounded,
        small,
        large,
        [className || '']: className,
    });

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={styles['icon']}>{leftIcon}</span>}
            <span className={styles['content']}>{children}</span>
            {rightIcon && <span className={styles['icon']}>{rightIcon}</span>}
        </Component>
    )
}

export default Button