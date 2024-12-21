import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [isLoading, setIsLoading] = useState(false);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get(`/listing/get/${listingId}`);
        if (res) {
          setListing(res.data);
          setIsLoading(false);
          setError(null);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        setError("Something went wrong");
      }
    };

    fetchListing();
  }, [listingId]);

  return (
    <main>
      {isLoading && (
        <h1 className="text-center my-7 text-xl font-semibold text-slate-600">
          Loading...
        </h1>
      )}
      {error && (
        <h1 className="text-center my-7 text-xl font-semibold text-slate-600">
          {error}
        </h1>
      )}
      {listing && (
        <>
          <div>
            <Swiper navigation>
              {listing.imageUrls.map((image) => (
                <SwiperSlide key={image.url}>
                  <img
                    src={image.url}
                    alt={image.url}
                    className="w-full h-[550px] object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </main>
  );
};
export default Listing;
