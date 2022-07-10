import React from "react";

const AllRecipes = () => {
  return (
    <div className="container mx-auto mb-10">
      <h1 className="my-3 font-semibold text-lg lg:text-xl p-2 xl:p-2">
        Top Rated Recipe :
      </h1>
      <div className="container mx-auto flex flex-col lg:flex-row justify-center lg:justify-around items-center space-y-3 space-x-3">
        {/* Remove py-8 */}

        <div class="max-w-lg lg:max-w-sm rounded overflow-hidden shadow-md">
          <img
            class="w-full h-60"
            src="https://educity-india.s3.us-east-2.amazonaws.com/3ff0c0aa-c7e1-4ef3-a2c9-ea06bf72ea9c.jpeg"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Butter Chicken</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              View Recipe
            </span>
          </div>
        </div>
        <div class="max-w-lg lg:max-w-sm rounded overflow-hidden shadow-md">
          <img
            class="w-full h-60"
            src="https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/hyderabadi-biryani-recipe-chicken.jpg"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Chicken Biryani</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              View Recipe
            </span>
          </div>
        </div>
        <div class="max-w-lg lg:max-w-sm rounded overflow-hidden shadow-md">
          <img
            class="w-full h-60"
            src="https://content3.jdmagicbox.com/comp/chennai/a8/044pxx44.xx44.190716183052.z1a8/catalogue/sandwitch-chennai-fast-food-delivery-services-44jx9vznst.jpg"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Veg Sandwitch</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              View Recipe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;
