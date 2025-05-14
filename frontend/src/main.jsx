import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginPage from "./Auth/LoginPage.jsx";
import RegisterPage from "./Auth/RegisterPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Home/HomePage.jsx";
import LearningPage from "./Category/Learning/LearningPage.jsx";
import ProtectedRoute from "../config/ProtectedRoute.jsx";
import TestPage from "./Category/Practice/TestPage.jsx";
import PracticePage from "./Category/Practice/PracticePage.jsx";
import DifficultyPage from "./Category/Difficulty/DifficultyPage.jsx";
import LessonPage from "./Category/Learning/LessonPage.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Router>
      <Routes>
        <Route path="/*" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learning"
          element={
            <ProtectedRoute>
              <DifficultyPage mode={"learning"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning/categories"
          element={
            <ProtectedRoute>
              <LearningPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning/lesson"
          element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <DifficultyPage mode={"practice"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/categories"
          element={
            <ProtectedRoute>
              <PracticePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/test"
          element={
            <ProtectedRoute>
              <TestPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </>
);
