import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PencilAltIcon } from "@heroicons/react/solid";

import withDashboardLayout from "../../hoc/withDashboardLayout/withDashboardLayout";
import {
  checkSession,
  getCurrentUser,
} from "../../context/authContext/localStorage";
import { getUserData, updateUser } from "../../utils/userData-request";
import { useAuth } from "../../context/authContext/reducer";

function DashboardSingleEmployee() {
  const { employeeId } = useParams();
  const isLogged = checkSession();
  const [employeeData, setEmployeeData] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { signInSuccess } = useAuth();

  useEffect(() => {
    if (isLogged) {
      const currentUser = getCurrentUser();
      signInSuccess(currentUser);
    }
    (async function fetchData() {
      const { data } = await getUserData(employeeId);
      setEmployeeData(data.data);
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newData = {
        name: name !== "" ? name : employeeData.name,
        surname: surname !== "" ? surname : employeeData.surname,
        email: email !== "" ? email : employeeData.email,
        roles: role !== "" ? [role] : employeeData.roles,
      };
      updateUser(employeeData._id, newData);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      {employeeData ? (
        <div className="w-80 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="w-full px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Applicant Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and application.
            </p>
          </div>
          <form action="#" method="POST" onSubmit={handleSubmit}>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      defaultValue={employeeData.name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Surname</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      id="surname"
                      name="surname"
                      type="surname"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      defaultValue={employeeData.surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Current Role
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <select
                      onChange={(e) => setRole(e.target.value)}
                      defaultValue={employeeData.roles[0]}
                    >
                      <option>Customer</option>
                      <option>Employee</option>
                      <option>Admin</option>
                    </select>
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      defaultValue={employeeData.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Registered At
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {employeeData.createdAt}
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <PencilAltIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Edit
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default withDashboardLayout(DashboardSingleEmployee);
