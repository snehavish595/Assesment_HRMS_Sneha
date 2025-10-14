import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import './css/AddEmployeePage.css';
import { useRef } from 'react';


const AddEmployeePage = () => {
      const nextCodeRef = useRef(1);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        doj: '',
        dept: '',
        proj: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate();

    const departmentProjects = {
        'HRMS': ['Induction', 'OnBoarding'],
        'Recruitment': ['IT- Recruitment', 'Non-IT- Recruitment'],
        'Development': ['Web', 'Mobile', 'Software'],
        'Digital Marketing': ['Content Awareness/Creation', 'Campaigns'],
        'Sales and Marketing': ['Sales', 'Marketing', 'Business Development'],
        'Account': ['Accounting', 'Finance', 'Audit']
    };

    const departments = ['HRMS', 'Recruitment', 'Development', 'Digital Marketing', 'Sales and Marketing', 'Account'];

   
const generateEmployeeCode = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    
    const codeNumber = nextCodeRef.current.toString().padStart(3, '0');
    return `OS${year}${month}${codeNumber}`;
};


    // Generate random password
    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 8; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'dept') {
    
            setProjects(departmentProjects[value] || []);
            setFormData({
                ...formData,
                [name]: value,
                proj: '', 
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

const resetForm = () => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const newCode = generateEmployeeCode();
    
    localStorage.setItem('employees', JSON.stringify([...employees, { code: newCode }]));

    setFormData({
        name: '',
        code: generateEmployeeCode(),
        doj: '',
        dept: '',
        proj: '',
        email: '',
        password: generatePassword()
    });
};


useEffect(() => {
    resetForm();
}, []);


   useEffect(() => {
  setFormData({
    name: '',
    code: generateEmployeeCode(),
    doj: '',
    dept: '',
    proj: '',
    email: '',
    password: generatePassword()
  });
}, [navigate]);

    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('role');

    if (!isAuthenticated || userRole !== 'HR') {
        setTimeout(() => {
            alert("Please login as HR to access this page.");
            navigate('/login');
        }, 100);
        return null;
    }

   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem('authToken');

    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/employees',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            }
        );

        if (response.data.success) {
            alert('Employee added to MongoDB successfully!');
            nextCodeRef.current += 1; 
            resetForm();
        
            navigate('/manage-employee');
        } else {
            throw new Error(response.data.message || 'Failed to save employee.');
        }
    } catch (error) {
        console.error('Backend Error:', error);
        alert(`Error saving employee: ${error.response?.data?.message || error.message}`);
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className="container">
            {/* <Header /> */}
            <main className="add-employee-main">
                <div className="add-employee-box">
                    <h2>ADD EMPLOYEE</h2>
                    <p style={{textAlign: 'center', color: '#666', fontSize: '12px'}}>
                    </p>
                    <form className="add-employee-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="emp-name">Emp Name *</label>
                            <input 
                                type="text" 
                                id="emp-name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                placeholder="Enter employee name"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="emp-id">Emp ID/Code *</label>
                            <input 
                                type="text" 
                                id="emp-id" 
                                name="code" 
                                value={formData.code} 
                                onChange={handleChange} 
                                required 
                                placeholder="Auto-generated"
                                readOnly
                            />
                        </div>

                         <div className="form-group">
                            <label htmlFor="emp-password">Set Password *</label>
                            <input 
                                type="text" 
                                id="emp-password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                                placeholder="Auto-generated password"
                                readOnly
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="emp-email">Email *</label>
                            <input 
                                type="email" 
                                id="emp-email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                                placeholder="Enter employee email"
                            />
                        </div>
                        
                       
                        
                        <div className="form-group">
                            <label htmlFor="doj">Date of Joining *</label>
                            <input 
                                type="date" 
                                id="doj" 
                                name="doj" 
                                value={formData.doj} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="dept">Department *</label>
                            <select 
                                id="dept" 
                                name="dept" 
                                value={formData.dept} 
                                onChange={handleChange} 
                                required 
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept, index) => (
                                    <option key={index} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="proj">Project *</label>
                            <select 
                                id="proj" 
                                name="proj" 
                                value={formData.proj} 
                                onChange={handleChange} 
                                required 
                                disabled={!formData.dept}
                            >
                                <option value="">Select Project</option>
                                {projects.map((proj, index) => (
                                    <option key={index} value={proj}>{proj}</option>
                                ))}
                            </select>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="add-emp-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving to Database...' : 'ADD EMP'}
                        </button>
                    </form>
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default AddEmployeePage;