import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../Context/Provider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BiSearchAlt } from "react-icons/bi";

const Header = () => {
  const [query, setQuery] = useState("");
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      dispatch({
        type: "LOGOUT",
      });
      window.localStorage.removeItem("bezenuser");
      toast.success("Logged Out");
      navigate("/");
    } catch (err) {
      toast.error("Error logging out");
    }
  };

  const redirectSearch = () => {
    const sq = query.trim();
    if (!sq) {
      setQuery("");
      return;
    }
    setQuery("");
    navigate(`/search/${sq}`);
  };
  return (
    <div className="sticky top-0 z-[99]">
      <header className="text-gray-50 body-font shadow-md shadow-gray-100 bg-gray-900">
        <div className="container mx-auto flex justify-between px-5 py-3 items-center">
          <div className=" flex justify-center items-center">
            <Link to="/">
              <p className="flex   items-center text-gray-100 text-[15px] font-semibold  md:mb-0">
                <span className="ml-3 text-xl">BeZen Food</span>
              </p>
            </Link>
          </div>

          <div className=" flex justify-center items-center gap-2">
            {user?.data?.User ? (
              <>
                {" "}
                <button
                  onClick={logout}
                  className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none  rounded text-sm md:text-md  md:mt-0 text-gray-100"
                >
                  Logout
                </button>
                <Link to="/dashboard">
                  <button className="inline-flex items-center bg-gray-700 text-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-600 rounded text-sm md:text-md md:mt-0">
                    Dashboard
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  {" "}
                  <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-sm md:text-md  md:mt-0 text-gray-900">
                    Signup
                  </button>
                </Link>
                <Link to="/login">
                  <button className="inline-flex items-center bg-sky-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-sky-600 rounded text-sm md:text-md md:mt-0">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="w-full bg-teal-100 h-8">
        <div className=" w-full flex justify-center items-center  rounded-md shadow-sm h-8">
          <BiSearchAlt className="ml-6" />
          <input
            type="text"
            value={query}
            id="search"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                redirectSearch();
              }
            }}
            onChange={(e) => setQuery(e.target.value)}
            className="focus:outline-none bg-teal-100 text-sky-800 block font-semibold w-full pl-2 sm:text-sm border-gray-300 rounded h-6 placeholder:text-teal-700 placeholder:font-semibold focus:ring-1 focus:ring-teal-600"
            placeholder="Search here..."
          />
          <button
            hidden={!query}
            onClick={redirectSearch}
            className="text-sm bg-teal-600 py-[6px] px-2 text-white"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
