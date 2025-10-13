import React, { useState } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import './css/EmpDashboardPage.css';

const EmpDashboardPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Dummy data for employee dashboard
    const employeeData = {
        name: 'Ashish Sharma',
        code: 'OS2401001',
        department: 'Development',
        project: 'Web Development',
        email: 'ashish.sharma@company.com',
        doj: '2024-01-15',
        status: 'Active'
    };

    const requestHistory = [
        { id: 1, type: 'Leave Request', status: 'Approved', date: '2024-01-10', details: 'Annual Leave - 5 days' },
        { id: 2, type: 'Project Change', status: 'Pending', date: '2024-01-12', details: 'Request to move to Mobile Development' },
        { id: 3, type: 'Leave Request', status: 'Approved', date: '2024-01-05', details: 'Sick Leave - 2 days' },
        { id: 4, type: 'Project Change', status: 'Disapproved', date: '2024-01-03', details: 'Request to move to AI/ML team' },
    ];

    const totalPages = Math.ceil(requestHistory.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRequests = requestHistory.slice(startIndex, startIndex + itemsPerPage);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Approved': return 'status-approved';
            case 'Pending': return 'status-pending';
            case 'Disapproved': return 'status-disapproved';
            default: return 'status-default';
        }
    };

    return (
        <div className="container">
            {/* <Header /> */}
            <main className="emp-dashboard-main">
                <div className="emp-dashboard-content">
                    <h2>Employee Dashboard</h2>
                    
                    {/* Employee Info Card */}
                    <div className="employee-info-card">
                        <h3>Personal Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Name:</label>
                                <span>{employeeData.name}</span>
                            </div>
                            <div className="info-item">
                                <label>Employee Code:</label>
                                <span>{employeeData.code}</span>
                            </div>
                            <div className="info-item">
                                <label>Department:</label>
                                <span>{employeeData.department}</span>
                            </div>
                            <div className="info-item">
                                <label>Project:</label>
                                <span>{employeeData.project}</span>
                            </div>
                            <div className="info-item">
                                <label>Email:</label>
                                <span>{employeeData.email}</span>
                            </div>
                            <div className="info-item">
                                <label>Date of Joining:</label>
                                <span>{employeeData.doj}</span>
                            </div>
                            <div className="info-item">
                                <label>Status:</label>
                                <span className={`status-badge ${employeeData.status.toLowerCase()}`}>
                                    {employeeData.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Request History */}
                    <div className="request-history-section">
                        <h3>Request History</h3>
                        <div className="requests-table-container">
                            <table className="requests-table">
                                <thead>
                                    <tr>
                                        <th>Sr.</th>
                                        <th>Request Type</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedRequests.map((request, index) => (
                                        <tr key={request.id}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{request.type}</td>
                                            <td>
                                                <span className={`status-badge ${getStatusClass(request.status)}`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td>{request.date}</td>
                                            <td>{request.details}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="pagination">
                            <button 
                                disabled={currentPage === 1} 
                                onClick={() => setCurrentPage(prev => prev - 1)}
                            >
                                &lt;
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                                <button
                                    key={num}
                                    className={currentPage === num ? "active" : ""}
                                    onClick={() => setCurrentPage(num)}
                                >
                                    {num}
                                </button>
                            ))}

                            <button 
                                disabled={currentPage === totalPages} 
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default EmpDashboardPage;
