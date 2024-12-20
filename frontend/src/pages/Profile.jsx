import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, isLoading } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const handleChangeUploadImage = (e) => {
    const fileData = e.target.files[0];
    if (fileData) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const result = fileReader.result;

        setPreviewFile(result);
      };
      fileReader.readAsDataURL(fileData);
      setFile(fileData);
    }
  };

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const formData = new FormData();
      if (form.username) {
        formData.append("username", form.username);
      }
      if (form.email) {
        formData.append("email", form.email);
      }
      if (form.password) {
        formData.append("password", form.password);
      }
      if (file) {
        formData.append("imageFile", file);
      }

      const res = await axios.post(
        `/user/update/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) {
        dispatch(updateUserSuccess(res.data));
        toast.success("Updated successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(updateUserFailure(error.response.data.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/user/delete/${currentUser._id}`);
      if (res) {
        dispatch(deleteUserSuccess());
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(deleteUserFailure(error.response.data.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await axios.get("/auth/signout");
      if (res) {
        dispatch(signOutUserSuccess());
        toast.success("Sign Out Successfully");
      }
    } catch (error) {
      dispatch(signOutUserFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={handleChangeUploadImage}
        />
        <img
          className={`size-24 self-center my-7 rounded-full  object-cover cursor-pointer ${
            previewFile && "border-2 border-yellow-500"
          }`}
          src={previewFile ? previewFile : currentUser?.avatar}
          onClick={() => fileRef.current.click()}
        />
        <input
          type="text"
          placeholder="username"
          className="p-3 text-lg rounded-lg"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChangeForm}
        />
        <input
          type="email"
          placeholder="email"
          className="p-3 text-lg rounded-lg"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChangeForm}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 text-lg rounded-lg"
          id="password"
          onChange={handleChangeForm}
        />
        <button
          className="p-3 uppercase bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Upload"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white p-3 text-center  rounded-lg uppercase hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>
      <div className="mt-4 flex justify-between ">
        <span className="text-red-500 cursor-pointer" onClick={handleDelete}>
          Delete account
        </span>
        <span
          className="text-red-500 capitalize cursor-pointer"
          onClick={handleSignOut}
        >
          Sign out
        </span>
      </div>
    </div>
  );
}
