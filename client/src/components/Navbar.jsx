import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, loading, logout } = useAuth();

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
                <li className="nav-item">
                  <Link className="nav-link" to="/homeworks">
                    Homeworks
                  </Link>
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
