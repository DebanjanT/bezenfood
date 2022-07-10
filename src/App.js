import React from "react";
import Header from "./components/UI/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./Main/Home";
import Dashboard from "./Main/Dashboard";
import CreateRecipe from "./Main/CreateRecipe";
import Register from "./Main/Register";
import { Toaster } from "react-hot-toast";
import Login from "./Main/Login";
import SingleRecipeView from "./Main/SingleRecipeView";
import EditRecipe from "./Main/EditRecipe";
import SearchResult from "./Main/SearchResult";
function App() {
  <Toaster
    position="top-center"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      // Define default options
      className: "",
      duration: 4000,
      style: {
        background: "#333",
        color: "#fff",
      },
      iconTheme: {
        primary: "#64ffda",
        secondary: "#FFFAEE",
      },
      // Default options for specific types
      success: {
        duration: 3000,
        style: {
          background: "#64ffda",
        },
        theme: {
          primary: "#64ffda",
          secondary: "#64ffda",
        },
      },
    }}
  />;
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/recipe/:slug" element={<SingleRecipeView />} />
        <Route path="/recipe/edit/:slug" element={<EditRecipe />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/recipe/create" element={<CreateRecipe />} />
      </Routes>
    </>
  );
}

export default App;
