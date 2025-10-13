import React, { useState } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import './css/EmpRequestPage.css';

const EmpRequestPage = () => {
    const [requestType, setRequestType] = useState('Leave');
    const [formData, setFormData] = useState({
        requestType: 'Leave',
        startDate: '',
        endDate: '',
        reason: '',
        projectChange: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRequestTypeChange = (e) => {
        const type = e.target.value;
        setRequestType(type);
        setFormData({
            ...formData,
            requestType: type,
            startDate: '',
            endDate: '',
            reason: '',
            projectChange: '',
            description: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate form based on request type
        if (requestType === 'Leave') {
            if (!formData.startDate || !formData.endDate || !formData.reason) {
                alert('Please fill in all required fields for leave request');
                setIsSubmitting(false);
                return;
            }
        } else if (requestType === 'Project Change') {
            if (!formData.projectChange || !formData.description) {
                alert('Please fill in all required fields for project change request');
                setIsSubmitting(false);
                return;
            }
        }

        try {
            // Here you would typically send the request to your backend
            console.log('Submitting request:', formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Request submitted successfully!');
            
            // Reset form
            setFormData({
                requestType: 'Leave',
                startDate: '',
                endDate: '',
                reason: '',
                projectChange: '',
                description: ''
            });
            setRequestType('Leave');
            
        } catch (error) {
            console.error('Error submitting request:', error);
            alert('Error submitting request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            {/* <Header /> */}
            <main className="emp-request-main">
                <div className="emp-request-content">
                    <h2>Submit Request</h2>
                    
                    <form onSubmit={handleSubmit} className="request-form">
                        {/* Request Type Selection */}
                        <div className="form-group">
                            <label htmlFor="request-type">Request Type *</label>
                            <select 
                                id="request-type" 
                                name="requestType" 
                                value={requestType} 
                                onChange={handleRequestTypeChange}
                                required
                            >
                                <option value="Leave">Leave Request</option>
                                <option value="Project Change">Project Change Request</option>
                            </select>
                        </div>

                        {/* Leave Request Fields */}
                        {requestType === 'Leave' && (
                            <>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="start-date">Start Date *</label>
                                        <input 
                                            type="date" 
                                            id="start-date" 
                                            name="startDate" 
                                            value={formData.startDate} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="end-date">End Date *</label>
                                        <input 
                                            type="date" 
                                            id="end-date" 
                                            name="endDate" 
                                            value={formData.endDate} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reason">Reason for Leave *</label>
                                    <textarea 
                                        id="reason" 
                                        name="reason" 
                                        value={formData.reason} 
                                        onChange={handleInputChange} 
                                        required 
                                        placeholder="Please specify the reason for your leave request"
                                        rows="4"
                                    />
                                </div>
                            </>
                        )}

                        {/* Project Change Request Fields */}
                        {requestType === 'Project Change' && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="project-change">Requested Project *</label>
                                    <select 
                                        id="project-change" 
                                        name="projectChange" 
                                        value={formData.projectChange} 
                                        onChange={handleInputChange} 
                                        required 
                                    >
                                        <option value="">Select Project</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Mobile Development">Mobile Development</option>
                                        <option value="Software Development">Software Development</option>
                                        <option value="AI/ML">AI/ML</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="DevOps">DevOps</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description *</label>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        value={formData.description} 
                                        onChange={handleInputChange} 
                                        required 
                                        placeholder="Please explain why you want to change your project and what skills you bring to the new project"
                                        rows="4"
                                    />
                                </div>
                            </>
                        )}

                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </form>
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default EmpRequestPage;
