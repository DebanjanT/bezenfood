import React, { useState } from "react";
import UserWrapper from "../Context/UserWrapper";
import { FcAddImage } from "react-icons/fc";
import Resizer from "react-image-file-resizer";
import axiosjwt from "../components/AxiosInstance/authAxios";
import toast from "react-hot-toast";
import { BASE_API_URL } from "../Variables/Urls";
import { useNavigate } from "react-router-dom";
import CreateRecipeForm from "../components/Forms/createRecipeForm";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState();
  const [steps, setSteps] = useState(null);
  const [rawSteps, setRawSteps] = useState(null);
  const [imgPreview, setImgPreview] = useState("");
  //image state for storing resized image
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgloading, setImgloading] = useState(false);

  //handle image upload from form, resize, and upload to aws s3
  const handleImageUpload = (e) => {
    let user_uploaded_image = e.target.files[0];
    setImgPreview(window.URL.createObjectURL(user_uploaded_image));
    setLoading(true);
    setImgloading(true);
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
          setImgloading(false);
          console.log(data);
        } catch (err) {
          console.log(err);
          setLoading(false);
          setImgloading(false);
          toast.error("Image upload failed! Contact suppot team ❤️");
        }
      }
    );
  };

  const removeRecipeImage = async () => {
    try {
      setLoading(true);
      setImgloading(true);
      const { data } = await axiosjwt.post(
        `${BASE_API_URL}/recipe/remove/image`,
        { image }
      );
      setImage(null);
      setImgPreview("");
      setLoading(false);
      setImgloading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setImgloading(false);
      toast.error("Problem removing image , Contact Support");
    }
  };

  const addIng = (e) => {
    var values = e.target.value;
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

  //Create Recipe
  const createRecipe = async () => {
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
        const { data } = await axiosjwt.post(`${BASE_API_URL}/recipe/create`, {
          name,
          description,
          picture: image,
          ingredients,
          steps,
          raw_steps: rawSteps,
        });
        navigate("/dashboard");
        toast.success(`Recipe created successfully`);
      } catch (err) {
        console.log(err);
        toast.error("Problem creating recipe, Contact Support");
      }
    }
    return;
  };
  return (
    <UserWrapper>
      <CreateRecipeForm
        imgPreview={imgPreview}
        removeRecipeImage={removeRecipeImage}
        handleImageUpload={handleImageUpload}
        loading={loading}
        setName={setName}
        setDescription={setDescription}
        addIng={addIng}
        addSteps={addSteps}
        imgloading={imgloading}
        createRecipe={createRecipe}
      />
    </UserWrapper>
  );
};

export default CreateRecipe;
