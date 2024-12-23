import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SwiperCore from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [recentOfferListing, setRecentOfferListings] = useState([]);
  const [recentSaleListing, setRecentSaleListings] = useState([]);
  const [recentRentListing, setRecentRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await axios.get(`/listing/get?offer=true&limit=4`);
        if (res) {
          setRecentOfferListings(res.data);
          fetchRentListings();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await axios.get("/listing/get?type=rent&limit=4");
        setRecentRentListings(res.data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await axios.get("/listing/get?type=sale&limit=4");
        setRecentSaleListings(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/** top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl ">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          KSO Estate will KSO Estate is the best place to find your next perfect
          place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <div>
          <Link
            to={"/search"}
            className="text-blue-800 font-bold text-xs sm:text-sm hover:underline"
          >
            Let's get start...
          </Link>
        </div>
      </div>
      {/** swiper */}
      <Swiper navigation>
        {recentOfferListing &&
          recentOfferListing.length > 0 &&
          recentOfferListing.map((listing) => (
            <SwiperSlide>
              <div
                className="h-[500px]  w-full"
                style={{
                  background: `url(${listing.imageUrls[0].url}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/** listing results  */}
      {recentOfferListing && recentOfferListing.length > 0 && (
        <div className="max-w-6xl mx-auto my-4">
          <div className="my-3">
            <h2 className="font-semibold text-2xl text-slate-600">
              Recent Offers
            </h2>
            <Link
              to={"/search?offer=true"}
              className="text-sm text-blue-800 hover:underline"
            >
              See More offers
            </Link>
          </div>
          <div className="flex gap-4 flex-wrap">
            {recentOfferListing.map((listing, i) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </div>
        </div>
      )}
      {recentRentListing && recentRentListing.length > 0 && (
        <div className="max-w-6xl mx-auto my-4">
          <div className="my-3">
            <h2 className="font-semibold text-2xl text-slate-600">
              Recent Rent for places
            </h2>
            <Link
              to={"/search?type=rent"}
              className="text-sm text-blue-800 hover:underline"
            >
              See More rents
            </Link>
          </div>
          <div className="flex gap-4 flex-wrap">
            {recentRentListing.map((listing, i) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </div>
        </div>
      )}
      {recentSaleListing && recentSaleListing.length > 0 && (
        <div className="max-w-6xl mx-auto my-4">
          <div className="my-3">
            <h2 className="font-semibold text-2xl text-slate-600">
              Recent Sale for places
            </h2>
            <Link
              to={"/search?type=sale"}
              className="text-sm text-blue-800 hover:underline"
            >
              See More Places
            </Link>
          </div>
          <div className="flex gap-4 flex-wrap">
            {recentSaleListing.map((listing, i) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
