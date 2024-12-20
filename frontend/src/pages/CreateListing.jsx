import { useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const typeOfCheckBoxesUI = [
  { id: "sale", label: "Sell" },
  { id: "rent", label: "Rent" },
  { id: "parking", label: "Parking Spot" },
  { id: "furnished", label: "Furnished" },
  { id: "offer", label: "Offer" },
];

const CreateListing = () => {
  const [images, setImages] = useState([]);
  const inputFileRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    parking: false,
    furnished: false,
    offer: false,
  });

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "text" ||
      e.target.type === "number" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleChangeInputFile = async (e) => {
    const files = e.target.files;
    if (
      images.length >= 0 &&
      images.length < 6 &&
      files.length > 0 &&
      files.length < 7
    ) {
      const promises = [];
      for (let file of files) {
        promises.push(handleStoreFile(file));
      }
      Promise.all(promises)
        .then((data) => {
          setImages([...images, ...data]);
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("You can only upload 6 images per listing.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (images.length < 1) {
        return toast.error("Please upload at least one image");
      }
      if (formData.regularPrice < formData.discountPrice) {
        return toast.error("Discount price should be less than regular price");
      }
      setIsLoading(true);
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("description", formData.description);
      fd.append("address", formData.address);
      fd.append("type", formData.type);
      fd.append("bedrooms", formData.bedrooms);
      fd.append("bathrooms", formData.bathrooms);
      fd.append("regularPrice", formData.regularPrice);
      fd.append("discountPrice", formData.discountPrice);
      fd.append("parking", formData.parking);
      fd.append("furnished", formData.furnished);
      fd.append("offer", formData.offer);
      for (let i = 0; i < images.length; i++) {
        fd.append("images", images[i].file);
      }
      const res = await axios.post("/listing/create", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res) {
        toast.success("Created Listing Successfully");
        navigate(`/listing/${res.data.userRef}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  const handleStoreFile = async (file) => {
    return new Promise((resolve, reject) => {
      try {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const data = { url: fileReader.result, file: file };
          resolve(data);
        };

        fileReader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleDeleteImage = (image) => {
    const filterImage = images.filter((i) => i !== image);
    setImages(filterImage);
  };

  return (
    <main className="p-3 max-w-3xl mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            required
            maxLength={62}
            minLength={10}
            onChange={handleChange}
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            id="address"
            placeholder="address"
            className="border p-3 rounded-lg"
            required
            onChange={handleChange}
          />
          <div className="flex flex-wrap gap-6">
            {typeOfCheckBoxesUI.map((c, idx) => (
              <div className="flex gap-2 items-center" key={`checkbox_${idx}`}>
                <input
                  type="checkbox"
                  id={c.id}
                  className="size-5"
                  checked={
                    c.id === "sale" || c.id === "rent"
                      ? c.id === formData.type
                      : formData[c.id]
                  }
                  aria-controls="checkbox"
                  onChange={handleChange}
                />
                <span>{c.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={10}
                id="bedrooms"
                value={formData.bedrooms}
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={10}
                id="bathrooms"
                value={formData.bathrooms}
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={50}
                max={10000000}
                id="regularPrice"
                value={formData.regularPrice}
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span>( $ / month )</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={10000000}
                  id="discountPrice"
                  value={formData.discountPrice}
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                />
                <div className="flex flex-col items-center">
                  <p>Discount Price</p>
                  <span>( $ / month )</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold ">
            Image:
            <span className="font-normal text-slate-600">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              accept="image/*"
              multiple
              id="images"
              className="p-3 border border-gray-300 rounded w-full  "
              onChange={handleChangeInputFile}
              ref={inputFileRef}
            />
            <button
              className="p-3 rounded-lg text-green-700 border border-green-700 uppercase hover:shadow-md disalbed:opacity-80 "
              type="button"
              onClick={() => inputFileRef.current.click()}
            >
              Upload
            </button>
          </div>
          <div className="overflow-y-auto max-h-[350px] ">
            {images?.length > 0 &&
              images.map((image, idx) => (
                <div
                  className="my-4 border rounded p-3 flex justify-between items-center"
                  key={`image-${idx}`}
                >
                  <img
                    src={image.url}
                    alt="list-image"
                    className="w-20 h-20 object-contain rounded-lg "
                  />
                  <div>
                    <MdDeleteForever
                      className="size-6 text-red-700 cursor-pointer"
                      onClick={() => handleDeleteImage(image)}
                    />
                  </div>
                </div>
              ))}
          </div>
          <button
            className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80 uppercase"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Create Listing"}
          </button>
        </div>
      </form>
    </main>
  );
};
export default CreateListing;
