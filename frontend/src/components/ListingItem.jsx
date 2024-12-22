import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:max-w-[270px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0].url}
          className="h-[150px] sm:h[100px] w-full object-cover hover:scale-105 transition-scale duration-200"
        />
        <div className="p-3 flex flex-col gap-2">
          <p className="truncate text-lg text-slate-700 font-semibold">
            {listing.name}
          </p>
          <div className="flex items-center gap-2">
            <MdLocationOn className="size-4 text-green-700" />
            <p className="text-sm text-slate-600 truncate">{listing.address}</p>
          </div>
          <p className="text-sm text-slate-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && "/ month"}
          </p>
          <div className="text-slate-700 flex items-center gap-4">
            <div className="text-xs font-bold ">
              {listing.bedrooms > 1
                ? listing.bedrooms + " beds"
                : listing.bedrooms + " bed"}
            </div>
            <div className="text-xs font-bold ">
              {listing.bathrooms > 1
                ? listing.bathrooms + " baths"
                : listing.bathrooms + " bath"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
