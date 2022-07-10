import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from "../Variables/Urls";

const SingleRecipeView = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_API_URL}/recipe/get/${slug}`);
      console.log(res.data);
      setRecipe(res.data);
      //   toast.success("Hurray");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Error loading recipe");
    }
  };
  useEffect(() => {
    fetchRecipe();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-900 opacity-60 flex flex-col items-center justify-center">
            <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 class="text-center text-white text-xl font-semibold">
              Loading Recipe...
            </h2>
          </div>
        </>
      ) : recipe !== null ? (
        <>
          <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                <div className="md:5/12 lg:w-5/12">
                  <img
                    src={
                      recipe?.picture?.Location
                        ? recipe.picture.Location
                        : "https://www.dentee.com/buy/content/images/thumbs/default-image_450.png"
                    }
                    alt="recipeImage"
                    loading="lazy"
                    className="rounded-lg w-[20rem] lg:w-full h-full mx-auto"
                  />
                </div>
                <div className="md:7/12 lg:w-6/12">
                  <div className="flex flex-col lg:flex-row justify-between items-center">
                    <h2 className="text-2xl text-sky-600 font-bold md:text-4xl font-urban">
                      {recipe?.name}
                    </h2>
                    <span className=" mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-sky-100 text-sky-800">
                      <svg
                        className="-ml-0.5 mr-1.5 h-2 w-2 text-sky-400"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx={4} cy={4} r={3} />
                      </svg>
                      {recipe?.createdBy?.name}
                    </span>
                  </div>
                  <p className="mt-6 text-gray-600">{recipe?.description}</p>
                  <div className="mt-4 rounded-xl  p-4  border-l-2  border-sky-500 shadow-md shadow-gray-100">
                    <h1 className="text-lg font-semibold text-sky-800 font-urban">
                      Ingredients
                    </h1>
                    <ul className="list-square list-inside mt-2">
                      {recipe.ingredients.map((item) => (
                        <li>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* steps */}
                  <div className="mt-6">
                    <h1 className="text-lg font-semibold">Steps :</h1>
                    <div className="flex flex-col gap-2 mt-3">
                      {recipe.steps.map((step, i) => (
                        <div className="border text-black rounded-lg flex item-center gap-3 ">
                          <div className=" text-black border rounded-l-lg px-2">
                            {i + 1}
                          </div>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        "No recipe Found"
      )}
    </>
  );
};

export default SingleRecipeView;
