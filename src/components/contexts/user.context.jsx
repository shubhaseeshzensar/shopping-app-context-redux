import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import React from "react";
import {createAction} from '../../utils/reducer/reducer.utils'


export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {

  const { type, payload } = action // created an action.
  // payload is an object which stores values 
  // that the reducer will use to update the states

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }

    default:
      return new Error(`Unknown type received ${type} in the user reducer`)
  }
}

const INITIAL_STATE = { // setting initial state
  currentUser: null
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)

  const { currentUser } = state

  const setCurrentUser = user =>{
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user))
  }
  const value = { currentUser, setCurrentUser };
  
  
  
  //signOutUser();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
      // console.log(user);
    });
    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
