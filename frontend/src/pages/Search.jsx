function Search() {
  return (
    <div className="my-5 flex flex-col md:flex-row">
      <div className="flex flex-col border-b-2 md:border-r-2 p-7 md:min-h-screen gap-2">
        <form className="flex flex-col gap-6">
          <div className="flex gap-2 items-center ">
            <label htmlFor="searchTerm" className="whitespace-nowrap">
              Search Term:
            </label>
            <input
              type="text"
              placeholder="search..."
              id="searchTerm"
              className="p-3 rounded-lg w-full"
            />
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            <label htmlFor="" className="font-semibold">
              Type:{" "}
            </label>
            <div className="flex gap-2 items-center">
              <input type="checkBox" id="all" className="size-5" />
              <label htmlFor="all">Rent & Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkBox" id="rent" className="size-5" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkBox" id="sale" className="size-5" />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkBox" id="offer" className="size-5" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            <label htmlFor="" className="font-semibold">
              Amenities:{" "}
            </label>
            <div className="flex gap-2 items-center">
              <input type="checkBox" id="parking" className="size-5" />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkBox" id="furnished" className="size-5" />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="sort_order">Sort:</label>
            <select
              id="sort_order"
              className="p-3 rounded-lg border cursor-pointer"
            >
              <option value="">Price Hight To Low</option>
              <option value="">Price Low To Hight</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
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
