import { useState } from 'react'
import './App.css'
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PantryPage from "./pages/PantryPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import MainPage from "./pages/MainPage.jsx";
import GenerateRecipes from "./pages/GenerateRecipes.jsx";

function App() {
  const isAuthenticated = localStorage.getItem('token');
    console.log(isAuthenticated);
  return (

      <Router>
          <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/pantry" element={isAuthenticated ? <PantryPage /> : <Navigate to="/login" />} />
              <Route path="/generate-recipes" element={isAuthenticated ? <GenerateRecipes /> : <Navigate to="/login" />} />

              <Route path="*" element={<div>404 - Not Found</div>} />

          </Routes>
      </Router>
  )
}

export default App
