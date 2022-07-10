import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { MdFastfood } from "react-icons/md";
import axiosjwt from "../components/AxiosInstance/authAxios";
import UserWrapper from "../Context/UserWrapper";
import toast from "react-hot-toast";
import { BASE_API_URL } from "../Variables/Urls";
import moment from "moment";

const Dashboard = () => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const res = await axiosjwt.get(`${BASE_API_URL}/user/recipes`);
      console.log(res.data);
      setRecipes(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  //Delete reciepe
  const deleteRecipe = async (slug) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirm) {
      try {
        setDeleting(true);
        const res = await axiosjwt.post(
          `${BASE_API_URL}/recipe/delete/${slug}`
        );
        toast.success("Deleted successfully");
        fetchRecipes();
        setDeleting(false);
      } catch (err) {
        setDeleting(false);
        toast.error("Cannot delete a recipe | Error");
      }
    } else {
      return;
    }
  };

  // toast.promise(deleteRecipe(), {
  //   loading: "Saving...",
  //   success: <b>Settings saved!</b>,
  //   error: <b>Could not save.</b>,
  // });
  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <UserWrapper>
      {" "}
      {/* Heading */}
      <div className="container mx-auto my-6">
        <div className="px-4 md:px-0 pb-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl leading-6 font-semibold text-gray-900">
            Recipe Dashbord
          </h3>
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <Link to="/dashboard/recipe/create">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Create Recipe
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <>
            <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-900 opacity-60 flex flex-col items-center justify-center">
              <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
              <h2 class="text-center text-white text-xl font-semibold">
                Loading Recipes...
              </h2>
            </div>
          </>
        ) : recipes?.length > 0 ? (
          <>
            {" "}
            <div class="flex flex-col gap-4 items-center lg:items-start justify-center mt-4">
              {recipes.map((recipe, index) => (
                <div class="w-11/12 lg:w-1/2 border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50">
                  <div class="grid grid-cols-6 p-5 gap-y-2">
                    <div>
                      <img
                        alt="img"
                        src={
                          recipe?.picture?.Location
                            ? recipe.picture.Location
                            : "https://www.dentee.com/buy/content/images/thumbs/default-image_450.png"
                        }
                        className="max-w-30 max-h-30 rounded-lg"
                      />
                    </div>

                    <div class="col-span-5 md:col-span-4 ml-4">
                      <p class="text-sky-500 font-bold text-xs">
                        {" "}
                        Last Update: {recipe.createdAt}
                      </p>

                      <p class="text-gray-600 font-bold"> {recipe.name}</p>

                      <p class="text-gray-500 text-sm">
                        {" "}
                        {moment(recipe.createdAt).format(
                          "MMM Do YY, h:mm:ss a"
                        )}{" "}
                      </p>

                      <p class="text-gray-500 line-clamp-1 text-sm">
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
                        <Link to={`/recipe/edit/${recipe.slug}`}>
                          <p class="rounded-lg text-sky-500 font-bold bg-sky-100  py-1 px-2 text-sm w-fit h-fit">
                            {" "}
                            Update
                          </p>
                        </Link>
                        <button
                          onClick={() => deleteRecipe(recipe.slug)}
                          class="rounded-lg text-red-500 font-bold bg-red-100  py-1 px-3 text-sm w-fit h-fit"
                        >
                          {" "}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Empty recipe state */}
            <div className="border-4 border-dashed border-gray-100 h-60 flex justify-center items-center mt-4">
              <div className="flex flex-col justify-center items-center">
                <MdFastfood className="w-12 h-12  mb-1 text-yellow-500" />
                <span className=" mt-4 mb-2">
                  {" "}
                  OOPS! No recipes. Don't you like cooking?
                </span>
                <Link to="/dashboard/recipe/create">
                  <button className="bg-sky-600 text-sky-50 font-semibold pl-1 pr-3 py-1 text-sm mt-2 flex justify-center items-center rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    <IoMdAddCircle className="mr-1 w-6 h-6" />
                    Create
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </UserWrapper>
  );
};

export default Dashboard;
