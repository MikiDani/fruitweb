import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { BiDoorOpen } from "react-icons/bi"

export default function Login() {

  const url = "http://localhost:8080";

  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  //localStorage.setItem(key, value);
  localStorage.setItem("test", "valamiertek");
  
  console.log(localStorage.getItem("test"));
  
  const handleForm = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
  }

  const getUsers = async () => {
    const response = await fetch('http://localhost:8080/allusers', {
      method: 'GET'
    });

    const data = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    console.log('useEffect...');
    getUsers();
  }, [form]);

  return (
    <div className="flex justify-start bg-white">
      <div className="w-full lg:w-1/2 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 mx-auto">
        <div className="">
          <ul className="hidden">
            {JSON.stringify(form)}
            {users.map(user => <li key={user._id}>{user.username}, {user.password}</li>)}
          </ul>
        </div>
        <div className="p-6 space-y-4">
          <h1 className="font-bold text-gray-900 text-2xl dark:text-white">
            Login
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input type="text" name="username" id="username" onChange={handleForm} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" autoComplete="off" required="" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" onChange={handleForm} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-gray-500 dark:text-gray-300">I am not a Robot!</label>
                </div>
              </div>
              <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
            </div>
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <NavLink to="/registration" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Registration
              </NavLink>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden lg:block w-1/2 rounded">
        <div className="h-full flex justify-center items-center">
          <BiDoorOpen size='20rem' color="orange" opacity="0.5" />
        </div>
      </div>
    </div>
  )
}