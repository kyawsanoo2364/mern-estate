import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    offer: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({
        ...sidebarData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const [sort, order] = e.target.value.split("_");
      setSidebarData({
        ...sidebarData,
        sort,
        order,
      });
    }
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchURL = urlParams.toString();
    navigate(`/search?${searchURL}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setSidebarData({
      searchTerm: urlParams.get("searchTerm") || "",
      type: urlParams.get("type") || "all",
      parking: urlParams.get("parking") === "true" ? true : false,
      offer: urlParams.get("offer") === "true" ? true : false,
      furnished: urlParams.get("furnished") === "true" ? true : false,
      sort: urlParams.get("sort") || "createdAt",
      order: urlParams.get("order") || "desc",
    });
    const fetchData = async () => {
      try {
        const res = await axios.get(`/listing/get?${urlParams.toString()}`);
        if (res) {
          setListings(res.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [location.search]);

  console.log(listings);

  return (
    <div className="my-5 flex flex-col md:flex-row">
      <div className="flex flex-col border-b-2 md:border-r-2 p-7 md:min-h-screen gap-2">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex gap-2 items-center ">
            <label htmlFor="searchTerm" className="whitespace-nowrap">
              Search Term:
            </label>
            <input
              type="text"
              placeholder="search..."
              id="searchTerm"
              className="p-3 rounded-lg w-full"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            <label htmlFor="" className="font-semibold">
              Type:{" "}
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="checkBox"
                id="all"
                className="size-5"
                checked={sidebarData.type === "all"}
                onChange={handleChange}
              />
              <label htmlFor="all">Rent & Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkBox"
                id="rent"
                className="size-5"
                checked={sidebarData.type === "rent"}
                onChange={handleChange}
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkBox"
                id="sale"
                className="size-5"
                checked={sidebarData.type === "sale"}
                onChange={handleChange}
              />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkBox"
                id="offer"
                className="size-5"
                checked={sidebarData.offer}
                onChange={handleChange}
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            <label htmlFor="" className="font-semibold">
              Amenities:{" "}
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="checkBox"
                id="parking"
                className="size-5"
                checked={sidebarData.parking}
                onChange={handleChange}
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkBox"
                id="furnished"
                className="size-5"
                checked={sidebarData.furnished}
                onChange={handleChange}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="sort_order">Sort:</label>
            <select
              id="sort_order"
              className="p-3 rounded-lg border cursor-pointer"
              defaultValue={sidebarData.sort + "_" + sidebarData.order}
              onChange={handleChange}
            >
              <option value="regularPrice_desc">Price Hight To Low</option>
              <option value="regularPrice_asc">Price Low To Hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 p-3 w-full text-white rounded-lg">
            Search
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700">
          Listing Results:
        </h1>
      </div>
    </div>
  );
}

export default Search;
