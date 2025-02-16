import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import getId from '../context/userContext.js';  // Ensure correct import

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);
  const { teacherId } = getId();

  useEffect(() => {
    // Load from localStorage on initial render
    const quiz = JSON.parse(localStorage.getItem("quizzes"));
    if (quiz && Array.isArray(quiz)) {
      setQuizzes(quiz);
    }
  }, []);

  useEffect(() => {
    if (teacherId) {
      axios
        .get(`http://localhost:8000/api/quiz/teacher_quizzes/${teacherId}`)
        .then((response) => {
          const quizzes = response.data?.quizzes || [];
          setQuizzes(quizzes);
          localStorage.setItem("quizzes", JSON.stringify(quizzes));
        })
        .catch((error) => {
          setError(error.response?.data?.message || "Failed to fetch quizzes.");
        });
    }
  }, [teacherId]);

  const handleDelete = (quizId) => {
    const originalQuizzes = [...quizzes];
    setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));

    axios
      .delete(`http://localhost:8000/api/quiz/quizzes/${quizId}`)
      .then(() => {
        console.log("Quiz deleted successfully");
      })
      .catch((error) => {
        setError(error.message);
        setQuizzes(originalQuizzes);  // Roll back on failure
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Dashboard</h1>
      <div className="flex justify-end mb-6">
        <Link to={`/quiz-form`}>
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Create New Quiz</Button>
        </Link>
      </div>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <Card key={quiz.id} className="bg-white shadow-lg rounded-lg border border-gray-200">
              <CardHeader className="p-4 border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-800">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700 mb-4">{quiz.description}</p>
                <div className="flex space-x-2">
                  <Link to={`/quiz-form/${quiz.id}`}>
                    <Button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">Edit</Button>
                  </Link>
                  <Button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600" onClick={() => handleDelete(quiz.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center">No quizzes available. Create a new quiz to get started!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
