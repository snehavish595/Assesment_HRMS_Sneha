import React, { useState } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import './css/ApprovalPage.css';

const ApprovalPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dummy data for approval requests
  const approvalRequests = [
    { id: 1, empName: 'Ashish Sharma', requestName: 'Leave Request', status: 'Pending', date: '2024-01-15' },
    { id: 2, empName: 'Priya Singh', requestName: 'Project Change', status: 'Pending', date: '2024-01-14' },
    { id: 3, empName: 'Rahul Jain', requestName: 'Leave Request', status: 'Approved', date: '2024-01-13' },
    { id: 4, empName: 'Anjali Gupta', requestName: 'Project Change', status: 'Approved', date: '2024-01-12' },
    { id: 5, empName: 'Vikram Yadav', requestName: 'Leave Request', status: 'Pending', date: '2024-01-11' },
    { id: 6, empName: 'Sneha Patel', requestName: 'Project Change', status: 'Approved', date: '2024-01-10' },
  ];

  const statusOptions = ['Pending', 'Approved'];

  const filteredRequests = selectedStatus === 'All' 
    ? approvalRequests 
    : approvalRequests.filter(req => req.status === selectedStatus);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleToggleApproval = (requestId, currentStatus) => {
    // Here you would typically update the request status in your backend
    console.log(`Toggling approval for request ${requestId} from ${currentStatus}`);
    // For demo purposes, we'll just show an alert
    alert(`Request ${requestId} ${currentStatus === 'Pending' ? 'approved' : 'disapproved'}`);
  };

  return (
    <div className="container">
      {/* <Header /> */}
      <main className="approval-main">
        <div className="approval-content">
          <h2>Approval Requests</h2>
          
          {/* Status Filter */}
          <div className="filter-container">
            <label htmlFor="status-select">Select Status:</label>
            <select id="status-select" value={selectedStatus} onChange={handleStatusChange}>
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Requests Table */}
          <div className="requests-table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Emp Name</th>
                  <th>Request Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.map((request, index) => (
                  <tr key={request.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{request.empName}</td>
                    <td>{request.requestName}</td>
                    <td className="action-column">
                      <button 
                        className={`toggle-btn ${request.status === 'Approved' ? 'approved' : 'pending'}`}
                        onClick={() => handleToggleApproval(request.id, request.status)}
                      >
                        {request.status === 'Approved' ? '✓ Approved' : '⏳ Pending'}
                      </button>
                    </td>
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
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ApprovalPage;