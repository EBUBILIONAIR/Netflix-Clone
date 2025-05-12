import React, { useState } from "react";
import logo from "../assets/logo.png";
import { login, signup } from "../firebase";
import netflix_spinner from "../assets/netflix_spinner.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (signState === "Sign In") {
        await login(email, password);
        toast.success("Login successful!");
      } else {
        await signup(name, email, password);
        toast.success("Signup successful! You can now sign in.");
        setSignState("Sign In");
      }
    } catch (error) {
      toast.error(
        signState === "Sign In"
          ? "Wrong username or password. Please try again."
          : "Account already exists or signup failed."
      );
      console.error(error);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <img src={netflix_spinner} alt="Loading" className="w-16" />
    </div>
  ) : (
    <div
      className="min-h-screen px-8 py-5 bg-cover bg-center sm:px-5 sm:py-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/background_banner.jpg')",
      }}
    >
      {/* Logo */}
      <img src={logo} alt="Netflix Logo" className="w-40 mb-10" />

      {/* Form Container */}
      <div className="w-full max-w-md mx-auto p-10 sm:p-5 sm:mt-8 bg-black bg-opacity-75 rounded-md text-white">
        <h1 className="text-3xl font-semibold mb-7">{signState}</h1>

        <form onSubmit={user_auth} className="space-y-4">
          {signState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 bg-zinc-800 text-white px-4 rounded-md focus:outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 bg-zinc-800 text-white px-4 rounded-md focus:outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 bg-zinc-800 text-white px-4 pr-10 rounded-md focus:outline-none"
            />
            <span
              className="absolute top-3 right-4 text-xl text-zinc-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition"
          >
            {signState}
          </button>

          <div className="flex items-center justify-between text-sm text-zinc-400 mt-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              Remember Me
            </label>
            <p className="cursor-pointer hover:underline">Need Help?</p>
          </div>
        </form>

        <div className="mt-6 text-sm text-zinc-400 text-center">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                className="text-white font-medium cursor-pointer hover:underline"
                onClick={() => setSignState("Sign Up")}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="text-white font-medium cursor-pointer hover:underline"
                onClick={() => setSignState("Sign In")}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
