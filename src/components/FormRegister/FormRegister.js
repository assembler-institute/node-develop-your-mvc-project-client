import React, { useState, useEffect } from "react";
import { signUpWithEmailAndPassword } from "../../firebase/firebase";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/authContext/reducer";
import { syncUserData } from "../../utils/auth-request";
import {
  checkSession,
  getCurrentUser,
} from "../../context/authContext/localStorage";

function FormRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let isLogged = checkSession();
  let {
    signUpEmailAndPass,
    signUpError,
    signUpSuccess,
    signInSuccess,
    errorMessage,
    signedUp,
  } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const user = await signUpWithEmailAndPassword(email, password);
      signUpEmailAndPass(user);
      await syncUserData(firstName, lastName);
      signUpSuccess(user);
    } catch (err) {
      signUpError(err.message);
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
      {signedUp ? (
        <p>Successfully registered. Go on and sign in!</p>
      ) : (
        <>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Access Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This information is necessary for registration
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST" onSubmit={handleSubmit}>
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First name
                          </label>
                          {/*        <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      /> */}
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="appearance-none rounded relative block w-full px-3 py-1 border mt-2 border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          ></input>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="appearance-none rounded relative block w-full mt-2 px-3 py-1 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            className="appearance-none rounded relative block w-full mt-2 px-3 py-1 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            className="appearance-none rounded relative block w-full mt-2 px-3 py-1 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="password2"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Repeat password
                          </label>
                          <input
                            type="password"
                            name="password2"
                            id="password2"
                            className="appearance-none rounded relative block w-full mt-2 px-3 py-1 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                          {errorMessage && (
                            <p className="text-red-500 text-xs italic">
                              {errorMessage}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FormRegister;
