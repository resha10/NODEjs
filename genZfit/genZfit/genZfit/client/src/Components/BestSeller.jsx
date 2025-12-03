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
            Best Sellers
          </h2>
          <div className="w-20 h-1 bg-[#ff4500] mt-2 rounded-full"></div>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Our most popular gym wear and accessories.
          </p>
        </div>
        <a
          href="/products"
          className="text-sm md:text-base text-[#ff4500] hover:text-[#e03e00] font-semibold hover:underline hidden md:inline transition-colors duration-200"
        >
          View all →
        </a>
      </div>

      {popularProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-10">No products available right now.</p>
      )}
    </section>
  );
};

export default BestSeller;
