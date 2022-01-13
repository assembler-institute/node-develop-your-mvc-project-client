import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "../../firebase/firebase";
import { Navigate } from "react-router-dom";

import loginimage from "../../images/login-image.jpg";
import { LockClosedIcon } from "@heroicons/react/solid";

import { useAuth } from "../../context/authContext/reducer";
import { syncUserDataIn } from "../../utils/auth-request";
import {
  saveSession,
  checkSession,
  getCurrentUser,
} from "../../context/authContext/localStorage";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogged = checkSession();

  const {
    signInEmailAndPass,
    signInError,
    signInSuccess,
    errorMessage,
    isAuth,
    currentUserData,
  } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      signInEmailAndPass(res);
      const { data: user } = await syncUserDataIn();
      signInSuccess(user);
      saveSession(user);
    } catch (err) {
      signInError(err.message);
    }
  }

  useEffect(() => {
    if (isLogged) {
      const currentUser = getCurrentUser();
      signInSuccess(currentUser);
    }
  }, []);

  return (
    <>
      {isLogged ? <Navigate to="/" /> : null}
      {isAuth ? <Navigate to="/" /> : null}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto w-auto" src={loginimage} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/*           <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div> */}

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6">
              {errorMessage && (
                <p className="text-red-500 text-xs italic">{errorMessage}</p>
              )}
              {isAuth && (
                <p className="text-green-500 text-xs italic">Successful</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
