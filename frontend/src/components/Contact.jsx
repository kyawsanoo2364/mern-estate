import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await axios.get(`/user/${listing?.userRef}`);
        if (res) {
          setLandlord(res.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

    fetchLandlord();
  }, [listing?.userRef]);

  return (
    <div>
      {landlord && (
        <div className="my-4 flex gap-2 flex-col">
          <p className="text-lg ">
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            rows={4}
            placeholder="Enter your message..."
            className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none "
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Redirect&body=${message}`}
            className="p-3 bg-slate-700 rounded-lg text-white text-center"
          >
            Send
          </Link>
        </div>
      )}
    </div>
  );
};
export default Contact;
