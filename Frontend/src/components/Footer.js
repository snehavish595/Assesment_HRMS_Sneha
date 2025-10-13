import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUsers, FaUserTie, FaSignInAlt, FaSignOutAlt, FaTasks, FaClipboardCheck } from 'react-icons/fa';
import './css/Footer.css';

const Footer = () => {
    const { isLoggedIn, logout, role } = useAuth();
    const location = useLocation();

    const isCurrentPath = (path) => location.pathname === path;

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        window.location.href = '/';
    };

    return (
        <footer className="footer">
            <nav className="footer-nav">
                <NavLink to="/">
                    <FaHome className="footer-icon" />
                    <span className="footer-text">Home</span>
                </NavLink>

                {isLoggedIn ? (
                    <>
                        {role === 'HR' && (
                            <>
                                <NavLink 
                                    to="/add-employee"
                                    className={isCurrentPath('/add-employee') ? 'active' : ''}
                                >
                                    <FaUsers className="footer-icon" />
                                    <span className="footer-text">Add Emp</span>
                                </NavLink>

                                <NavLink 
                                    to="/manage-employee"
                                    className={isCurrentPath('/manage-employee') ? 'active' : ''}
                                >
                                    <FaTasks className="footer-icon" />
                                    <span className="footer-text">Manage</span>
                                </NavLink>

                                <NavLink 
                                    to="/approval"
                                    className={isCurrentPath('/approval') ? 'active' : ''}
                                >
                                    <FaClipboardCheck className="footer-icon" />
                                    <span className="footer-text">Approval</span>
                                </NavLink>
                            </>
                        )}

                        {role === 'Employee' && (
                            <>
                                <NavLink 
                                    to="/emp-dashboard"
                                    className={isCurrentPath('/emp-dashboard') ? 'active' : ''}
                                >
                                    <FaHome className="footer-icon" />
                                    <span className="footer-text">Dashboard</span>
                                </NavLink>
                                <NavLink 
                                    to="/emp-request"
                                    className={isCurrentPath('/emp-request') ? 'active' : ''}
                                >
                                    <FaTasks className="footer-icon" />
                                    <span className="footer-text">Request</span>
                                </NavLink>
                            </>
                        )}

                        <button onClick={handleLogout} className="footer-logout-btn">
                            <FaSignOutAlt className="footer-icon" />
                            <span className="footer-text">Logout</span>
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/manage-employee">
                            <FaUsers className="footer-icon" />
                            <span className="footer-text">EMP</span>
                        </NavLink>
                        
                        <NavLink to="/add-employee">
                            <FaUserTie className="footer-icon" />
                            <span className="footer-text">HR</span>
                        </NavLink>

                        <NavLink to="/login">
                            <FaSignInAlt className="footer-icon" />
                            <span className="footer-text">Login</span>
                        </NavLink>
                    </>
                )}
            </nav>
        </footer>
    );
};

export default Footer;