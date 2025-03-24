import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { handleDiscordCallback } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

function DiscordCallback() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      try {
        // Get code from URL search params
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        if (!code) {
          setError("No authorization code found");
          return;
        }

        // Exchange code for token
        const response = await handleDiscordCallback(code);
        setUser(response.data.user);

        // Redirect to home page on success
        navigate("/");
      } catch (err) {
        setError(err.response?.data?.error || "Authentication failed");
      }
    };

    processAuth();
  }, [location, navigate, setUser]);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Authentication Error</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <p className="text-center mt-3">Authenticating with Discord...</p>
    </div>
  );
}

export default DiscordCallback;
