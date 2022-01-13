import React, { createContext, useContext, useReducer } from "react";
import { actionTypes } from "./actionTypes";
import { closeSession } from "./localStorage";

const AuthContext = createContext(null);

const initialState = {
  currentUserData: null,
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
        isSigningUp: false,
        isAuth: true,
        errorMessage: null,
        signedUp: false,
        currentUserData: action.payload.user
          ? action.payload.user
          : action.payload,
      };
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        isSigningIn: false,
        isSigningUp: false,
        errorMessage: null,
        signedUp: true,
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
      closeSession();
      return {
        ...state,
        currentUserData: null,
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
    signUpEmailAndPass: () =>
      dispatch({ type: actionTypes.SIGN_IN_EMAIL_AND_PASS }),
    signUpSuccess: (firebaseRes) =>
      dispatch({
        type: actionTypes.SIGN_UP_SUCCESS,
        payload: firebaseRes.user,
      }),
    signUpError: (err) =>
      dispatch({ type: actionTypes.SIGN_UP_ERROR, payload: err }),
    signInEmailAndPass: (userData) =>
      dispatch({ type: actionTypes.SIGN_UP_EMAIL_AND_PASS, payload: userData }),
    signInSuccess: (user) =>
      dispatch({ type: actionTypes.SIGN_IN_SUCCESS, payload: user }),
    signInError: (err) =>
      dispatch({ type: actionTypes.SIGN_IN_ERROR, payload: err }),
    signOutProvider: () => dispatch({ type: actionTypes.SIGN_OUT }),
    setUserName: (userName) =>
      dispatch({ type: actionTypes.SET_USERNAME, payload: userName }),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) return null;
  return context;
}

export default AuthContext;
