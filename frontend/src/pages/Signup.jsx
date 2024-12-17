import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const naviagte = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/signup", formData);
      if (res.data) {
        setIsLoading(false);
        naviagte("/sign-in");
        toast.success("Sign up successfully");
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          placeholder="username"
          id="username"
          className="p-3 border rounded-lg"
          onChange={handleChange}
        />
        <input
          placeholder="email"
          id="email"
          type="email"
          className="p-3 border rounded-lg"
          onChange={handleChange}
        />
        <input
          placeholder="password"
          id="password"
          type="password"
          className="p-3 border rounded-lg"
          onChange={handleChange}
        />
        <button
          className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed uppercase"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <span>Have'nt an account?</span>
        <Link to={"/sign-in"} className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
