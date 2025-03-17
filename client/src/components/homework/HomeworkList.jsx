import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHomeworks, deleteHomework, getSubjects } from '../../services/api';

function HomeworkList() {
  const [homeworks, setHomeworks] = useState([]);
  const [subjects, setSubjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [homeworksResponse, subjectsResponse] = await Promise.all([
          getHomeworks(),
          getSubjects()
        ]);
        
        // Create a map of subject id to subject name for easy lookup
        const subjectMap = {};
        subjectsResponse.data.forEach(subject => {
          subjectMap[subject.id] = subject.name;
        });
        
        setHomeworks(homeworksResponse.data);
        setSubjects(subjectMap);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this homework?')) {
      try {
        await deleteHomework(id);
        setHomeworks(homeworks.filter(homework => homework.id !== id));
      } catch (err) {
        setError('Failed to delete homework');
        console.error(err);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
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
        <h2>Homeworks</h2>
        <Link to="/homeworks/new" className="btn btn-primary">
          Add New Homework
        </Link>
      </div>

      {homeworks.length === 0 ? (
        <div className="alert alert-info">No homeworks found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Subject</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {homeworks.map((homework) => (
                <tr key={homework.id}>
                  <td>{homework.title}</td>
                  <td>{homework.description}</td>
                  <td>{homework.subjectId ? subjects[homework.subjectId] : 'None'}</td>
                  <td>{formatDate(homework.deadline)}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link 
                        to={`/homeworks/edit/${homework.id}`} 
                        className="btn btn-sm btn-outline-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(homework.id)}
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

export default HomeworkList; 