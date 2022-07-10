import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../Variables/Urls";
import moment from "moment";
const SearchResult = () => {
  const { query } = useParams();
  const [searching, setSearching] = useState(true);
  const [result, setResult] = useState(null);
  const searchQuery = async () => {
    try {
      setSearching(true);
      const res = await axios.post(`${BASE_API_URL}/search?query=${query}`);
      setResult(res.data);
      setSearching(false);
    } catch (err) {
      console.log(err);
      toast.error("Cannot searc | Error");
      setSearching(false);
    }
  };
  useEffect(() => {
    searchQuery();
    return () => {
      // cancel the subscription
      setSearching(false);
      setResult([]);
    };
  }, [query]);
  return (
    <>
      <div className="px-4  pb-5 border-b border-gray-200 flex items-center justify-between mt-6">
        <h3 className="text-lg lg:text-xl leading-6 font-semibold text-gray-900">
          Search Results : <span className="text-sky-500">{query}</span>
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4"></div>
      </div>
      {searching ? (
        <>
          <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-900 opacity-60 flex flex-col items-center justify-center">
            <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 class="text-center text-white text-xl font-semibold">
              Loading Recipe...
            </h2>
          </div>
        </>
      ) : !result || result.length === 0 ? (
        <div>
          <h1 className="text-gray-600 p-3">OOPS! No recipe found</h1>
        </div>
      ) : (
        <>
          <div class="flex flex-col gap-4 items-center lg:items-start justify-center mt-4 ml-3">
            {result.map((recipe) => (
              <>
                <div class="w-11/12 lg:w-1/2 border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50">
                  <div class="grid grid-cols-6 p-5 gap-y-2">
                    <div>
                      <img
                        src={recipe?.picture?.Location}
                        class="max-w-20 max-h-20 rounded-lg"
                      />
                    </div>

                    <div class="col-span-5 md:col-span-4 ml-4">
                      <p class="text-sky-500 font-bold text-xs">
                        {" "}
                        Last Update: {recipe.createdAt}
                      </p>

                      <p class="text-gray-600 font-bold"> {recipe.name}</p>

                      <p class="text-gray-500">
                        {" "}
                        {moment(recipe.createdAt).format(
                          "MMM Do YY, h:mm:ss a"
                        )}{" "}
                      </p>

                      <p class="text-gray-500 line-clamp-1">
                        {" "}
                        {recipe.description}{" "}
                      </p>
                    </div>

                    <div class="flex col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-end">
                      <div className="flex flex-row lg:flex-col gap-2 ">
                        <Link to={`/recipe/${recipe.slug}`}>
                          <p class="rounded-lg text-sky-600 font-bold border-2  py-1 px-3 text-sm w-fit h-fit">
                            {" "}
                            View
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      )}
      {/* <pre>{JSON.stringify(result, null, 4)}</pre> */}
    </>
  );
};

export default SearchResult;
