import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeworkList from "./components/homework/HomeworkList";
import HomeworkForm from "./components/homework/HomeworkForm";
import SubjectList from "./components/subject/SubjectList";
import SubjectForm from "./components/subject/SubjectForm";
import StateList from "./components/state/StateList";
import StateForm from "./components/state/StateForm";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import DiscordCallback from "./components/auth/DiscordCallback";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/auth/discord/callback"
                element={<DiscordCallback />}
              />

              {/* Protected route group */}
              <Route element={<ProtectedRoute />}>
                <Route path="/homeworks" element={<HomeworkList />} />
                <Route path="/homeworks/new" element={<HomeworkForm />} />
                <Route path="/homeworks/edit/:id" element={<HomeworkForm />} />
                <Route path="/subjects" element={<SubjectList />} />
                <Route path="/subjects/new" element={<SubjectForm />} />
                <Route path="/subjects/edit/:id" element={<SubjectForm />} />
                <Route path="/states" element={<StateList />} />
                <Route path="/states/new" element={<StateForm />} />
                <Route path="/states/edit/:id" element={<StateForm />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
