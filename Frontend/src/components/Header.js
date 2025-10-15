import React from 'react';
import './css/Header.css';
// import companyLogo from '/images/company_logo3.jpg';




const Header = () => {
    return (
        <div className="header">
            <div className="logo-placeholder">
                 <img src={`${process.env.PUBLIC_URL}/images/company_logo3.jpg`} alt="Company Logo" />

            </div>
            <div className="header-text">
                <h1>OPTICO SOLUTIONS</h1>
                <p>HRMS [Employee Management]</p>
            </div>
        </div>
    );
};

export default Header;