import React from 'react';
import logo from "assets/images/logo.png"


const Logo = ({ ...props }) => {  
    if (props.logoUrl)
        return (<img src={`${props.logoUrl}`} className={`logo ${props.className}`}  alt="Logo" />)
    return (<img src={logo} className={`logo ${props.className}`}  alt="Logo" />)
}

export default Logo;