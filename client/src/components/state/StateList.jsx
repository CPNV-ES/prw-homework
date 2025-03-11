import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStates, deleteState } from '../../services/api';

function StateList() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        const response = await getStates();
        setStates(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch states');
        setLoading(false);
        console.error(err);
      }
    };

    fetchStates();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this state?')) {
      try {
        await deleteState(id);
        setStates(states.filter(state => state.id !== id));
      } catch (err) {
        setError('Failed to delete state');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>States</h2>
        <Link to="/states/new" className="btn btn-primary">
          Add New State
        </Link>
      </div>

      {states.length === 0 ? (
        <div className="alert alert-info">No states found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Color</th>
                <th>Icon</th>
                <th>Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {states.map((state) => (
                <tr key={state.id}>
                  <td>{state.name}</td>
                  <td>
                    <span className="color-preview" style={{ 
                      backgroundColor: state.color,
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      marginRight: '8px'
                    }}></span>
                    {state.color}
                  </td>
                  <td><i className={`bi ${state.icon}`}></i> {state.icon}</td>
                  <td>
                    <span className="badge" style={{ backgroundColor: state.color }}>
                      <i className={`bi ${state.icon} me-1`}></i>
                      {state.name}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link 
                        to={`/states/edit/${state.id}`} 
                        className="btn btn-sm btn-outline-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(state.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StateList; 