import React from "react";
import { FcAddImage } from "react-icons/fc";
import { ImSpinner } from "react-icons/im";
const CreateRecipeForm = ({
  imgPreview,
  removeRecipeImage,
  handleImageUpload,
  loading,
  setName,
  setDescription,
  addIng,
  addSteps,
  createRecipe,
  imgloading,
}) => {
  return (
    <div className="mt-10 sm:mt-8 lg:container lg:mx-auto mb-10">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-xl font-semibold leading-6 text-sky-600">
              Create a new recipe
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Please fill up with details to create new recipe
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="shadow-lg overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              {imgPreview ? (
                <>
                  <div className="border-2 border-gray-900 border-dashed mb-4 ">
                    <img
                      src={imgPreview}
                      alt="img"
                      className=" my-3 w-full md:w-3/4 h-52 mx-auto"
                    />
                    <button
                      disabled={loading || imgloading}
                      onClick={removeRecipeImage}
                      className="w-full text-center bg-red-50 text-red-500"
                    >
                      Remove Image
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <label
                    htmlFor="image"
                    className="mb-4 relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {/* Empty Image */}
                    <div onCl>
                      <FcAddImage className="h-12 w-12 mx-auto text-gray-400" />
                      <input
                        type="file"
                        id="image"
                        onChange={handleImageUpload}
                        accept="image/*"
                        hidden
                      />
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload Image
                      </span>
                    </div>
                  </label>
                </>
              )}

              {imgloading && (
                <div className="flex justify-start items-center ml-2 my-3">
                  <ImSpinner className="animate-spin h-6 w-6 mr-2 text-sky-500" />
                  Image handling...
                </div>
              )}
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-semibold text-gray-700"
                  >
                    Recipe Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent mt-2"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-md font-semibold text-gray-700"
                  >
                    Description
                  </label>

                  <textarea
                    type="textarea"
                    onChange={(e) => setDescription(e.target.value)}
                    className="rounded-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent mt-2"
                  ></textarea>
                </div>

                <div className="col-span-6 sm:col-span-6 ">
                  <label
                    htmlFor="email-address"
                    className="block text-md text-gray-700 font-semibold"
                  >
                    Ingredients
                  </label>
                  <p className="text-xs">
                    Enter ingredients comma seperated | ex: sugar, eggs, ...
                  </p>
                  <textarea
                    type="text"
                    onChange={(e) => addIng(e)}
                    className="rounded-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent mt-2"
                  ></textarea>
                </div>

                <div className="col-span-6 sm:col-span-6 ">
                  <label
                    htmlFor="email-address"
                    className="block text-md text-gray-700 font-semibold"
                  >
                    Steps
                  </label>
                  <p className="text-xs">
                    Enter steps // seperated | ex: firs step // second step //
                    ...
                  </p>
                  <textarea
                    type="text"
                    onChange={(e) => addSteps(e)}
                    className="rounded-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent mt-2"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-end gap-2 ">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none "
              >
                Preview
              </button>
              <button
                type="submit"
                disabled={loading || imgloading}
                onClick={createRecipe}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeForm;
