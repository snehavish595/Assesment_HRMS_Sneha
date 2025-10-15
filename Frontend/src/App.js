import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AddEmployeePage from './pages/AddEmployeePage';
import ManageEmployeePage from './pages/ManageEmployeePage';
import ApprovalPage from './pages/ApprovalPage';
import EmpDashboardPage from './pages/EmpDashboardPage';
import EmpRequestPage from './pages/EmpRequestPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
    // Use the correct basename depending on environment
    const basename = process.env.NODE_ENV === 'production' ? '/Assesment_HRMS_Sneha' : '/';

    return (
        <BrowserRouter basename={basename}>
            <AuthProvider>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/add-employee"
                            element={
                                <ProtectedRoute allowedRoles={['HR']}>
                                    <AddEmployeePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/manage-employee"
                            element={
                                <ProtectedRoute allowedRoles={['HR', 'Employee']}>
                                    <ManageEmployeePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/approval"
                            element={
                                <ProtectedRoute allowedRoles={['HR']}>
                                    <ApprovalPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/emp-dashboard"
                            element={
                                <ProtectedRoute allowedRoles={['Employee']}>
                                    <EmpDashboardPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/emp-request"
                            element={
                                <ProtectedRoute allowedRoles={['Employee']}>
                                    <EmpRequestPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <Footer />
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
