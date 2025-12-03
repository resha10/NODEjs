import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const categories = ['Clothing', 'Accessories', 'Equipment', 'Supplements', 'Footwear'];
const genders = ['Men', 'Women', 'Unisex'];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState([]);
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [gender, setGender] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [tags, setTags] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const { axios, fetchProducts } = useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const productData = {
        name,
        description: description.split("\n"),
        category,
        brand,
        size,
        color,
        material,
        gender,
        stock: Number(stock),
        price: Number(price),
        offerPrice: offerPrice ? Number(offerPrice) : undefined,
        tags: tags.split(",").map(tag => tag.trim()),
        isFeatured,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      files.forEach(file => formData.append("images", file));

      const { data } = await axios.post("/api/product/add", formData);
      if (data.success) {
        toast.success(data.message);
        // Reset form
        setFiles([]);
        setName("");
        setDescription("");
        setCategory("");
        setBrand("");
        setSize([]);
        setColor("");
        setMaterial("");
        setGender("");
        setStock("");
        setPrice("");
        setOfferPrice("");
        setTags("");
        setIsFeatured(false);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 h-[95vh] overflow-y-scroll no-scrollbar flex flex-col justify-start bg-[#f5f1ea] p-6 md:p-10">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-3xl mx-auto space-y-6 bg-white p-6 rounded-2xl border border-[#d6c8b8] shadow-md"
      >
        {/* Image Upload */}
        <div>
          <p className="text-lg font-medium text-taupe-700">Product Images</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {Array(4).fill("").map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => {
                    const updated = [...files];
                    updated[index] = e.target.files[0];
                    setFiles(updated);
                  }}
                />
                <img
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt="upload"
                  className="w-24 h-24 rounded-lg border border-dashed border-[#b48b6d] cursor-pointer object-cover hover:scale-105 transition-transform"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-taupe-700 font-medium">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              className="rounded border border-[#d6c8b8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b48b6d] transition"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-taupe-700 font-medium">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand Name"
              className="rounded border border-[#d6c8b8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b48b6d] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-taupe-700 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded border border-[#d6c8b8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b48b6d] transition"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-taupe-700 font-medium">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="rounded border border-[#d6c8b8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b48b6d] transition"
            >
              <option value="">Select Gender</option>
              {genders.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-taupe-700 font-medium">Color</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Black / Red / Blue"
              className="rounded border border-[#d6c8b8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b48b6d] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-taupe-700 font-medium">Material</label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Cotton / Polyester / Rubber"
              className="rounded border border-[#d6c8b8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b48b6d] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-taupe-700 font-medium">Stock</label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
              className="rounded border border-[#d6c8b8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b48b6d] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-taupe-700 font-medium">Sizes</label>
            <select
              multiple
              value={size}
              onChange={(e) => setSize(Array.from(e.target.selectedOptions, option => option.value))}
              className="rounded border border-[#d6c8b8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b48b6d] transition"
            >
              {sizes.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-taupe-700 font-medium">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Comma separated tags"
              className="rounded border border-[#d6c8b8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b48b6d] transition"
            />
          </div>

          <label className="inline-flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="accent-[#b48b6d]"
            />
            Featured Product
          </label>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-taupe-700 font-medium">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description (use new line for bullet points)"
            className="rounded border border-[#d6c8b8] px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#b48b6d] transition"
          />
        </div>

        {/* Pricing */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-taupe-700 font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="rounded border border-[#d6c8b8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b48b6d] transition"
              required
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-taupe-700 font-medium">Offer Price</label>
            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="0"
              className="rounded border border-[#d6c8b8] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b48b6d] transition"
            />
          </div>
        </div>

        {/* Submit */}
        <button className="w-full py-2.5 rounded-lg text-white bg-gradient-to-r from-[#b48b6d] to-[#d6c8b8] hover:from-[#d6c8b8] hover:to-[#b48b6d] transition-all font-medium">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
