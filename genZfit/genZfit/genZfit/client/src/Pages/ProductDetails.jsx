import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../Components/ProductCard";

const ProductDetails = () => {
  const { products, currency, addToCart, navigate } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  // Load related products
  useEffect(() => {
    if (products.length && product) {
      const related = products
        .filter(
          (item) =>
            item.category === product.category && item._id !== product._id
        )
        .slice(0, 5);
      setRelatedProducts(related);
    }
  }, [products, product]);

  // Update main thumbnail
  useEffect(() => {
    const productImages = product?.image || product?.images || [];
    setThumbnail(productImages[0] || null);
  }, [product]);

  if (!product)
    return (
      <div className="flex items-center justify-center h-[70vh] text-gray-500 text-xl">
        Product not found.
      </div>
    );

  return (
    <div className="mt-24 px-6 md:px-10 lg:px-20">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">
        <Link to="/" className="hover:text-[#b5835a]">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/products" className="hover:text-[#b5835a]">
          Products
        </Link>{" "}
        /{" "}
        <Link
          to={`/products/${product.category.toLowerCase()}`}
          className="hover:text-[#b5835a]"
        >
          {product.category}
        </Link>{" "}
        / <span className="text-[#b5835a] font-medium">{product.name}</span>
      </p>

      {/* Main Product Section */}
      <div className="flex flex-col md:flex-row gap-16 mt-10">
        {/* Image Gallery */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          {/* Thumbnail List */}
          <div className="flex sm:flex-col gap-3 sm:overflow-y-auto">
            {(product.image || product.images || []).map((img) => (
              <div
                key={img}
                onClick={() => setThumbnail(img)}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                  thumbnail === img
                    ? "border-[#b5835a] shadow-md"
                    : "border-gray-300 hover:border-[#b5835a]/50"
                }`}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-20 h-20 object-cover sm:w-24 sm:h-24"
                />
              </div>
            ))}
          </div>

          {/* Main Preview */}
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <img
              src={thumbnail}
              alt={product.name}
              className="w-full md:w-[420px] h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 text-gray-700">
          <h1 className="text-3xl font-bold text-[#3a3a3a] mb-2">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mb-4">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="w-4"
                />
              ))}
            <span className="ml-2 text-sm text-gray-500">(4.0)</span>
          </div>

          {/* Pricing */}
          <div className="mb-6">
            <p className="text-gray-500 line-through text-sm">
              {currency} {product.price}
            </p>
            <p className="text-2xl font-semibold text-[#b5835a]">
              {currency} {product.offerprice || product.offerPrice || product.price}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              (Taxes included where applicable)
            </p>
          </div>

          {/* Description */}
          <h3 className="text-lg font-semibold text-[#3a3a3a] mb-2">
            About this Product
          </h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            {product.description.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3 bg-white border border-[#b5835a] text-[#b5835a] font-medium rounded-lg hover:bg-[#b5835a]/10 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3 bg-[#b5835a] text-white font-medium rounded-lg hover:bg-[#a4724f] transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-[#3a3a3a]">
            Related Products
          </h2>
          <div className="w-16 h-1 bg-[#b5835a] mx-auto mt-2 rounded-full"></div>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts
              .filter((item) => item.inStock)
              .map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No related products found.
          </p>
        )}

        <div className="text-center mt-12">
          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="px-10 py-2.5 border border-[#b5835a] text-[#b5835a] rounded-md font-medium hover:bg-[#b5835a]/10 transition"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
