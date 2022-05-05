import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import { LOCAL_STORAGE_TODOS_APP } from "../utils/constants";

function EditTodo() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { id } = useParams();
  const user = localStorage.getItem(LOCAL_STORAGE_TODOS_APP);
  const parsedUser = JSON.parse(user);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    axios
      .get(`http://localhost:4000/todos/get-todo-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
      })
      .then(function (response) {
        setTitle(response.data.title);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        setHasError(true);
      });
  }, [id, parsedUser.token]);

  const handleUpdateTodo = () => {
    if (title.trim().length === 0) {
      alert("Please provide a value");
      return;
    }
    axios
      .put(
        `http://localhost:4000/todos/update-todo`,
        {
          id,
          title,
        },
        {
          headers: {
            Authorization: `Basic ${parsedUser.token}`,
          },
        }
      )
      .then(function (response) {
        navigate("/dashboard");
      })
      .catch(function (error) {
        alert("Please use valid credentials");
      });
  };

  if (hasError) return <ErrorMessage />;

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col border-2 border-black py-3 px-6">
        <p className="text-xl font-bold text-center my-3">Edit Todo</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border-2 border-black rounded p-2 w-96"
          maxLength="250"
        />
        <button
          class="bg-slate-800 text-white font-bold py-2 px-4 rounded w-full my-2 mt-6"
          onClick={handleUpdateTodo}
        >
          Update Todo
        </button>
        <button
          class="bg-slate-800 text-white font-bold py-2 px-4 rounded w-full my-2"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditTodo;
