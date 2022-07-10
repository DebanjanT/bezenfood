import React from "react";
import { Link } from "react-router-dom";
import { BsArrowUp } from "react-icons/bs";

const AllRecipes = () => {
  return (
    <>
      <div className="container mx-auto mb-10">
        <h1 className="my-3 font-semibold text-lg lg:text-xl p-2 xl:p-2">
          Top Rated Recipe :
        </h1>
        <div className="container mx-auto flex flex-col lg:flex-row justify-center lg:justify-around items-center space-y-3 space-x-3">
          {/* Remove py-8 */}

          <div class="max-w-md lg:max-w-sm rounded overflow-hidden shadow-md">
            <img
              class="w-full h-60"
              src="https://educity-india.s3.us-east-2.amazonaws.com/3ff0c0aa-c7e1-4ef3-a2c9-ea06bf72ea9c.jpeg"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Butter Chicken</div>
              <p class="text-gray-700 text-base line-clamp-3">
                Butter Chicken is one of the most popular curries at any Indian
                restaurant around the world. Aromatic golden chicken pieces in
                an incredible creamy curry sauce, this Butter Chicken recipe is
                one of the best you will try!
              </p>
            </div>
            <Link to="recipe/Butter-ChickenMon-Jul-11-2022-02:07:56-GMT+0530-(India-Standard-Time)">
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  View Recipe
                </span>
              </div>
            </Link>
          </div>

          <div class="max-w-md lg:max-w-sm rounded overflow-hidden shadow-md">
            <img
              class="w-full h-60"
              src="https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/hyderabadi-biryani-recipe-chicken.jpg"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Chicken Biryani</div>
              <p class="text-gray-700 text-base line-clamp-3">
                Chicken Biryani is a savory chicken and rice dish that includes
                layers of chicken, rice, and aromatics that are steamed
                together. The bottom layer of rice absorbs all the chicken
                juices as it cooks, giving it a tender texture and rich flavor,
                while the top layer of rice turns out white and fluffy.
              </p>
            </div>
            <Link to="/recipe/Chicken-BiryaniMon-Jul-11-2022-00:05:32-GMT+0530-(India-Standard-Time)">
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  View Recipe
                </span>
              </div>
            </Link>
          </div>

          <div class="max-w-md lg:max-w-sm rounded overflow-hidden shadow-md">
            <img
              class="w-full h-60"
              src="https://content3.jdmagicbox.com/comp/chennai/a8/044pxx44.xx44.190716183052.z1a8/catalogue/sandwitch-chennai-fast-food-delivery-services-44jx9vznst.jpg"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Veg Sandwitch</div>
              <p class="text-gray-700 text-base line-clamp-3">
                This classic Bombay Veg Sandwich Recipe is filled with flavor
                that will leave you wanting more! It includes beets, potato,
                butter, cilantro chutney and is a popular street food in Mumbai.
                Serve as breakfast or a snack.
              </p>
            </div>
            <Link to="recipe/Veg-SandwitchMon-Jul-11-2022-02:03:49-GMT+0530-(India-Standard-Time)">
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  View Recipe
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-40 mx-auto mb-6 ">
        <label
          className="bg-sky-600 rounded text-white font-semibold px-2 py-1 cursor-pointer flex justify-center items-center"
          htmlFor="search"
        >
          Search More <BsArrowUp />
        </label>
      </div>
    </>
  );
};

export default AllRecipes;
