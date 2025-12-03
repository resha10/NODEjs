import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    SetShowUserLogin,
    navigate,
    searchQuery,
    SetSearchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) navigate("/products");
  }, [searchQuery]);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#f4eadf] to-[#eaddcc] backdrop-blur-md border-b border-[#d8c7b6] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center space-x-2"
          >
            <span className="text-[#5c4b3f] font-bold text-xl tracking-wide">
              Home<span className="text-[#c08b65]">Decor</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: "/", name: "Home" },
              { path: "/products", name: "Décor Items" },
              { path: "/about", name: "About" },
              { path: "/contact", name: "Contact" },
            ].map(({ path, name }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#c08b65]"
                      : "text-[#6f6258] hover:text-[#c08b65]"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img
                  src={assets.search_icon}
                  alt="search"
                  className="w-4 h-4 opacity-70"
                />
              </div>
              <input
                onChange={(e) => SetSearchQuery(e.target.value)}
                className="block w-72 pl-10 pr-3 py-2 border border-[#c8b5a3] rounded-lg text-sm placeholder-[#8a7c72] bg-[#f7efe6] text-[#3d352f] focus:outline-none focus:ring-2 focus:ring-[#c08b65] transition-all duration-200"
                type="text"
                placeholder="Search décor items..."
              />
            </div>

            {/* Cart */}
            <div
              onClick={() => navigate("/cart")}
              className="relative cursor-pointer p-2 hover:bg-[#efdfcf] rounded-lg transition-colors duration-200"
            >
              <img src={assets.nav_cart_icon} alt="cart" className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c08b65] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {getCartCount()}
                </span>
              )}
            </div>

            {/* User Menu */}
            {!user ? (
              <button
                onClick={() => SetShowUserLogin(true)}
                className="bg-[#c08b65] hover:bg-[#a97757] text-white px-6 py-2 rounded-md font-semibold transition-all duration-200"
              >
                Sign In
              </button>
            ) : (
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-[#efdfcf] rounded-lg transition-colors duration-200">
                  <img
                    src={assets.profile_icon}
                    className="w-8 h-8 rounded-full"
                    alt="Profile"
                  />
                  <span className="text-sm font-medium text-[#5e5248]">
                    {user.name}
                  </span>
                </div>

                <div className="absolute right-0 mt-2 w-48 bg-[#f4eadf] rounded-lg shadow-lg border border-[#d8c7b6] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div
                    onClick={() => navigate("/my-orders")}
                    className="px-4 py-2 text-sm text-[#5e5248] hover:bg-[#e8d8c8] cursor-pointer"
                  >
                    My Orders
                  </div>
                  <div
                    onClick={logout}
                    className="px-4 py-2 text-sm text-[#5e5248] hover:bg-[#e8d8c8] cursor-pointer"
                  >
                    Sign Out
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <div
              onClick={() => navigate("/cart")}
              className="relative cursor-pointer p-2"
            >
              <img src={assets.nav_cart_icon} alt="cart" className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c08b65] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg hover:bg-[#efdfcf] transition-colors duration-200"
            >
              <img src={assets.menu_icon} alt="menu" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="md:hidden border-t border-[#d8c7b6] py-4 space-y-2 bg-[#f4eadf]">
            {[
              { path: "/", name: "Home" },
              { path: "/products", name: "Décor Items" },
              { path: "/about", name: "About" },
              { path: "/contact", name: "Contact" },
            ].map(({ path, name }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-[#6f6258] hover:bg-[#e8d8c8] rounded-lg transition-colors duration-200"
              >
                {name}
              </NavLink>
            ))}

            {user && (
              <NavLink
                to="/my-account"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-[#6f6258] hover:bg-[#e8d8c8] rounded-lg transition-colors duration-200"
              >
                My Account
              </NavLink>
            )}

            <div className="px-4 pt-2">
              {!user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    SetShowUserLogin(true);
                  }}
                  className="bg-[#c08b65] hover:bg-[#a97757] text-white w-full px-6 py-2 rounded-md font-semibold"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="bg-[#c08b65] hover:bg-[#a97757] text-white w-full px-6 py-2 rounded-md font-semibold"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
