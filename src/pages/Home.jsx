import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import { LOCAL_STORAGE_TODOS_APP } from "../utils/constants";

function Home() {
  const [isSub, setIsSub] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem(LOCAL_STORAGE_TODOS_APP);
  const parsedUser = JSON.parse(user);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    axios
      .get("http://localhost:4000/stripe/is-subscribed", {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
      })
      .then(function (response) {
        setIsSub(response.data.isSub);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        setHasError(true);
      });
  }, [parsedUser.token]);

  const handleManageSub = () => {
    axios
      .post(
        "http://localhost:4000/stripe/billing-session",
        {},
        {
          headers: {
            Authorization: `Basic ${parsedUser.token}`,
          },
        }
      )
      .then(function (response) {
        window.location.href = response.data.url;
      })
      .catch(function (error) {
        alert("An error ocurred. Please try again later");
      });
  };
  const handlePurchaseSub = () => {
    axios
      .post(
        "http://localhost:4000/stripe/session",
        {},
        {
          headers: {
            Authorization: `Basic ${parsedUser.token}`,
          },
        }
      )
      .then(function (response) {
        window.location.href = response.data.url;
      })
      .catch(function (error) {
        alert("An error ocurred. Please try again later");
      });
  };

  if (hasError) return <ErrorMessage />;

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col border-2 border-black py-3 px-6">
        <p className="text-center my-2">Hello {parsedUser.email}</p>
        {isSub ? (
          <div>
            <button
              class="bg-slate-800 text-white font-bold py-2 px-4 rounded w-full my-2"
              onClick={() => navigate("add-todo")}
            >
              Add Todo
            </button>
            <button
              class="bg-slate-800 text-white font-bold py-2 px-4 rounded w-full my-2"
              onClick={() => navigate("dashboard")}
            >
              Manage Todo
            </button>
            <button
              class="bg-green-500 text-white font-bold py-2 px-4 rounded w-full my-2"
              onClick={handleManageSub}
            >
              Manage Subscription
            </button>
          </div>
        ) : (
          <div>
            <button
              class="bg-green-500 text-white font-bold py-2 px-4 rounded w-full my-2"
              onClick={handlePurchaseSub}
            >
              Purchase Subscription
            </button>
          </div>
        )}

        <p
          className="text-center text-sky-600 cursor-pointer mt-3"
          onClick={() => {
            localStorage.removeItem(LOCAL_STORAGE_TODOS_APP);
            navigate("/auth");
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
}

export default Home;
