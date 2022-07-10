import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div class=" px-6 py-16 mx-auto text-center mb-2">
      <div class="max-w-lg mx-auto">
        <h1 class="text-3xl font-bold text-gray-800  md:text-4xl">
          Your <span className="text-sky-600">Kitchen's</span> best friend
        </h1>

        <p class="mt-6 text-gray-500 ">
          BeZen recipe is one stop spot to find awsome food recipes and also
          share your recipe to the world
        </p>
      </div>
      <Link to="/signup">
        <button className="mt-6 bg-gradient-to-r from-sky-500 to-teal-500 px-2 py-1 rounded-md text-white font-semibold text-lg">
          Share Your Recipe
        </button>
      </Link>
    </div>
  );
};

export default Hero;
