import React from "react";
import { useAppContext } from "../../Context/AppContext";
import { Link, Outlet, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { FiLogOut, FiPackage, FiUser, FiClipboard, FiPlusCircle } from "react-icons/fi";

const SellerLayout = () => {
  const { axios, navigate, setIsSeller, sellerProfile, setSellerProfile } = useAppContext();

  const sidebarLinks = [
    { name: "Admin Profile", path: "/seller/dashboard", icon: <FiUser /> },
    { name: "Add Product", path: "/seller/dashboard/add-product", icon: <FiPlusCircle /> },
    { name: "Product List", path: "/seller/dashboard/product-list", icon: <FiPackage /> },
    { name: "Orders", path: "/seller/dashboard/orders", icon: <FiClipboard /> },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message || "Logged out successfully");
        setIsSeller(false);
        setSellerProfile(null);
        navigate("/");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-10 py-3 bg-white border-b shadow-sm">
        <Link to="/" className="text-2xl font-bold text-[#b5835a] hover:text-[#a4724f] transition-colors">
          Genz Fit
        </Link>
          <div className="flex items-center gap-5 text-gray-600">
          <span className="font-medium hidden sm:block">
            {sellerProfile?.name || "Admin"}
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-full btn"
          >
            <FiLogOut className="text-lg" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </header>

      {/* Layout Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-20 md:w-64 bg-white border-r shadow-sm h-full flex flex-col py-6">
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/seller/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-4 py-3 px-5 mx-2 rounded-lg text-gray-700 font-medium transition-all 
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#f5e6d0] to-[#e9d3b8] text-[#b5835a] font-semibold shadow-inner"
                      : "hover:bg-gray-100 hover:text-[#b5835a]"
                  }`
                }
              >
                <span className="text-lg">{link.icon}</span>
                <span className="hidden md:block">{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-5 md:p-10 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
