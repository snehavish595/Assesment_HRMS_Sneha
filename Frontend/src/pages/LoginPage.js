import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './css/LoginPage.css';

const LoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    // Pre-select role if passed from Footer NavLink
    const initialRole = location.state?.role || '';
    const [loginAs, setLoginAs] = useState(initialRole);
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Update role if location state changes (optional)
        if (location.state?.role) {
            setLoginAs(location.state.role);
        }
    }, [location.state]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!loginAs || !loginId.trim() || !password.trim()) {
            alert('Please fill in all the required fields.');
            return;
        }

        try {
            // Backend login API
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: loginId,
                password: password,
            });

            if (response.data.success) {
                const user = response.data.user;
                const token = response.data.token;

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', user.role);
                localStorage.setItem('email', user.email);
                localStorage.setItem('authToken', token);

                login(user.role);
                alert('Login Successful! (Database)');

                if (user.role === 'HR') navigate('/add-employee');
                else navigate('/emp-dashboard');
            }
        } catch (error) {
            console.error("Login Error:", error);

            // Fallback: frontend local login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('role', loginAs);
            localStorage.setItem('email', loginId);
            localStorage.setItem('authToken', 'fallback-token-' + Date.now());

            login(loginAs);
            alert('Login Successful! (Local Mode)');

            if (loginAs === 'HR') navigate('/add-employee');
            else navigate('/emp-dashboard');
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="container login-page-container">
            <main className="login-main">
                <div className="login-box">
                    <h2>LOGIN</h2>
                    <p className="login-subtext">
                        Use any credentials to login
                    </p>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="login-as">Login As</label>
                            <select
                                id="login-as"
                                value={loginAs}
                                onChange={(e) => setLoginAs(e.target.value)}
                                required
                            >
                                <option value="" disabled>-- Select Role --</option>
                                <option value="HR">HR</option>
                                <option value="Employee">Employee</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-id">Employee ID</label>
                            <input
                                type="email"
                                id="login-id"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                placeholder="Enter any email"
                                required
                            />
                        </div>

                        <div className="form-group password-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter any password"
                                    required
                                />
                                <span 
                                    className="password-toggle-icon" 
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={!loginAs || !loginId || !password}
                        >
                            Login
                        </button>
                    </form>

                    <a href="#" className="forgot-password">Forgot Password?</a>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
