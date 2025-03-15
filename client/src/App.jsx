import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomeworkList from './components/homework/HomeworkList';
import HomeworkForm from './components/homework/HomeworkForm';
import SubjectList from './components/subject/SubjectList';
import SubjectForm from './components/subject/SubjectForm';
import StateList from './components/state/StateList';
import StateForm from './components/state/StateForm';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homeworks" element={<HomeworkList />} />
            <Route path="/homeworks/new" element={<HomeworkForm />} />
            <Route path="/homeworks/edit/:id" element={<HomeworkForm />} />
            <Route path="/subjects" element={<SubjectList />} />
            <Route path="/subjects/new" element={<SubjectForm />} />
            <Route path="/subjects/edit/:id" element={<SubjectForm />} />
            <Route path="/states" element={<StateList />} />
            <Route path="/states/new" element={<StateForm />} />
            <Route path="/states/edit/:id" element={<StateForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
