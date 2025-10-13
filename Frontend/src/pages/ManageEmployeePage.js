import React, { useState } from 'react';
import './css/ManageEmployeePage.css';

const ManageEmployeePage = ({ employees }) => {
    const [selectedDept, setSelectedDept] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const itemsPerPage = 5;

    // Dummy data
    const dummyEmployees = [
        { sr: 1, name: 'Ashish Sharma', code: 'EMP001', dept: 'IT', proj: 'Project A' },
        { sr: 2, name: 'Priya Singh', code: 'EMP002', dept: 'HR', proj: 'Project B' },
        { sr: 3, name: 'Rahul Jain', code: 'EMP003', dept: 'IT', proj: 'Project C' },
        { sr: 4, name: 'Anjali Gupta', code: 'EMP004', dept: 'MK', proj: 'Project D' },
        { sr: 5, name: 'Vikram Yadav', code: 'EMP005', dept: 'HR', proj: 'Project A' },
    ];

    const filteredEmployees = selectedDept === 'All'
        ? dummyEmployees
        : dummyEmployees.filter(emp => emp.dept === selectedDept);

    const departments = ['All', ...new Set(dummyEmployees.map(emp => emp.dept))];
    const projects = [...new Set(dummyEmployees.map(emp => emp.proj))];

    // Pagination
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

    const getFirstName = (fullName) => fullName.split(' ')[0];

    const handleUpdate = (employee) => {
        setSelectedEmployee(employee);
        setEditFormData({
            name: employee.name,
            code: employee.code,
            dept: employee.dept,
            proj: employee.proj
        });
        setShowEditModal(true);
    };

    const handleDelete = (employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log('Updated employee data:', editFormData);
        setShowEditModal(false);
        setSelectedEmployee(null);
    };

    const handleDeleteConfirm = () => {
        console.log('Deleting employee:', selectedEmployee);
        setShowDeleteModal(false);
        setSelectedEmployee(null);
    };

    const handleModalClose = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
        setSelectedEmployee(null);
        setEditFormData({});
    };

    const handleDeptChange = (e) => {
        setSelectedDept(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="container">
            <main className="manage-employee-main">
                <div className="manage-employee-box">
                    <h2>MANAGE EMPLOYEE</h2>

                    <div className="filter-container">
                        <label htmlFor="dept-select">Select Dept.</label>
                        <select id="dept-select" value={selectedDept} onChange={handleDeptChange}>
                            {departments.map((dept, index) => (
                                <option key={index} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>

                    <div className="employee-table-container">
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Dept.</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedEmployees.map(emp => (
                                    <tr key={emp.code}>
                                        <td>{emp.sr}</td>
                                        <td>{getFirstName(emp.name)}</td>
                                        <td>{emp.code}</td>
                                        <td>{emp.dept}</td>
                                        <td className="action-buttons">
                                            <button className="update-btn" onClick={() => handleUpdate(emp)}>✏️</button>
                                            <button className="delete-btn" onClick={() => handleDelete(emp)}>🗑️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>&lt;</button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                            <button key={num} className={currentPage === num ? "active" : ""} onClick={() => setCurrentPage(num)}>
                                {num}
                            </button>
                        ))}
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>&gt;</button>
                    </div>
                </div>
            </main>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Edit Employee</h3>
                            <button className="modal-close" onClick={handleModalClose}>×</button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="modal-form">
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={editFormData.name || ''}
                                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Code:</label>
                                <input
                                    type="text"
                                    value={editFormData.code || ''}
                                    onChange={(e) => setEditFormData({...editFormData, code: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Department:</label>
                                <select
                                    value={editFormData.dept || ''}
                                    onChange={(e) => setEditFormData({...editFormData, dept: e.target.value})}
                                    required
                                >
                                    {departments.filter(d => d !== 'All').map((dept, idx) => (
                                        <option key={idx} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Project:</label>
                                <select
                                    value={editFormData.proj || ''}
                                    onChange={(e) => setEditFormData({...editFormData, proj: e.target.value})}
                                    required
                                >
                                    {projects.map((proj, idx) => (
                                        <option key={idx} value={proj}>{proj}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={handleModalClose} className="btn-cancel">Cancel</button>
                                <button type="submit" className="btn-save">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Confirm Delete</h3>
                            <button className="modal-close" onClick={handleModalClose}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete employee <strong>{selectedEmployee?.name}</strong>?</p>
                            <p>This action cannot be undone.</p>
                        </div>
                        <div className="modal-actions">
                            <button onClick={handleModalClose} className="btn-cancel">Cancel</button>
                            <button onClick={handleDeleteConfirm} className="btn-delete">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEmployeePage;
