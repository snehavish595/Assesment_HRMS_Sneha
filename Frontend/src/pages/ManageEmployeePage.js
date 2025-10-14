import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ManageEmployeePage.css';

const ManageEmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedDept, setSelectedDept] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const itemsPerPage = 5;

 
useEffect(() => {
    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('authToken'); // if auth is required
            const res = await axios.get('http://127.0.0.1:8000/api/employees', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(res.data); 

            const employeesData = res.data.employees || res.data || [];
            setEmployees(employeesData);
        } catch (err) {
            console.error('Error fetching employees:', err);
            setEmployees([]); 
        }
    };
    fetchEmployees();
}, []);


    const filteredEmployees = selectedDept === 'All'
        ? employees
        : employees.filter(emp => emp.dept === selectedDept);

    const departments = ['All', ...new Set(employees.map(emp => emp.dept))];
    const projects = [...new Set(employees.map(emp => emp.proj))];

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
                                    <th>Project</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedEmployees.map((emp, index) => (
                                    <tr key={emp._id || emp.code}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{getFirstName(emp.name)}</td>
                                        <td>{emp.code}</td>
                                        <td>{emp.dept}</td>
                                        <td>{emp.proj}</td>
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
        </div>
    );
};

export default ManageEmployeePage;
