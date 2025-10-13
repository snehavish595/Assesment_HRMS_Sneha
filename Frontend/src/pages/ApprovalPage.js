import React, { useState } from 'react';
import './css/ApprovalPage.css';

const ApprovalPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const initialRequests = [
    { id: 1, empName: 'Ashish Sharma', requestName: 'Leave Request', status: 'Pending' },
    { id: 2, empName: 'Priya Singh', requestName: 'Project Change', status: 'Pending' },
    { id: 3, empName: 'Rahul Jain', requestName: 'Leave Request', status: 'Approved' },
    { id: 4, empName: 'Anjali Gupta', requestName: 'Project Change', status: 'Approved' },
    { id: 5, empName: 'Vikram Yadav', requestName: 'Leave Request', status: 'Pending' },
    { id: 6, empName: 'Sneha Patel', requestName: 'Project Change', status: 'Approved' },
  ];

  const [approvalRequests, setApprovalRequests] = useState(initialRequests);
  const statusOptions = ['All', 'Pending', 'Approved'];

  const filteredRequests =
    selectedStatus === 'All'
      ? approvalRequests
      : approvalRequests.filter((req) => req.status === selectedStatus);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleToggleApproval = (requestId) => {
    setApprovalRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status: req.status === 'Pending' ? 'Approved' : 'Pending' }
          : req
      )
    );
  };

  return (
    <div className="container">
      <main className="approval-main">
        <div className="approval-content">
          <h2>Approval Requests</h2>

          <div className="filter-container">
            <label htmlFor="status-select">Filter Status:</label>
            <select id="status-select" value={selectedStatus} onChange={handleStatusChange}>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="requests-table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Emp Name</th>
                  <th>Request Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.map((request, index) => (
                  <tr key={request.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{request.empName}</td>
                    <td>{request.requestName}</td>
                    <td>{request.status}</td>
                    <td className="action-column">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={request.status === 'Approved'}
                          onChange={() => handleToggleApproval(request.id)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={currentPage === num ? 'active' : ''}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApprovalPage;
