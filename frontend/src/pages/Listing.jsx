import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMap,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";

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
          <div className="">
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
            <div className="my-2 flex flex-col gap-6 max-w-4xl mx-auto p-3">
              <div className="text-xl font-bold flex gap-2 items-center ">
                <span>{listing?.name}</span>
                {"-"}
                <span>
                  $
                  {listing?.discountPrice > 0
                    ? listing?.discountPrice.toLocaleString("en-US")
                    : listing?.regularPrice.toLocaleString("en-US")}
                </span>
                {listing.type === "rent" && <span>/ Month</span>}
              </div>
              <div className="flex gap-2 items-center">
                <FaMapMarkerAlt className="size-5 text-green-700" />
                <span>{listing?.address}</span>
              </div>
              <div className="flex gap-2 items-center">
                <p className="bg-red-900 text-white p-1 px-4 rounded max-w-[200px] text-center uppercase font-semibold">
                  {listing.type === "rent" ? "For Rent" : "For Sell"}
                </p>
                {listing.offer && (
                  <p className="bg-green-900 text-white p-1 px-4 rounded max-w-[200px] text-center uppercase font-semibold">
                    {+listing.regularPrice - +listing.discountPrice} $
                  </p>
                )}
              </div>
              <div>
                <p className="text-slate-800 text-justify">
                  <span className="font-bold text-black">Description - </span>
                  {listing.description}
                </p>
                <ul className="text-green-900 font-semibold my-2 flex items-center gap-4 sm:gap-6 flex-wrap">
                  <li className="flex gap-1 items-center whitespace-nowrap">
                    <FaBed className="text-lg" />
                    {listing.bedrooms > 1
                      ? `${listing.bedrooms} beds`
                      : `${listing.bedrooms} bed`}
                  </li>
                  <li className="flex gap-1 items-center whitespace-nowrap">
                    <FaBath className="text-lg" />
                    {listing.bathrooms > 1
                      ? `${listing.bathrooms} baths`
                      : `${listing.bathrooms} bath`}
                  </li>
                  <li className="flex gap-1 items-center whitespace-nowrap">
                    <FaParking className="text-lg" />
                    {listing.parking ? "Parking Spot" : "No Parking"}
                  </li>
                  <li className="flex gap-1 items-center whitespace-nowrap">
                    <FaChair className="text-lg" />
                    {listing.furnished ? "Furnished" : "Not Furnished"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
export default Listing;
