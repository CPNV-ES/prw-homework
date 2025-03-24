import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useRef } from "react";
import * as bootstrap from 'bootstrap';

function Navbar() {
  const { user, loading, logout } = useAuth();
  const dropdownRef = useRef(null);
  const dropdownInstance = useRef(null);

  useEffect(() => {
    // Initialize dropdown when component mounts
    if (dropdownRef.current) {
      dropdownInstance.current = new bootstrap.Dropdown(dropdownRef.current);
    }

    // Cleanup dropdown when component unmounts
    return () => {
      if (dropdownInstance.current) {
        dropdownInstance.current.dispose();
      }
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Homework Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item dropdown">
                  <button
                    ref={dropdownRef}
                    className="nav-link dropdown-toggle btn btn-link"
                    type="button"
                    id="homeworksDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Homeworks
                  </button>
                  <ul 
                    className="dropdown-menu" 
                    aria-labelledby="homeworksDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/homeworks">
                        <i className="bi bi-list-task me-2"></i>List View
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/homeworks/kanban">
                        <i className="bi bi-kanban me-2"></i>Kanban Board
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item" to="/homeworks/new">
                        <i className="bi bi-plus-circle me-2"></i>New Homework
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/subjects">
                    Subjects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/states">
                    States
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center">
            {!loading && (
              <>
                {user ? (
                  <div className="d-flex align-items-center">
                    {user.avatar && (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="rounded-circle me-2"
                        style={{ width: "32px", height: "32px" }}
                      />
                    )}
                    <span className="text-white me-3">{user.username}</span>
                    <button
                      className="btn btn-outline-light btn-sm"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link className="btn btn-outline-light" to="/login">
                    Login
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
