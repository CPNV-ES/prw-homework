import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStates, getHomeworks, updateHomework } from '../services/api';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statesResponse, homeworksResponse] = await Promise.all([
          getStates(),
          getHomeworks()
        ]);
        setStates(statesResponse.data);
        setHomeworks(homeworksResponse.data);
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

  const handleDrop = (stateId) => async (e) => {
    e.preventDefault();
    const homeworkId = e.dataTransfer.getData('taskId');
    
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
        <div className="d-flex align-items-center">
    <div className="d-flex flex-column h-100">
      <div className="container-fluid container px-4 py-3">
          <h2 className="mb-0">
            <i className="bi bi-kanban me-2"></i>
            Homework Kanban Board
          </h2>
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

      {/* Homework Details Modal */}
      <HomeworkModal
        homework={selectedHomework}
        show={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default KanbanBoard; 