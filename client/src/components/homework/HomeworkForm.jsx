import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  getHomeworkById, 
  createHomework, 
  updateHomework, 
  getSubjects,
  getStates 
} from '../../services/api';

function HomeworkForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = !!id;

  // Get stateId from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialStateId = queryParams.get('stateId');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '23:59',
    subjectId: '',
    stateId: initialStateId || '',
    notificationThreshold: 24
  });
  const [subjects, setSubjects] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch subjects and states
        const [subjectsResponse, statesResponse] = await Promise.all([
          getSubjects(),
          getStates()
        ]);
        setSubjects(subjectsResponse.data);
        setStates(statesResponse.data);
        
        // If in edit mode, fetch homework data
        if (isEditMode) {
          const homeworkResponse = await getHomeworkById(id);
          const homework = homeworkResponse.data;
          
          // Format the date and time for the input fields
          const deadlineDate = new Date(homework.deadline);
          const formattedDate = deadlineDate.toISOString().split('T')[0];
          const formattedTime = deadlineDate.toTimeString().slice(0, 5);
          
          setFormData({
            title: homework.title,
            description: homework.description,
            date: formattedDate,
            time: formattedTime,
            subjectId: homework.subjectId || '',
            stateId: homework.stateId || '',
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
      
      // Combine date and time into a single ISO string
      const deadline = new Date(`${formData.date}T${formData.time}`);
      
      // Prepare data for submission
      const homeworkData = {
        title: formData.title,
        description: formData.description,
        deadline: deadline.toISOString(),
        subjectId: formData.subjectId ? parseInt(formData.subjectId) : null,
        stateId: formData.stateId ? parseInt(formData.stateId) : null,
        notificationThreshold: parseInt(formData.notificationThreshold)
      };
      
      if (isEditMode) {
        await updateHomework(id, homeworkData);
      } else {
        await createHomework(homeworkData);
      }
      
      navigate('/homeworks/kanban');
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
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title mb-4">
              {isEditMode ? 'Edit Homework' : 'New Homework'}
            </h2>
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
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
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="date" className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="time" className="form-label">Due Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                  <option value="">Select a subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="stateId" className="form-label">State</label>
                <select
                  className="form-select"
                  id="stateId"
                  name="stateId"
                  value={formData.stateId}
                  onChange={handleChange}
                >
                  <option value="">Select a state</option>
                  {states.map(state => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-3">
                <label htmlFor="notificationThreshold" className="form-label">
                  Notification Threshold (hours before deadline)
                </label>
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
              </div>
              
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    'Save Homework'
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/homeworks/kanban')}
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeworkForm; 