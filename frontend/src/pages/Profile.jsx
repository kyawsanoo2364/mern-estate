import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="size-24 self-center my-7 rounded-full"
          src={currentUser?.avatar}
        />
        <input
          type="text"
          placeholder="username"
          className="p-3 text-lg rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="p-3 text-lg rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 text-lg rounded-lg"
          id="password"
        />
        <button className="p-3 uppercase bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="mt-4 flex justify-between ">
        <span className="text-red-500">Delete account</span>
        <span className="text-red-500 capitalize">Sign out</span>
      </div>
    </div>
  );
}
