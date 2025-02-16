import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QuizForm from "./pages/QuizForm";
import { UserContextProvider } from "./context/userContext"; // Use PascalCase for the provider
import { useState } from "react";

function App() {
  const [teacherId, setTeacherId] = useState(null);
  
  const setTeacher_Id = (id) =>{
    setTeacherId(id);
    localStorage.setItem("teacherId", id);
  }
  
  return (
    <UserContextProvider value={{ teacherId, setTeacher_Id }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/quiz-form/:quizId?" element={<QuizForm />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
