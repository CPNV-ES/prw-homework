import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getHomeworkById, 
  createHomework, 
  updateHomework, 
  getSubjects 
} from '../../services/api';

function HomeworkForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    subjectId: '',
    notificationThreshold: 24
  });
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch subjects
        const subjectsResponse = await getSubjects();
        setSubjects(subjectsResponse.data);
        
        // If in edit mode, fetch homework data
        if (isEditMode) {
          const homeworkResponse = await getHomeworkById(id);
          const homework = homeworkResponse.data;
          
          // Format the date for the input field (YYYY-MM-DD)
          const deadlineDate = new Date(homework.deadline);
          const formattedDate = deadlineDate.toISOString().split('T')[0];
          
          setFormData({
            title: homework.title,
            description: homework.description,
            deadline: formattedDate,
            subjectId: homework.subjectId || '',
            notificationThreshold: homework.notificationThreshold || 24
          });
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
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
      
      // Prepare data for submission
      const homeworkData = {
        ...formData,
        subjectId: formData.subjectId ? parseInt(formData.subjectId) : null
      };
      
      if (isEditMode) {
        await updateHomework(id, homeworkData);
      } else {
        await createHomework(homeworkData);
      }
      
      navigate('/homeworks');
    } catch (err) {
      setError('Failed to save homework');
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
      <h2>{isEditMode ? 'Edit Homework' : 'Create New Homework'}</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        
        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">Deadline</label>
          <input
            type="date"
            className="form-control"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="subjectId" className="form-label">Subject</label>
          <select
            className="form-select"
            id="subjectId"
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
          >
            <option value="">Select a subject (optional)</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-3">
          <label htmlFor="notificationThreshold" className="form-label">Notification Reminder (hours before deadline)</label>
          <input
            type="number"
            className="form-control"
            id="notificationThreshold"
            name="notificationThreshold"
            value={formData.notificationThreshold}
            onChange={handleChange}
            min="1"
            max="168"
            required
          />
          <div className="form-text">
            Specify how many hours before the deadline you want to receive a notification (between 1 and 168 hours / 1 week).
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
            onClick={() => navigate('/homeworks')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default HomeworkForm; 