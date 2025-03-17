import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubjects, deleteSubject } from '../../services/api';

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const response = await getSubjects();
        setSubjects(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch subjects');
        setLoading(false);
        console.error(err);
      }
    };

    fetchSubjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject? This may affect associated homeworks.')) {
      try {
        await deleteSubject(id);
        setSubjects(subjects.filter(subject => subject.id !== id));
      } catch (err) {
        setError('Failed to delete subject');
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
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Subjects</h2>
        <Link to="/subjects/new" className="btn btn-primary">
          Add New Subject
        </Link>
      </div>

      {subjects.length === 0 ? (
        <div className="alert alert-info">No subjects found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td>{subject.name}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link 
                        to={`/subjects/edit/${subject.id}`} 
                        className="btn btn-sm btn-outline-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(subject.id)}
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

export default SubjectList; 