import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
//intial context state
const initialState = {
  user: null,
};

//assign context
const Context = createContext();

//reducer function
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

//assign context provider for the whole app
const CProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("bezenuser")),
    });
  }, []);

  // Getting csrf token from server api
  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get(`${BASE_API_URL}/csrf-token`);
  //     axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
  //   };

  //   getCsrfToken();
  // }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, CProvider };
