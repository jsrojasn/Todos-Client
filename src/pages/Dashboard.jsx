import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import { LOCAL_STORAGE_TODOS_APP } from "../utils/constants";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem(LOCAL_STORAGE_TODOS_APP);
  const parsedUser = JSON.parse(user);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    axios
      .get("http://localhost:4000/todos/todos-by-user", {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
      })
      .then(function (response) {
        setTodos(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        setHasError(true);
      });
  }, [parsedUser.token]);

  const handleDelete = (id) => {
    axios
      .delete(
        "http://localhost:4000/todos/delete-todo",

        {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
          data: { id },
        }
      )
      .then(function (response) {
        setTodos((prevTodos) => prevTodos.filter((c) => c._id !== id));
      })
      .catch(function (error) {
        alert("An error ocurred. Please try again later");
      });
  };

  if (isLoading) return <Spinner />;

  if (hasError) return <ErrorMessage />;

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col border-2 border-black py-3 px-6">
        <p className="text-xl font-bold text-center my-3">My Todos</p>
        {todos.map((todo, index) => {
          return (
            <div className="flex justify-between" key={todo._id}>
              <p className="text-ellipsis w-96 overflow-hidden">{`${index + 1}. ${todo.title}`}</p>
              <div className="flex">
                <p
                  className="text-sky-600 cursor-pointer px-2"
                  onClick={() => navigate(`/edit-todo/${todo._id}`)}
                >
                  Edit
                </p>
                <p
                  className="text-sky-600 cursor-pointer"
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </p>
              </div>
            </div>
          );
        })}
        <button
          class="bg-slate-800 text-white font-bold py-2 px-4 my-3 rounded w-full my-2"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
