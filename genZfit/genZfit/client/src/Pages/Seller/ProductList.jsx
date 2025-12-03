import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";
import { assets, categories } from "../../assets/assets";

const ProductList = () => {
  const { products = [], currency = "$", axios, fetchProducts } = useAppContext();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    offerPrice: "",
    description: "",
    material: "",
    dimensions: "",
    color: "",
    images: [],
  });

  // ✅ Delete Product
  const deleteProduct = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const { data } = await axios.delete(`/api/product/delete/${id}`);
      if (data.success) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong while deleting");
    }
  };

  // ✅ Open Edit Modal
  const openEdit = (product) => {
    if (!product) return;
    setEditing(product);

    // Ensure images are always an array of strings (URLs)
    const imageArray = Array.isArray(product.images)
      ? product.images
      : product.images
      ? [product.images]
      : [];

    setForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      offerPrice: product.offerPrice || product.offerprice || "",
      description: Array.isArray(product.description)
        ? product.description.join("\n")
        : product.description || "",
      material: product.material || "",
      dimensions:
        product.dimensions && typeof product.dimensions === "object"
          ? `${product.dimensions.width ?? ""}x${product.dimensions.height ?? ""}x${product.dimensions.depth ?? ""}`
          : product.dimensions || "",
      color: product.color || "",
      images: imageArray,
    });

    setIsEditOpen(true);
  };

  // ✅ Handle Input Change
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Image Uploads
  const handleImageChange = (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => {
      const updated = [...prev.images];
      updated[idx] = file;
      return { ...prev, images: updated };
    });
  };

  // ✅ Submit Edited Product
  const submitEdit = async (e) => {
    e.preventDefault();
    if (!editing) return;

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", Number(form.price));
      formData.append("offerPrice", Number(form.offerPrice));
      formData.append("description", form.description);
      formData.append("material", form.material);
      formData.append("dimensions", form.dimensions);
      formData.append("color", form.color);

      // Separate new files and existing URLs
      const newFiles = form.images.filter((img) => img instanceof File);
      const existingUrls = form.images.filter((img) => typeof img === "string");

      newFiles.forEach((file) => formData.append("images", file));
      formData.append("existingImages", JSON.stringify(existingUrls));

      const { data } = await axios.put(
        `/api/product/update/${editing._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success("Product updated successfully");
        setIsEditOpen(false);
        setEditing(null);
        fetchProducts();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-[#f5f1ea]">
      <div className="w-full md:p-10 p-4 max-w-5xl mx-auto">
        <h2 className="pb-4 text-lg font-medium text-taupe-700">All Products</h2>

        {/* Product Table */}
        <div className="flex flex-col items-center w-full overflow-hidden rounded-2xl bg-white border border-[#d6c8b8] shadow-md">
          <table className="md:table-auto table-fixed w-full">
            <thead className="text-taupe-800 text-sm text-left bg-[#f0ebe2]">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">Price</th>
                <th className="px-4 py-3 font-semibold truncate">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#7a6a5f]">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product._id || product.id}
                    className="border-t border-[#d6c8b8] hover:bg-[#f0ebe2] transition-all"
                  >
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="border border-[#d6c8b8] rounded p-2">
                        <img
                          src={product.images?.[0] || assets.upload_area}
                          alt="Product"
                          className="w-16 h-16 object-cover rounded"
                        />
                      </div>
                      <span className="truncate max-sm:hidden w-full">{product.name}</span>
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3 max-sm:hidden">
                      {currency}
                      {product.offerPrice || product.price}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-[#b48b6d] to-[#d6c8b8] text-white font-semibold hover:from-[#d6c8b8] hover:to-[#b48b6d] transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="px-3 py-1 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isEditOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-2xl border border-[#d6c8b8] p-6 shadow-lg overflow-y-auto max-h-[90vh]">
              <h3 className="text-lg font-semibold mb-3 text-taupe-700">Edit Product</h3>
              <form onSubmit={submitEdit} className="space-y-3">
                {/* Images */}
                <div>
                  <p className="text-taupe-700 font-medium mb-2">Product Images</p>
                  <div className="flex gap-2 flex-wrap">
                    {Array(4)
                      .fill("")
                      .map((_, idx) => (
                        <label key={idx}>
                          <input
                            type="file"
                            hidden
                            onChange={(e) => handleImageChange(e, idx)}
                          />
                          <img
                            src={
                              form.images[idx]
                                ? form.images[idx] instanceof File
                                  ? URL.createObjectURL(form.images[idx])
                                  : form.images[idx]
                                : assets.upload_area
                            }
                            alt="upload"
                            className="w-20 h-20 object-cover rounded border border-dashed border-[#b48b6d] cursor-pointer"
                          />
                        </label>
                      ))}
                  </div>
                </div>

                {/* Product Info */}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Name"
                  className="w-full rounded border px-3 py-2"
                />
                <select
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  className="w-full rounded border px-3 py-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, idx) =>
                    typeof cat === "string" ? (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ) : (
                      <option key={idx} value={cat.path || cat.name}>
                        {cat.name || cat.path}
                      </option>
                    )
                  )}
                </select>
                <input
                  type="text"
                  name="material"
                  value={form.material}
                  onChange={onChange}
                  placeholder="Material"
                  className="w-full rounded border px-3 py-2"
                />
                <input
                  type="text"
                  name="dimensions"
                  value={form.dimensions}
                  onChange={onChange}
                  placeholder="Dimensions (L×W×H)"
                  className="w-full rounded border px-3 py-2"
                />
                <input
                  type="text"
                  name="color"
                  value={form.color}
                  onChange={onChange}
                  placeholder="Color"
                  className="w-full rounded border px-3 py-2"
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  rows="4"
                  placeholder="Description"
                  className="w-full rounded border px-3 py-2"
                />

                <div className="flex gap-2">
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={onChange}
                    placeholder="Price"
                    className="flex-1 rounded border px-3 py-2"
                  />
                  <input
                    type="number"
                    name="offerPrice"
                    value={form.offerPrice}
                    onChange={onChange}
                    placeholder="Offer Price"
                    className="flex-1 rounded border px-3 py-2"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditOpen(false);
                      setEditing(null);
                    }}
                    className="px-3 py-2 rounded border border-[#d6c8b8] hover:bg-[#f0ebe2]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#b48b6d] to-[#d6c8b8] text-white font-semibold hover:from-[#d6c8b8] hover:to-[#b48b6d]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
