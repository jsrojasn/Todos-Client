import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { LOCAL_STORAGE_TODOS_APP } from "../utils/constants";

function AddTodo() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const user = localStorage.getItem(LOCAL_STORAGE_TODOS_APP);
  const parsedUser = JSON.parse(user);

  const handleCreate = () => {
    if (title.trim().length === 0) {
      alert("Please provide a value");
      return;
    }
    axios
      .post(
        "http://localhost:4000/todos/add-todo",
        { title },
        {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        }
      )
      .then(function (response) {
        navigate("/dashboard");
      })
      .catch(function (error) {
        alert("An error ocurred. Please try again later");
      });
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col border-2 border-black py-3 px-6">
        <p className="text-xl font-bold text-center my-3">Add Todo</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border-2 border-black rounded p-2 w-96"
          maxlength="250"
        />
        <button
          class="bg-slate-800 text-white font-bold py-2 px-4 rounded w-full my-2 mt-6"
          onClick={handleCreate}
        >
          Create Todo
        </button>
        <button
          class="bg-slate-800 text-white font-bold py-2 px-4 rounded w-full my-2"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
