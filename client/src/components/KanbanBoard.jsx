import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStates, getHomeworks, updateHomework } from '../services/api';

const KanbanColumn = ({ title, tasks, onDragOver, onDrop, color }) => {
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
        minWidth: '300px', 
        flex: '1',
        maxWidth: '400px',
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
};

const KanbanBoard = () => {
  const [states, setStates] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statesResponse, homeworksResponse] = await Promise.all([
          getStates(),
          getHomeworks()
        ]);
        console.log('States:', statesResponse.data);
        console.log('Homeworks:', homeworksResponse.data);
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
    <div className="container-fluid p-4">
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0">
          <i className="bi bi-kanban me-2"></i>
          Homework Kanban Board
        </h2>
      </div>
      {error && (
        <div className="alert alert-danger mb-4">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}
      <div 
        className="d-flex gap-4 overflow-auto pb-4" 
        style={{ 
          minHeight: '75vh',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.5rem'
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard; 