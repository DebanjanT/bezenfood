import { React, useContext, useEffect } from "react";
import { Context } from "./Provider";
import { useNavigate } from "react-router-dom";
import Login from "../Main/Login";

const UserWrapper = ({ children }) => {
  // const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // useEffect(() => {
  //   if (user === null) {
  //     navigate("/login");
  //   }
  // }, [user]);
  return (
    <>
      {user ? (
        children
      ) : (
        <>
          <Login />
          <div
            class="flex items-center gap-4 p-4 text-red-600 bg-red-100 rounded w-1/3 mx-auto mt-4"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
              />
            </svg>

            <strong class="text-sm font-normal">
              {" "}
              Please login to enter restricted area !{" "}
            </strong>
          </div>
        </>
      )}
    </>
  );
};
export default UserWrapper;
