import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign Up"); // Sign Up or Login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (state === "Sign Up") {
        ({ data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        }));
      } else {
        ({ data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        }));
      }

      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-cyan-400 to-sky-950">
      
      {/* Home Logo */}
      <img
        onClick={() => navigate("/")}
        src="/home.png"
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-15 sm:w-25 cursor-pointer rounded-xl"
      />

      {/* Form Card */}
      <div className="bg-slate-950 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src="/person.png" alt="Person Icon" className="size-6" />
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Full Name"
                className="bg-transparent outline-none w-full text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src="/email.png" alt="Email Icon" className="size-6" />
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="Email ID"
              className="bg-transparent outline-none w-full text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src="/lock.png" alt="Password Icon" className="size-6" />
            <input
              type="password"
              id="password"
              name="password"
              autoComplete={state === "Sign Up" ? "new-password" : "current-password"}
              placeholder="Password"
              className="bg-transparent outline-none w-full text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

        

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer transform transition-transform active:scale-95"
          >
            {state}
          </button>
        </form>

        {/* Switch between Login / Sign Up */}
        <p className="text-gray-400 text-center text-xs mt-4">
          {state === "Sign Up"
            ? (
              <>Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-blue-400 underline cursor-pointer"
                >
                  Login here
                </span>
              </>
            )
            : (
              <>Don't have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-blue-400 underline cursor-pointer"
                >
                  Sign up
                </span>
              </>
            )
          }
        </p>
          <div className="flex  justify-center mt-5 hover:text-blue-500">
            <button
            onClick={() => navigate("/reset-password")}
           
          >
            Forgot password?
          </button>
          </div>
      </div>
    </div>
  );
};
export default Login;