import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubjectById, createSubject, updateSubject } from '../../services/api';

function SubjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: ''
  });
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSubject = async () => {
      if (!isEditMode) return;
      
      try {
        setLoading(true);
        const response = await getSubjectById(id);
        setFormData({
          name: response.data.name
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch subject');
        setLoading(false);
        console.error(err);
      }
    };

    fetchSubject();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      if (isEditMode) {
        await updateSubject(id, formData);
      } else {
        await createSubject(formData);
      }
      
      navigate('/subjects');
    } catch (err) {
      setError('Failed to save subject');
      setSubmitting(false);
      console.error(err);
    }
  };

  if (loading) {
    return <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <div className="container">
      <h2>{isEditMode ? 'Edit Subject' : 'Create New Subject'}</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Subject Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="d-flex gap-2">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/subjects')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubjectForm; 