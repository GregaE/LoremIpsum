// import TextInput from '../Forms/Elements/Inputs/TextInput';
// import Button from '../Forms/Elements/Buttons/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { LoginService } from '../../../utils/ApiService';
import Auth from '../../../utils/Auth';

import { LockClosedIcon } from '@heroicons/react/solid'

const initialState = {
  email: '',
  password: '',
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ state, setState ] = useState(initialState);
/*
  Here we just basically have a form and get user and pwd
*/

  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = state;
    const user = { email, password };
    const res = await LoginService(user);
    if (res.error) {
      console.log(res.error)
      alert(`${res.message}`);
      setState(initialState);

    } else {
      dispatch({type: 'TOGGLE_LOGIN', payload: true });
      Auth.login(() => navigate('/'));
    }

  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-md w-full space-y-8 bg-light rounded-container p-10">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Create your CV in just a few steps
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange}
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="text-sm">
              <span>Not yet registered? </span>
              <span>
                <a href="#" className="font-medium text-primary hover:bg-primary-bg">
                  Click here to register now.
                </a>
              </span>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-light bg-primary hover:bg-primary-x focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}