import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInSucces } from "../redux/user/userSlice";
import toast from "react-hot-toast";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("/auth/google", {
        email: result.user.email,
        username: result.user.displayName,
        avatar: result.user.photoURL,
      });
      if (res.data) {
        dispatch(signInSucces(res.data));
        toast.success("Sign In successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Couldn't not sign in with google ", error);
      toast.error("Couldn't sign in with google: " + error.message);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="p-1 rounded-lg flex gap-2 items-center bg-gray-50 w-full justify-center hover:bg-gray-200 uppercase "
        onClick={handleClickGoogleAuth}
      >
        <img
          src="https://pngimg.com/uploads/google/google_PNG19635.png"
          className="size-10"
        />
        <span className="text-slate-600 ">Continue with google</span>
      </button>
    </div>
  );
};
export default OAuth;
