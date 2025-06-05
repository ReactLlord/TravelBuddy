import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getSession, signIn, signUp } from "./auth.js"; // adjust path
import { TravelContext } from "../../context/TravelContext.jsx";

function LoginSignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
 
  const {isAuthenticated, setIsAuthenticated,isSignUp, setIsSignUp} = useContext(TravelContext)

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const { session } = await getSession();
      if (session) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkSession();
  }, []);

 

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (isSignUp) {
      const { user, error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Signup successful! You can Login...");
        setTimeout(() => {
          setIsAuthenticated(true);
        }, 1000); 
      }
    } else {
      const { user, error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          setIsAuthenticated(true);
        }, 1000);
      }
    }
    setLoading(false);
  };

   useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-md ring-1 ring-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {isSignUp ? "Create an account" : "Sign in to your account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6   mx-auto ">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete={isSignUp ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500 sm:text-sm"
            placeholder="********"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-600" role="alert">
            {success}
          </p>
        )}

        <button
          type="submit"
          className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white
                     font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2
                     focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm transition"
          disabled={loading}
        >
          {loading
            ? isSignUp
              ? "Signing Up..."
              : "Signing In..."
            : isSignUp
            ? "Sign Up"
            : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError("");
            setSuccess("");
          }}
          className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default LoginSignupForm;