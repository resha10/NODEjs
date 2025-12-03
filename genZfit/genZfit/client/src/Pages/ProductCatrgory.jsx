import React from "react";
import { useAppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../Components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  // Find the category object
  const selectedCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  // Filter matching products
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="mt-24 px-6 md:px-10 lg:px-16">
      {/* Category Header */}
      {selectedCategory && (
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#3a3a3a] tracking-wide uppercase">
            {selectedCategory.text}
          </h1>
          <div className="mt-2 w-20 h-1 bg-[#b5835a] mx-auto rounded-full"></div>
          <p className="mt-3 text-gray-600 text-sm">
            Discover handcrafted furniture pieces from our{" "}
            <span className="font-medium text-[#b5835a]">
              {selectedCategory.text.toLowerCase()}
            </span>{" "}
            collection.
          </p>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium text-[#b5835a]">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
