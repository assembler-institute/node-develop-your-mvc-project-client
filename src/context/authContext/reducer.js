import React, { createContext, useContext, useReducer } from "react";
import { actionTypes } from "./actionTypes";

const AuthContext = createContext(null);

const initialState = {
  currentUser: null,
  isSigningIn: false,
  isSigningUp: false,
  isAuth: false,
  errorMessage: null,
  settingPassword: false,
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SIGN_IN_GOOGLE:
      return {
        ...state,
        isSigningIn: true,
        errorMessage: null,
      };
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isSigningIn: false,
        isAuth: true,
        errorMessage: null,
        currentUser: action.payload,
      };
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        errorMessage: null,
        currentUser: action.payload,
      };
    case actionTypes.SIGN_IN_ERROR:
      return {
        ...state,
        isSigningIn: false,
        errorMessage: action.payload,
      };
    case actionTypes.SIGN_UP_ERROR:
      return {
        ...state,
        isSigningUp: false,
        errorMessage: action.payload,
      };
    case actionTypes.SIGN_IN_EMAIL_AND_PASS:
      return {
        ...state,
        isSigningIn: true,
        errorMessage: null,
      };
    case actionTypes.SEND_PASS_RESET_EMAIL:
      return {
        ...state,
        settingPassword: true,
      };
    case actionTypes.SIGN_UP_EMAIL_AND_PASS:
      return {
        ...state,
        isSigningUp: true,
        errorMessage: null,
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        currentUser: null,
        isAuth: false,
      };
    default:
      break;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    ...state,
    signUpEmailAndPass: (userData) =>
      dispatch({ type: actionTypes.SIGN_IN_EMAIL_AND_PASS, payload: userData }),
    signUpSuccess: (newUser) =>
      dispatch({ type: actionTypes.SIGN_UP_SUCCESS, payload: newUser }),
    signUpError: (err) =>
      dispatch({ type: actionTypes.SIGN_UP_ERROR, payload: err }),
    signInEmailAndPass: (userData) =>
      dispatch({ type: actionTypes.SIGN_UP_EMAIL_AND_PASS, payload: userData }),
    signInSuccess: (user) =>
      dispatch({ type: actionTypes.SIGN_IN_SUCCESS, payload: user }),
    signInError: (err) =>
      dispatch({ type: actionTypes.SIGN_IN_ERROR, payload: err }),
    signOutProvider: () => dispatch({ type: actionTypes.SIGN_OUT }),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) return null;
  return context;
}

export default AuthContext;
