import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../Context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  const popularProducts = products.filter((product) => product.inStock).slice(0, 8);

  return (
    <section className="mt-20 md:mt-28 px-6 md:px-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase tracking-wide">
            Home Décor Picks
          </h2>
          <div className="w-24 h-1 bg-[#c49b63] mt-2 rounded-full"></div>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Stylish décor essentials to elevate your living space.
          </p>
        </div>
        <a
          href="/products"
          className="text-sm md:text-base text-[#c49b63] hover:text-[#a67d41] font-semibold hover:underline hidden md:inline transition-colors duration-200"
        >
          Explore More →
        </a>
      </div>

      {popularProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-10">
          No décor items available at the moment.
        </p>
      )}
    </section>
  );
};

export default BestSeller;
