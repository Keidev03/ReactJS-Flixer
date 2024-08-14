import React from 'react';
import './GlobalStyles.scss';

interface GlobalStylesProps {
    children: React.ReactNode
}

const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => {
    return <div className={"light-theme"}>{children}</div>
}

export default GlobalStyles