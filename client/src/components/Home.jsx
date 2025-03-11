import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Welcome to Homework Manager</h1>
      <p className="lead">
        This application helps you manage your homework assignments, subjects, and states.
      </p>
      <hr className="my-4" />
      <p>Use the navigation above to manage your homeworks, subjects, and states.</p>
      <div className="d-flex gap-2">
        <Link to="/homeworks" className="btn btn-primary">
          <i className="bi bi-journal-check me-2"></i>
          View Homeworks
        </Link>
        <Link to="/subjects" className="btn btn-secondary">
          <i className="bi bi-book me-2"></i>
          View Subjects
        </Link>
        <Link to="/states" className="btn btn-success">
          <i className="bi bi-tag me-2"></i>
          View States
        </Link>
      </div>
    </div>
  );
}

export default Home; 