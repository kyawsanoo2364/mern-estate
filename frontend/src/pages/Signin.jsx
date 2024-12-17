import { useReducer, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSucces,
} from "../redux/user/userSlice";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { isLoading } = useReducer((state) => state.user);
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post("/auth/signin", formData);
      if (res.data) {
        dispatch(signInSucces(res.data));
        naviagte("/");
        toast.success("Sign in successfully");
      }
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <span>Haven't an account?</span>
        <Link to={"/sign-up"} className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
