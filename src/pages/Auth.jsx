import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import { Formik, Form, Field } from "formik";
import { LOCAL_STORAGE_TODOS_APP } from "../utils/constants";
import { validateEmail, validatePassword } from "../utils/validations";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const user = localStorage.getItem(LOCAL_STORAGE_TODOS_APP);
  const navigate = useNavigate();
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (values) => {
    axios
      .post(`http://localhost:4000/user/signin`, {
        email: values.email,
        password: values.password,
      })
      .then(function (response) {
        if (response.data.message === "User doesnt exist") {
          alert("User doesnt exist. Please create account");
          return;
        }
        localStorage.setItem(
          LOCAL_STORAGE_TODOS_APP,
          JSON.stringify({
            email: response.data.userEmail,
            token: response.data.token,
          })
        );
        navigate("/");
      })
      .catch(function (error) {
        alert("Please use valid credentials");
      });
  };
  const handleSignup = (values) => {
    axios
      .post(`http://localhost:4000/user/signup`, {
        email: values.email,
        password: values.password,
      })
      .then(function (response) {
        if (response.data.message === "Email already used") {
          alert("Email already used please signin");
          return;
        }

        localStorage.setItem(
          LOCAL_STORAGE_TODOS_APP,
          JSON.stringify({
            email: response.data.userEmail,
            token: response.data.token,
          })
        );
        navigate("/");
      })
      .catch(function (error) {
        alert("Please use valid values");
      });
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col border-2 border-black py-3 px-6 w-96">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            isLogin ? handleLogin(values) : handleSignup(values);
          }}
        >
          {({ errors, touched, setValues }) => (
            <Form>
              <div className="mb-4">
                <p className="block text-grey-darker text-sm font-bold mb-2">
                  Email
                </p>
                <Field
                  className="shadow appearance-none border border-2 border-black rounded w-full py-2 px-3 text-grey-darker"
                  name="email"
                  validate={validateEmail}
                />
                {errors.email && touched.email && (
                  <p className="text-rose-700 text-xs italic py-1 text-right">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <p className="block text-grey-darker text-sm font-bold mb-2">
                  Password
                </p>
                <Field
                  className="shadow appearance-none border border-2 border-black rounded w-full py-2 px-3 text-grey-darker"
                  name="password"
                  validate={validatePassword}
                />
                {errors.password && touched.password && (
                  <p class="text-rose-700 text-xs italic py-1 text-right">
                    {errors.password}
                  </p>
                )}
              </div>

              {isLogin ? (
                <div>
                  <button
                    class="bg-slate-800 text-white font-bold py-2 px-4 rounded w-full my-2"
                    type="submit"
                  >
                    Login
                  </button>
                  <p
                    className="text-center text-sky-600 cursor-pointer"
                    onClick={() => {
                      setIsLogin(false);
                      setValues({ email: "", password: "" });
                    }}
                  >
                    Create an account
                  </p>
                </div>
              ) : (
                <div>
                  <button
                    class="bg-yellow-400 text-black font-bold py-2 px-4 rounded w-full my-2"
                    type="submit"
                  >
                    Create an account
                  </button>
                  <p
                    className="text-center text-sky-600 cursor-pointer"
                    onClick={() => {
                      setIsLogin(true);
                      setValues({ email: "", password: "" });
                    }}
                  >
                    Login
                  </p>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Auth;
