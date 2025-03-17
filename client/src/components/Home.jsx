import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getHomeworks, getSubjects, getStates } from '../services/api';

function Home() {
  const [stats, setStats] = useState({
    homeworks: 0,
    subjects: 0,
    states: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [homeworksRes, subjectsRes, statesRes] = await Promise.all([
          getHomeworks(),
          getSubjects(),
          getStates()
        ]);
        setStats({
          homeworks: homeworksRes.data.length,
          subjects: subjectsRes.data.length,
          states: statesRes.data.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container py-4">
      {/* Overview Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 bg-light">
            <div className="card-body">
              <h1 className="h3 mb-3">Overview</h1>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-journal-check fs-3 text-primary me-3"></i>
                    <div>
                      <div className="h4 mb-0">{stats.homeworks}</div>
                      <div className="text-muted small">Active Homeworks</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-book fs-3 text-success me-3"></i>
                    <div>
                      <div className="h4 mb-0">{stats.subjects}</div>
                      <div className="text-muted small">Subjects</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-tag fs-3 text-info me-3"></i>
                    <div>
                      <div className="h4 mb-0">{stats.states}</div>
                      <div className="text-muted small">Task States</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0">
            <div className="card-body">
              <h2 className="h5 mb-3">Quick Actions</h2>
              <div className="d-flex gap-2 flex-wrap">
                <Link to="/homeworks/new" className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2"></i>
                  New Homework
                </Link>
                <Link to="/homeworks/kanban" className="btn btn-outline-primary">
                  <i className="bi bi-kanban me-2"></i>
                  Kanban Board
                </Link>
                <Link to="/homeworks" className="btn btn-outline-secondary">
                  <i className="bi bi-list-task me-2"></i>
                  List View
                </Link>
                <Link to="/subjects/new" className="btn btn-outline-success">
                  <i className="bi bi-folder-plus me-2"></i>
                  New Subject
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions Grid */}
      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="h5 mb-3">
                <i className="bi bi-kanban text-primary me-2"></i>
                Task Management
              </h3>
              <p className="card-text small text-muted mb-3">
                Manage your homework assignments using either Kanban or list view.
              </p>
              <div className="d-flex gap-2">
                <Link to="/homeworks/kanban" className="btn btn-sm btn-outline-primary">
                  Kanban View
                </Link>
                <Link to="/homeworks" className="btn btn-sm btn-outline-secondary">
                  List View
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="h5 mb-3">
                <i className="bi bi-book text-success me-2"></i>
                Subject Management
              </h3>
              <p className="card-text small text-muted mb-3">
                Organize your homework by subjects and keep track of assignments per subject.
              </p>
              <div className="d-flex gap-2">
                <Link to="/subjects" className="btn btn-sm btn-outline-success">
                  View Subjects
                </Link>
                <Link to="/subjects/new" className="btn btn-sm btn-outline-secondary">
                  Add Subject
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="h5 mb-3">
                <i className="bi bi-tag text-info me-2"></i>
                State Configuration
              </h3>
              <p className="card-text small text-muted mb-3">
                Customize task states to match your workflow preferences.
              </p>
              <div className="d-flex gap-2">
                <Link to="/states" className="btn btn-sm btn-outline-info">
                  Manage States
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 