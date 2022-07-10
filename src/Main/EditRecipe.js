import React, { useEffect, useState, useContext } from "react";
import UserWrapper from "../Context/UserWrapper";
import { FcAddImage } from "react-icons/fc";
import Resizer from "react-image-file-resizer";
import axiosjwt from "../components/AxiosInstance/authAxios";
import toast from "react-hot-toast";
import { BASE_API_URL } from "../Variables/Urls";
import { useNavigate, useParams } from "react-router-dom";
import UpdateRecipeForm from "../components/Forms/editRecipeForm";
import { Context } from "../Context/Provider";

const EditRecipe = () => {
  const localUser = JSON.parse(localStorage.getItem("bezenuser"));
  const [currentUser, setCurrentUser] = useState(localUser.data.User);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState();
  const [rawIngredients, setRawIngredients] = useState();
  const [steps, setSteps] = useState(null);
  const [rawSteps, setRawSteps] = useState(null);
  const [imgPreview, setImgPreview] = useState("");
  //image state for storing resized image
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchRecipe = async () => {
    try {
      setFetching(true);
      const res = await axiosjwt.get(`${BASE_API_URL}/recipe/get/${slug}`);
      if (
        !currentUser ||
        !currentUser._id ||
        currentUser._id !== res.data.createdBy._id
      )
        navigate("/");
      setCreator(res.data.createdBy);
      setDescription(res.data.description);
      setRawIngredients(res.data.ingredients.toString());
      setIngredients(res.data.ingredients);
      setRawSteps(res.data.raw_steps);
      setSteps(res.data.steps);
      setName(res.data.name);
      if (res.data.picture && res.data.picture.Location) {
        setImage(res.data.picture);
        setImgPreview(res.data.picture.Location);
      }
      setFetching(false);
    } catch (err) {
      console.log(err);
      toast.error("error");
    }
  };

  //handle image upload from form, resize, and upload to aws s3
  const handleImageUpload = (e) => {
    let user_uploaded_image = e.target.files[0];
    setImgPreview(window.URL.createObjectURL(user_uploaded_image));
    setLoading(true);
    //resizing image from client side
    Resizer.imageFileResizer(
      user_uploaded_image,
      720,
      500,
      "JPEG",
      100,
      0,
      async (uri) => {
        try {
          const { data } = await axiosjwt.post(
            `${BASE_API_URL}/recipe/upload/image`,
            {
              image: uri,
            }
          );
          setImage(data);
          // console.log(uploadProgress);
          setLoading(false);
          console.log(data);
        } catch (err) {
          console.log(err);
          setLoading(false);
          toast.error("Image upload failed! Contact suppot team ❤️");
        }
      }
    );
  };

  const removeRecipeImage = async () => {
    try {
      setLoading(true);
      const { data } = await axiosjwt.post(
        `${BASE_API_URL}/recipe/remove/image`,
        { image }
      );
      setImage(null);
      setImgPreview("");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Problem removing image , Contact Support");
    }
  };

  const addIng = (e) => {
    var values = e.target.value;
    setRawIngredients(values);
    const igs = values.split(",");
    const sanitizedIg = igs.filter(function (str) {
      return /\S/.test(str);
    });
    setIngredients(sanitizedIg);
  };

  const addSteps = (e) => {
    var values = e.target.value;
    setRawSteps(values);
    const newsteps = values.split("//");
    const sanitizedSteps = newsteps.filter(function (str) {
      return /\S/.test(str);
    });

    setSteps(sanitizedSteps);
  };

  //Update Recipe
  const updateRecipe = async () => {
    if (!name || !description || !ingredients || !steps)
      return toast.error("Please enter all details to create a Recipe");

    if (steps.length <= 0)
      return toast.error("Please enter at least one step to create a Recipe");
    if (ingredients.length <= 0)
      return toast.error(
        "Please enter at least one ingredient to create a Recipe"
      );
    const confirm = window.confirm(
      "Are you sure you want to create a new Recipe?"
    );
    if (confirm) {
      try {
        const { data } = await axiosjwt.post(
          `${BASE_API_URL}/recipe/update/${slug}`,
          {
            name,
            description,
            picture: image,
            ingredients,
            steps,
            raw_steps: rawSteps,
          }
        );
        navigate(`/recipe/${slug}`);
        toast.success(`Recipe update successfully`);
      } catch (err) {
        console.log(err);
        toast.error("Problem creating recipe, Contact Support");
      }
    }
    return;
  };

  useEffect(() => {
    fetchRecipe();
  }, []);
  return (
    <UserWrapper>
      {fetching ? (
        <>
          <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-900 opacity-60 flex flex-col items-center justify-center">
            <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 class="text-center text-white text-xl font-semibold">
              Loading Recipe...
            </h2>
          </div>
        </>
      ) : (
        <UpdateRecipeForm
          imgPreview={imgPreview}
          removeRecipeImage={removeRecipeImage}
          handleImageUpload={handleImageUpload}
          loading={loading}
          setName={setName}
          setDescription={setDescription}
          addIng={addIng}
          addSteps={addSteps}
          rawSteps={rawSteps}
          rawIngredients={rawIngredients}
          name={name}
          description={description}
          updateRecipe={updateRecipe}
        />
      )}
    </UserWrapper>
  );
};

export default EditRecipe;
