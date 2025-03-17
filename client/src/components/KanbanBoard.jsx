import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStates, getHomeworks, updateHomework, getSubjects, createHomework } from '../services/api';
import { Link } from 'react-router-dom';

const HomeworkModal = ({ homework, show, onClose }) => {
  if (!show || !homework) return null;

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div 
        className="modal fade show" 
        style={{ display: 'block' }} 
        tabIndex="-1"
        onClick={handleBackdropClick}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{homework.title}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <h6 className="text-muted mb-2">Description</h6>
                <p>{homework.description || 'No description provided.'}</p>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <h6 className="text-muted mb-2">Subject</h6>
                  <p className="mb-0">
                    {homework.Subject ? (
                      <span className="badge bg-info">
                        <i className="bi bi-book me-1"></i>
                        {homework.Subject.name}
                      </span>
                    ) : (
                      'No subject assigned'
                    )}
                  </p>
                </div>
                <div className="col-md-6">
                  <h6 className="text-muted mb-2">State</h6>
                  <p className="mb-0">
                    {homework.State ? (
                      <span className="badge" style={{ backgroundColor: homework.State.color }}>
                        <i className={`bi ${homework.State.icon} me-1`}></i>
                        {homework.State.name}
                      </span>
                    ) : (
                      'No state assigned'
                    )}
                  </p>
                </div>
                <div className="col-12">
                  <h6 className="text-muted mb-2">Deadline</h6>
                  <p className="mb-0">
                    <i className="bi bi-calendar-event me-2"></i>
                    {new Date(homework.deadline).toLocaleDateString()} at {new Date(homework.deadline).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Link to={`/homeworks/edit/${homework.id}`} className="btn btn-primary">
                <i className="bi bi-pencil me-2"></i>
                Edit Homework
              </Link>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div 
        className="modal-backdrop fade show"
        onClick={onClose}
      ></div>
    </>
  );
};

HomeworkModal.propTypes = {
  homework: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string,
    Subject: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    State: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      color: PropTypes.string,
      icon: PropTypes.string
    })
  }),
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const KanbanColumn = ({ title, tasks, onDragOver, onDrop, color, onTaskClick }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
    onDragOver(e);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    setIsDragOver(false);
    onDrop(e);
  };

  return (
    <div 
      className={`card h-100 shadow-sm ${isDragOver ? 'border-primary' : ''}`}
      style={{ 
        minWidth: '350px', 
        flex: '1',
        maxWidth: '450px',
        transition: 'all 0.2s ease-in-out',
        transform: isDragOver ? 'scale(1.02)' : 'scale(1)',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div 
        className="card-header"
        style={{ 
          backgroundColor: color || '#f8f9fa',
          borderBottom: `2px solid ${color || '#dee2e6'}`,
          color: color ? '#fff' : 'inherit'
        }}
      >
        <h5 className="card-title mb-0 d-flex align-items-center">
          <span className="me-2">{title}</span>
          <span className="badge bg-light text-dark ms-auto">{tasks.length}</span>
        </h5>
      </div>
      <div 
        className="card-body"
        style={{
          backgroundColor: isDragOver ? 'rgba(0,123,255,0.05)' : '#fff',
          padding: '1rem',
        }}
      >
        <div className="d-flex flex-column gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('taskId', task.id.toString())}
              className="card shadow-sm hover-shadow"
              style={{
                cursor: 'move',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              onClick={() => onTaskClick(task)}
              role="button"
            >
              <div className="card-body">
                <h6 className="card-title mb-2">{task.title}</h6>
                <p className="card-text small text-muted mb-2" style={{ minHeight: '40px' }}>
                  {task.description}
                </p>
                <div className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
                  <small className="text-muted">
                    <i className="bi bi-calendar-event me-1"></i>
                    {new Date(task.deadline).toLocaleDateString()}
                  </small>
                  {task.Subject && (
                    <span className="badge bg-info">
                      <i className="bi bi-book me-1"></i>
                      {task.Subject.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div 
              className="text-center text-muted p-4 border border-dashed rounded"
              style={{ borderStyle: 'dashed' }}
            >
              <i className="bi bi-inbox fs-4 d-block mb-2"></i>
              <span className="small">No homeworks</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

KanbanColumn.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      deadline: PropTypes.string,
      Subject: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    })
  ).isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  color: PropTypes.string,
  onTaskClick: PropTypes.func.isRequired
};

const KanbanBoard = () => {
  const [states, setStates] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewHomeworkModal, setShowNewHomeworkModal] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '23:59',
    subjectId: '',
    stateId: '',
    notificationThreshold: 24
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statesResponse, homeworksResponse, subjectsResponse] = await Promise.all([
          getStates(),
          getHomeworks(),
          getSubjects()
        ]);
        setStates(statesResponse.data);
        setHomeworks(homeworksResponse.data);
        setSubjects(subjectsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleNewHomeworkDrop = (stateId) => (e) => {
    e.preventDefault();
    const draggedType = e.dataTransfer.getData('type');
    if (draggedType === 'new-homework') {
      setSelectedStateId(stateId);
      setFormData(prev => ({ ...prev, stateId: stateId.toString() }));
      setShowNewHomeworkModal(true);
    }
  };

  const handleDrop = (stateId) => async (e) => {
    e.preventDefault();
    const homeworkId = e.dataTransfer.getData('taskId');
    const draggedType = e.dataTransfer.getData('type');

    if (draggedType === 'new-homework') {
      handleNewHomeworkDrop(stateId)(e);
      return;
    }
    
    try {
      const homework = homeworks.find(h => h.id.toString() === homeworkId);
      if (!homework) return;

      // If dropping in the same state, do nothing
      if (homework.stateId === stateId) return;

      // Find the state object for the new column
      const newState = states.find(s => s.id === stateId);
      
      // Prepare the updated homework data
      const updatedHomework = {
        ...homework,
        stateId: stateId,
        State: stateId ? newState : null
      };

      // Update the homework in the backend
      await updateHomework(homeworkId, updatedHomework);

      // Update local state
      setHomeworks(prevHomeworks => prevHomeworks.map(h => 
        h.id.toString() === homeworkId ? updatedHomework : h
      ));
    } catch (err) {
      console.error('Error updating homework state:', err);
      setError('Failed to update homework state');
    }
  };

  const handleTaskClick = (homework) => {
    setSelectedHomework(homework);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHomework(null);
  };

  const handleNewHomeworkSubmit = async (e) => {
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
      
      await createHomework(homeworkData);
      
      // Refresh homeworks list
      const homeworksResponse = await getHomeworks();
      setHomeworks(homeworksResponse.data);
      
      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '23:59',
        subjectId: '',
        stateId: '',
        notificationThreshold: 24
      });
      setShowNewHomeworkModal(false);
    } catch (err) {
      setError('Failed to create homework');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        {error}
      </div>
    );
  }

  // Separate no state column and state columns
  const noStateColumn = {
    id: null,
    title: 'No State',
    tasks: homeworks.filter(homework => !homework.stateId)
  };

  const stateColumns = states.reduce((acc, state) => ({
    ...acc,
    [state.id]: {
      id: state.id,
      title: state.name,
      tasks: homeworks.filter(homework => homework.stateId === state.id)
    }
  }), {});

  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid container px-4 py-3">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="mb-0">
            <i className="bi bi-kanban me-2"></i>
            Homework Kanban Board
          </h2>
          <div
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('type', 'new-homework');
              // Create a custom drag image that looks like a homework card
              const dragImage = document.createElement('div');
              dragImage.className = 'card shadow-sm';
              dragImage.style.width = '350px';
              dragImage.style.position = 'absolute';
              dragImage.style.top = '-1000px';
              dragImage.innerHTML = `
                <div class="card-body">
                  <h6 class="card-title mb-2">New Homework</h6>
                  <p class="card-text small text-muted">Drag to create a new homework in a column</p>
                </div>
              `;
              document.body.appendChild(dragImage);
              e.dataTransfer.setDragImage(dragImage, 175, 30);
              setTimeout(() => document.body.removeChild(dragImage), 0);
            }}
            style={{
              cursor: 'move',
            }}
          >
            <button 
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <i className="bi bi-arrows-move"></i>
              New Homework
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="container-fluid px-4">
          <div className="alert alert-danger mb-3">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        </div>
      )}



      {/* Homework Details Modal */}
      <HomeworkModal
        homework={selectedHomework}
        show={showModal}
        onClose={handleCloseModal}
      />

      {/* New Homework Modal */}
      {showNewHomeworkModal && (
        <>
          <div 
            className="modal fade show" 
            style={{ display: 'block', zIndex: 1050 }} 
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create New Homework</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowNewHomeworkModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleNewHomeworkSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                          onChange={handleFormChange}
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
                          onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                            Creating...
                          </>
                        ) : (
                          'Create Homework'
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowNewHomeworkModal(false)}
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
          <div 
            className="modal-backdrop fade show"
            style={{ zIndex: 1040 }}
          ></div>
        </>
      )}

      <div
          className="flex-grow-1 d-flex gap-4 overflow-auto p-4"
          style={{
            backgroundColor: '#f8f9fa',
          }}
      >
        {/* Render No State column first */}
        <KanbanColumn
            key="noState"
            title="No State"
            tasks={noStateColumn.tasks}
            onDragOver={handleDragOver}
            onDrop={handleDrop(null)}
            color="#6c757d"
            onTaskClick={handleTaskClick}
        />

        {/* Render all other state columns */}
        {Object.entries(stateColumns).map(([columnId, column]) => {
          const stateData = states.find(s => s.id === parseInt(columnId));
          return (
              <KanbanColumn
                  key={columnId}
                  title={column.title}
                  tasks={column.tasks}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop(parseInt(columnId))}
                  color={stateData?.color || '#f8f9fa'}
                  onTaskClick={handleTaskClick}
              />
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard; 