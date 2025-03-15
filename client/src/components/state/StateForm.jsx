import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStateById, createState, updateState } from '../../services/api';

// Common Bootstrap icons that can be used for states
const commonIcons = [
  'bi-check-circle', 'bi-x-circle', 'bi-exclamation-circle', 
  'bi-hourglass', 'bi-clock', 'bi-calendar', 'bi-pencil', 
  'bi-trash', 'bi-archive', 'bi-flag', 'bi-star', 'bi-heart'
];

// Common colors that can be used for states
const commonColors = [
  '#0d6efd', '#6c757d', '#198754', '#dc3545', '#ffc107', 
  '#0dcaf0', '#6610f2', '#fd7e14', '#d63384', '#20c997'
];

function StateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    color: '#0d6efd',
    icon: 'bi-check-circle'
  });
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [customColor, setCustomColor] = useState(false);

  useEffect(() => {
    const fetchState = async () => {
      if (!isEditMode) return;
      
      try {
        setLoading(true);
        const response = await getStateById(id);
        setFormData({
          name: response.data.name,
          color: response.data.color,
          icon: response.data.icon
        });
        
        // Check if the color is a custom one
        if (!commonColors.includes(response.data.color)) {
          setCustomColor(true);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch state');
        setLoading(false);
        console.error(err);
      }
    };

    fetchState();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleColorSelect = (color) => {
    setFormData({
      ...formData,
      color
    });
    setCustomColor(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      if (isEditMode) {
        await updateState(id, formData);
      } else {
        await createState(formData);
      }
      
      navigate('/states');
    } catch (err) {
      setError('Failed to save state');
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
    <div>
      <h2>{isEditMode ? 'Edit State' : 'Create New State'}</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">State Name</label>
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
        
        <div className="mb-3">
          <label className="form-label">Color</label>
          <div className="d-flex flex-wrap gap-2 mb-2">
            {commonColors.map(color => (
              <button
                key={color}
                type="button"
                className={`color-option ${formData.color === color ? 'active' : ''}`}
                style={{ 
                  backgroundColor: color,
                  width: '30px',
                  height: '30px',
                  border: formData.color === color ? '2px solid black' : '1px solid #dee2e6',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => handleColorSelect(color)}
              ></button>
            ))}
            <button
              type="button"
              className={`color-option ${customColor ? 'active' : ''}`}
              style={{ 
                backgroundImage: 'linear-gradient(45deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
                width: '30px',
                height: '30px',
                border: customColor ? '2px solid black' : '1px solid #dee2e6',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => setCustomColor(true)}
              title="Custom color"
            ></button>
          </div>
          
          {customColor && (
            <input
              type="color"
              className="form-control form-control-color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              title="Choose a color"
            />
          )}
        </div>
        
        <div className="mb-3">
          <label className="form-label">Icon</label>
          <div className="d-flex flex-wrap gap-3 mb-3 p-3 border rounded">
            {commonIcons.map(icon => (
              <button
                key={icon}
                type="button"
                className={`btn ${formData.icon === icon ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setFormData({...formData, icon})}
                style={{ width: '40px', height: '40px' }}
              >
                <i className={`bi ${icon}`}></i>
              </button>
            ))}
          </div>
          
          <div className="input-group">
            <span className="input-group-text">
              <i className={`bi ${formData.icon}`}></i>
            </span>
            <input
              type="text"
              className="form-control"
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="Enter Bootstrap icon class"
              required
            />
          </div>
          <div className="form-text">
            Enter a Bootstrap icon class. You can find more icons at <a href="https://icons.getbootstrap.com/" target="_blank" rel="noreferrer">Bootstrap Icons</a>.
          </div>
        </div>
        
        <div className="mb-4">
          <label className="form-label">Preview</label>
          <div className="p-3 border rounded">
            <span className="badge" style={{ backgroundColor: formData.color, fontSize: '1rem', padding: '8px 12px' }}>
              <i className={`bi ${formData.icon} me-1`}></i>
              {formData.name || 'State Preview'}
            </span>
          </div>
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
            onClick={() => navigate('/states')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default StateForm;