import { getDiscordAuthUrl } from "../../services/api";

function Login() {
  const handleDiscordLogin = () => {
    window.location.href = getDiscordAuthUrl();
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Log In</h4>
        </div>
        <div className="card-body">
          <p className="card-text text-center mb-4">
            Sign in to access and manage your homework assignments.
          </p>
          <button
            onClick={handleDiscordLogin}
            className="btn text-white d-flex align-items-center justify-content-center w-100 py-2 rounded border-0 fs-6 bg-primary"
          >
            <i className="bi bi-discord me-2 fs-5"></i>
            Log in with Discord
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
