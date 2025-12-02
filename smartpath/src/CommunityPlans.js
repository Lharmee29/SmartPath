import './default.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommunityPlans = () => {
  const [publicPlans, setPublicPlans] = useState([]);
  const [userPlans, setUserPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const userFullName = localStorage.getItem('userFullName') || 'User';

  useEffect(() => {
    if (userId) {
      fetchPlans();
    } else {
      setError('Please log in to view community plans');
      setLoading(false);
    }
  }, [userId]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const [publicRes, userRes] = await Promise.all([
        axios.get('http://localhost:9000/getPublicPlans'),
        axios.get('http://localhost:9000/getUserPlans', { params: { userId } })
      ]);
      setPublicPlans(publicRes.data || []);
      setUserPlans(userRes.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError('Failed to load plans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const togglePlanVisibility = async (planId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axios.put('http://localhost:9000/updatePlanVisibility', {
        planId,
        public: newStatus,
        userId
      });
      // Refresh plans after update
      fetchPlans();
      alert(newStatus ? 'Plan published successfully!' : 'Plan unpublished successfully!');
    } catch (err) {
      console.error('Error updating plan visibility:', err);
      alert('Failed to update plan visibility. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const PlanCard = ({ plan, isOwnPlan = false }) => {
    const ownerName = plan.owner 
      ? `${plan.owner.firstName || ''} ${plan.owner.lastName || ''}`.trim() || plan.owner.username
      : 'Unknown User';
    
    return (
      <div style={{
        border: '2px solid #006bc2',
        borderRadius: '10px',
        padding: '15px',
        margin: '15px 0',
        backgroundColor: '#f9f9f9',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ margin: 0, color: '#006bc2' }}>{plan.name || 'Unnamed Plan'}</h3>
          {isOwnPlan && (
            <button
              onClick={() => togglePlanVisibility(plan._id, plan.public)}
              style={{
                padding: '8px 15px',
                backgroundColor: plan.public ? '#28a745' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {plan.public ? '✓ Published' : 'Unpublished'}
            </button>
          )}
        </div>
        <p style={{ margin: '5px 0', color: '#666' }}>
          <strong>Owner:</strong> {ownerName}
        </p>
        <p style={{ margin: '5px 0', color: '#666' }}>
          <strong>Last Modified:</strong> {formatDate(plan.modified)}
        </p>
        <div style={{ marginTop: '10px' }}>
          <strong style={{ color: '#006bc2' }}>Courses ({plan.courses?.length || 0}):</strong>
          {plan.courses && plan.courses.length > 0 ? (
            <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
              {plan.courses.map((course, idx) => (
                <li key={idx} style={{ margin: '5px 0' }}>
                  {course.name || 'Unnamed Course'}
                  {course.semestersOffered && (
                    <span style={{ fontSize: '12px', color: '#888', marginLeft: '10px' }}>
                      ({Object.entries(course.semestersOffered)
                        .filter(([_, offered]) => offered)
                        .map(([sem]) => sem.charAt(0).toUpperCase() + sem.slice(1))
                        .join(', ') || 'N/A'})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: '5px 0', color: '#888', fontStyle: 'italic' }}>No courses added yet</p>
          )}
        </div>
      </div>
    );
  };

  if (!userId) {
    return (
      <div className="page-header">
        <h1>Community Plans</h1>
        <div className="box">
          <p>Please log in to view community plans.</p>
          <button 
            onClick={() => window.location.href = '/Login'}
            style={{
              padding: '10px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.646)',
              color: 'rgb(0, 107, 194)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-header" style={{ padding: '20px', minHeight: '100vh' }}>
      <h1>Community Plans</h1>
      <p style={{ marginBottom: '30px' }}>Welcome, {userFullName}!</p>

      {loading ? (
        <div className="box">
          <p>Loading plans...</p>
        </div>
      ) : error ? (
        <div className="box">
          <p style={{ color: '#ff6b6b' }}>{error}</p>
          <button 
            onClick={fetchPlans}
            style={{
              padding: '10px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.646)',
              color: 'rgb(0, 107, 194)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* User's Own Plans Section */}
          <div style={{ maxWidth: '900px', margin: '0 auto 40px', textAlign: 'left' }}>
            <h2 style={{ color: '#006bc2', borderBottom: '2px solid #006bc2', paddingBottom: '10px' }}>
              My Plans ({userPlans.length})
            </h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Manage your plans and choose which ones to share with the community.
            </p>
            {userPlans.length > 0 ? (
              userPlans.map((plan) => (
                <PlanCard key={plan._id} plan={plan} isOwnPlan={true} />
              ))
            ) : (
              <div className="box" style={{ textAlign: 'center' }}>
                <p>You don't have any plans yet.</p>
                <button 
                  onClick={() => window.location.href = '/CreatePlan'}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.646)',
                    color: 'rgb(0, 107, 194)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  Create Your First Plan
                </button>
              </div>
            )}
          </div>

          {/* Public Plans from Other Students */}
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
            <h2 style={{ color: '#006bc2', borderBottom: '2px solid #006bc2', paddingBottom: '10px' }}>
              Public Plans from Other Students ({publicPlans.filter(p => p.owner?._id !== userId).length})
            </h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Browse academic plans shared by other students in the community.
            </p>
            {publicPlans.filter(p => p.owner?._id !== userId).length > 0 ? (
              publicPlans
                .filter(p => p.owner?._id !== userId)
                .map((plan) => (
                  <PlanCard key={plan._id} plan={plan} isOwnPlan={false} />
                ))
            ) : (
              <div className="box" style={{ textAlign: 'center' }}>
                <p>No public plans available from other students yet.</p>
                <p style={{ fontSize: '14px', marginTop: '10px' }}>
                  Be the first to share your plan with the community!
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <button 
              onClick={() => window.location.href = '/Dashboard'}
              style={{
                padding: '10px 20px',
                backgroundColor: '#006bc2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '0 10px'
              }}
            >
              Back to Dashboard
            </button>
            <button 
              onClick={() => window.location.href = '/CreatePlan'}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '0 10px'
              }}
            >
              Create New Plan
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommunityPlans;
