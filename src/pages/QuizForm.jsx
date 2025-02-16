import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { TextCursor } from "lucide-react";
import getId from '../context/userContext.js'

const QuizForm = () => {
  const { quizId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {teacherId} = getId();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const t_id = JSON.parse(localStorage.getItem("t_id"));

    console.log(teacherId);

    const request = quizId
      ? axios.put(`http://localhost:8000/api/quiz/quizzes/${quizId}`, {
          title,
          description,
        })
      : axios.post("http://localhost:8000/api/quiz/quizzes", {
          title,
          description,
          teacher_id : t_id,
        });

    request
      .then((response) => {
        // const id = response.data.teacher_id;
        console.log(response);
        console.log(quizId ? "Quiz updated successfully" : "Quiz created successfully");
        navigate(`/dashboard/${t_id}`);
      })
      .catch((error) => {
        console.log("Error", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        {quizId ? "Edit Quiz" : "Create Quiz"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <Input
            id="title"
            type="text"
            placeholder="Enter quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Enter quiz description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isSubmitting ? "Submitting..." : quizId ? "Update Quiz" : "Create Quiz"}
        </Button>
      </form>
    </div>
  );
};

export default QuizForm;
