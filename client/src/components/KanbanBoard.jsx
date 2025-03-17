import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStates, getHomeworks, updateHomework } from '../services/api';

const KanbanColumn = ({ title, tasks, onDragOver, onDrop }) => {
  return (
    <div 
      className="card h-100"
      style={{ minWidth: '300px', flex: '1' }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="card-header bg-light">
        <h5 className="card-title mb-0">{title}</h5>
      </div>
      <div className="card-body bg-light">
        <div className="d-flex flex-column gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('taskId', task.id.toString())}
              className="card cursor-move"
            >
              <div className="card-body">
                <h6 className="card-title">{task.title}</h6>
                <p className="card-text small text-muted mb-2">{task.description}</p>
                <div className="d-flex align-items-center justify-content-between">
                  <small className="text-muted">
                    Due: {new Date(task.deadline).toLocaleDateString()}
                  </small>
                  {task.Subject && (
                    <span className="badge bg-info text-white me-2">
                      {task.Subject.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="text-center text-muted p-3">
              <i className="bi bi-inbox fs-4 d-block mb-2"></i>
              No homeworks
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
        <h2 className="mb-0">Homework Kanban Board</h2>
      </div>
      {error && (
        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}
      <div className="d-flex gap-4 overflow-auto pb-4" style={{ minHeight: '70vh' }}>
        {/* Render No State column first */}
        <KanbanColumn
          key="noState"
          title={noStateColumn.title}
          tasks={noStateColumn.tasks}
          onDragOver={handleDragOver}
          onDrop={handleDrop(null)}
        />
        
        {/* Render all other state columns */}
        {Object.entries(stateColumns).map(([columnId, column]) => (
          <KanbanColumn
            key={columnId}
            title={column.title}
            tasks={column.tasks}
            onDragOver={handleDragOver}
            onDrop={handleDrop(parseInt(columnId))}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard; 